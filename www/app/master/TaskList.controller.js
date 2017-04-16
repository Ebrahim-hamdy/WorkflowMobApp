sap.ui.controller("app.master.TaskList", {

    onInit : function(oEvent) {
        this.oEventBus = sap.ui.getCore().getEventBus();
    	this.oEventBus.subscribe("tasks", "modified", this.loadContent, this);
    	this.loadContent();
    },
    
    loadContent: function(){
	
    	sap.ui.getCore().getModel().attachRequestCompleted(this.createFilterListItems, this);
    	this.bindList([]);
	}, 
	
	 bindList:function(aFilters){
	    	
		var oView = this.getView();
	    
	    oView.oList.bindItems( "/WorkflowTaskCollection",oView.itemTemplate,null,aFilters);    	
	   
	    },
	
	createFilterListItems: function(){
		
		var oView =  this.getView();
    	if(oView.oFilterList.getItems().length != 0){
    		oView.oFilterList.removeAllItems();
    	}
    	
    	oView.oFilterList.addItem(this.createFilterItem("ALL", true, "All"));
    			
    	var taskList = [];
    	var listItems = oView.oList.getItems();
    	
    	for (var i = 0; i < listItems.length; i++) {
    		if(!listItems[i].isActive())	//The item is not displayed in the list
    			  {
    			  continue;
    		 }
    		   var taskID = listItems[i].data("TaskName");
    		       		   if(!taskList[taskID]){
    		       oView.oFilterList.addItem(this.createFilterItem( taskID.toUpperCase(), false, taskID));
    			   taskList[taskID] = true;
    		   }
			}
		
		sap.ui.getCore().getModel().detachRequestCompleted(this.createFilterListItems,this);
	},
	
	 createFilterItem : function(title, bSelected, sTaskID) {
		return new sap.m.StandardListItem({
			title : title,
			selected : bSelected,
		}).data("TaskName", sTaskID);
	},

	onListItemTap : function(oEvent) {
        sap.ui.getCore().getEventBus().publish("nav", "to", {
	    	  viewId : "app.details.TaskDetails",
	    });
	              
		// update the detail with the appropriate data
		sap.ui.getCore().getEventBus().publish("loadData", "RefreshTaskDetail", {
			bindingContext : oEvent.getSource().getBindingContext() 
		});
    },   
	
	onPersonalizationButtonTap : function() {

    	//On tablet,we set the details section to empty when navigating to the personalization list
        if (!jQuery.device.is.phone) {
    	var splitApp = sap.ui.getCore().byId("app.App").splitApp;
    		splitApp.toDetail("app.details.Empty");
        }
        sap.ui.getCore().getEventBus().publish("nav", "to", {
    		viewId : "app.master.SettingsCategories",
    		data : ""
        });

    },
    
    onLiveChange : function(oEvent) {
    	var filterPattern = oEvent.getParameters().newValue.toLowerCase(), listItems = this.getView().oList.getItems(), i, visibility;
    	for (i = 0; i < listItems.length; i++) {
			visibility = (listItems[i].getTitle().toLowerCase().indexOf(filterPattern) != -1) || (listItems[i].getDescription().toLowerCase().indexOf(filterPattern) != -1) || (listItems[i].getInfo().toLowerCase().indexOf(filterPattern) != -1);
			listItems[i].setVisible(visibility);
    	};
    },
    
    onPull : function(oEvent, oController){
		oController.loadContent(oController.oBindingContext);
		this.hide();
    },
	
    onFilterClose: function() {
		this.getView().popover.close();
	},
  
    onFilterButtonTap:function(oEvent){
    	this.createFilterListItems();
    	this.getView().popover.openBy(this.getView().oButtonFilter);
    },
    
    onFilterItemSelected:function(oEvent){
		
		var taskID = oEvent.getParameter("listItem").data("TaskName");
		var aFilters = [];
		
		if (taskID != "All") {
			aFilters.push(new sap.ui.model.Filter("task_name",sap.ui.model.FilterOperator.EQ, taskID));
		}
		
		var _self = this;
		setTimeout(function(){
			_self.bindList(aFilters);
			_self.onFilterClose();			
		},0);
			
	},

});