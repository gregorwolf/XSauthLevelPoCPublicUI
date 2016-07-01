sap.ui.define([
		"de/linuxdozent/gittest/publicui/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("de.linuxdozent.gittest.publicui.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);