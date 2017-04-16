sap.ui.controller("app.details.ExtensibleElements", {

    onBeforeShow : function(oData) {
		var view = this.getView();
		this.bindingContext = oData.bindingContext;
		 
		view.oList.bindAggregation("items", {
		    path : oData.bindingContext.getPath() + "/ExtensibleElements",
		    template : view.itemTemplate,
		});
    },

    onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
		
		// update the detail with the appropriate data
		sap.ui.getCore().getEventBus().publish("loadData", "RefreshTaskDetail", {
			bindingContext : this.bindingContext 
		});
    }

});