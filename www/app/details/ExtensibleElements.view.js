sap.ui.jsview("app.details.ExtensibleElements", {

	getControllerName : function() {
		return "app.details.ExtensibleElements";
	},

	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data);
    },

    createContent : function(oController) {

    	this.oList = new sap.m.List({inset: true });
    	
    	this.itemTemplate = new sap.m.DisplayListItem({ 
    		label :"{name}", 
    		value : "{value}"    	});
   			
		this.page = new sap.m.Page({
	   	    title : oBundle.getText("DETAIL_EXTENSIBLE_ELEMENTS_TITLE"),
		    showNavButton : true,
		     navButtonTap : [ oController.onNavButtonTap, oController ],
		     content: [this.oList ]
		});
		
		return this.page;
	}
});
