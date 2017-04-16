sap.ui.controller("app.details.Description", {
	onBeforeShow : function(oData) {		
	    this.getView().bindElement(oData.bindingContext.getPath() + "/Description");
	    this.bindingContext = oData.bindingContext;
   	},
	
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
		
		// update the detail with the appropriate data
		sap.ui.getCore().getEventBus().publish("loadData", "RefreshTaskDetail", {
			bindingContext : this.bindingContext 
		});
	},
});