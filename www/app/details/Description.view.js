sap.ui.jsview("app.details.Description", {

    getControllerName : function() {
		return "app.details.Description";
    },
	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * @param oEvent
	 */
    onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data);
    },

    createContent : function(oController) {

    	this.descriptionText = new sap.m.Text({
			text:{path : "description", formatter : fnTextFormatter}
		}).addStyleClass("mobile-detail-description");
    	
		this.page = new sap.m.Page({
	    	title : oBundle.getText("DETAILS_DESCRIPTION_TITLE"),
	    	showNavButton : true,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
	    	content : [ this.descriptionText ]
		});

		return this.page;
    }
});