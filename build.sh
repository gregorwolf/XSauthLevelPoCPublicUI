# install the MTA archive builder
mkdir -p ${WORKSPACE}/tmp/mta
cd ${WORKSPACE}/tmp/mta
wget -nv --output-document=mta.jar $MTA_BUILDER_URL

# install neo command line client
mkdir -p ${WORKSPACE}/tmp/neo-java-web-sdk
cd ${WORKSPACE}/tmp/neo-java-web-sdk
wget -nv 'http://central.maven.org/maven2/com/sap/cloud/neo-java-web-sdk/3.52.15/neo-java-web-sdk-3.52.15.zip'
unzip -qq -o neo-java-web-sdk-3.52.15.zip
rm neo-java-web-sdk-3.52.15.zip

# create local npmrc file
cd ${WORKSPACE}/src
cat <<EOF > .npmrc
registry=https://registry.npmjs.org/
@sap:registry=https://npm.sap.com/
EOF

# extract artifact name
cd ${WORKSPACE}/src
mtaName=`awk -F: '$1 ~ /^ID/ { gsub(/\s/,"", $2)
gsub(/\"/,"", $2)
print $2 }' mta.yaml`

# replace timestamp placeholder
sed -ie "s/\${timestamp}/`date +%Y%m%d%H%M%S`/g" mta.yaml

# execute MTA build
java -jar ${WORKSPACE}/tmp/mta/mta.jar --mtar ${mtaName}.mtar --build-target=NEO build

# deploy to SAP Cloud Platform
${WORKSPACE}/tmp/neo-java-web-sdk/tools/neo.sh deploy-mta --user ${CI_DEPLOY_USER} --host ${DEPLOY_HOST} --source ${mtaName}.mtar --account ${CI_DEPLOY_ACCOUNT} --password ${CI_DEPLOY_PASSWORD} --synchronous
