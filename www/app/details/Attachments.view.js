sap.ui.jsview("app.details.Attachments", {

	getControllerName : function() {
		return "app.details.Attachments";
	},

	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data);
    },

    createContent : function(oController) {

		this.oList = new sap.m.List({inset: true});
			
		this.itemTemplate = new sap.m.DisplayListItem({
			type : sap.m.ListType.Active,
			tap : oController.onListItemTap,
			label : "{filename}"		});
		
		this.page = new sap.m.Page({
	   	    title : oBundle.getText("DETAIL_ATTACHMANTS_TITLE"),
		    showNavButton : true,
		     navButtonTap : [ oController.onNavButtonTap, oController ],
		     content: [this.oList ]
		});
		
		return this.page;
	}
	
});