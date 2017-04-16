sap.ui.jsview("app.details.PotentialOwners", {

	getControllerName : function() {
		return "app.details.PotentialOwners";
	},
	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data);
    },

	createContent : function(oController) {

		this.oList = new sap.m.List({inset: true});
		this.itemTemplate = 
			new sap.m.StandardListItem({
								title: "{fullname}",
								description: "{type}"
			});	

		this.page = new sap.m.Page({
			title : oBundle.getText("DETAILS_POTENTIAL_OWNER_TITLE"),
			showNavButton : true,
			navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [this.oList ]
		});
		return this.page;
	}
	
});