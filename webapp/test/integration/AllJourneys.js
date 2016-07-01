jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"de/linuxdozent/gittest/publicui/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"de/linuxdozent/gittest/publicui/test/integration/pages/Worklist",
		"de/linuxdozent/gittest/publicui/test/integration/pages/Object",
		"de/linuxdozent/gittest/publicui/test/integration/pages/NotFound",
		"de/linuxdozent/gittest/publicui/test/integration/pages/Browser",
		"de/linuxdozent/gittest/publicui/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "de.linuxdozent.gittest.publicui.view."
	});

	sap.ui.require([
		"de/linuxdozent/gittest/publicui/test/integration/WorklistJourney",
		"de/linuxdozent/gittest/publicui/test/integration/ObjectJourney",
		"de/linuxdozent/gittest/publicui/test/integration/NavigationJourney",
		"de/linuxdozent/gittest/publicui/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});
