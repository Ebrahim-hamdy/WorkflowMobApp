sap.ui.controller("app.details.Comments", {

    onBeforeShow : function(oData, oBackData) {
		var oView = this.getView();
		this.bindingContext = oData.bindingContext;
		
		oView.oList.bindAggregation("items", {
	    	path : oData.bindingContext.getPath() + "/Comments",
	    	template : oView.itemTemplate,
		});

    },
    
    onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
		
		// update the detail with the appropriate data
		sap.ui.getCore().getEventBus().publish("loadData", "RefreshTaskDetail", {
			bindingContext : this.bindingContext 
		});
    },    
    
});