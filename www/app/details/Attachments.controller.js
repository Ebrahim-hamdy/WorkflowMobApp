sap.ui.controller("app.details.Attachments", {
	
	onBeforeShow : function(oData) {	
		var view = this.getView();
		this.bindingContext = oData.bindingContext;
		
		view.oList.bindAggregation("items", {
	    	path : oData.bindingContext.getPath() + "/Attachments",
	    	template : view.itemTemplate,
		});
	},
	
	onNavButtonTap : function() {	    	
		sap.ui.getCore().getEventBus().publish("nav", "back");
		
		// update the detail with the appropriate data
		sap.ui.getCore().getEventBus().publish("loadData", "RefreshTaskDetail", {
			bindingContext : this.bindingContext 
		});
	},    
		    
	onListItemTap : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();
		var urlProvidingFile = oBindingContext.getModel().sServiceUrl + oBindingContext.getPath()+"/$value";
		window.open (urlProvidingFile,'_blank');
	}


});