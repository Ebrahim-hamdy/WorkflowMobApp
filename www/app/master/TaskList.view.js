sap.ui.jsview("app.master.TaskList", {

	getControllerName : function() {
		return "app.master.TaskList";
	},

	createContent : function(oController) {

		this.oList = new sap.m.List();
		this.itemTemplate = new sap.m.StandardListItem(
		{
			title: "{subject}",
			description: "{created_by}",
			icon:  {path : "priority", formatter : fnIconFormatter},
			type: sap.m.ListType.Navigation,
			tap : oController.onListItemTap,
			info: {path : "created_at", formatter : fnDateFormatter} ,
		});
						
		this.itemTemplate.data("TaskName","{task_name}");
											
		// create search field
		this.searchField = new sap.m.SearchField(
		{
	    	placeholder : oBundle.getText("SEARCH_PLACEHOLDER"),
	    	layoutData : new sap.m.FlexItemData({ growFactor : 1 }),
	    	liveChange : [ oController.onLiveChange, oController ],
	    	maxLength  : 127,
		});
	
		var pull = new sap.m.PullToRefresh({
	    	description : "",
	    	refresh : [oController, oController.onPull]
		});	
	
		//Create personalization button
		var oPersonalizationButton = new sap.m.Button({
	    	icon: "sap-icon://settings",
	    	tap : oController.onPersonalizationButtonTap,
	    	visible: !jQuery.device.is.desktop
		});
	
	
		this.oFilterList = new sap.m.List({
			mode : sap.m.ListMode.SingleSelect,
			select : [oController.onFilterItemSelected,oController]
		});
	
		// create popover with a list in the content
		this.popover = new sap.m.Popover({
	  		title: oBundle.getText("FILTER_TASKS"),
	  		placement: sap.m.PlacementType.Top,
	  		footer:  new sap.m.Bar(
	  		{
	    		contentRight: [ new sap.m.Button(
	    		{
	        		text: oBundle.getText("CANCEL_BUTTON"),
	        		press:[oController.onFilterClose, oController ]   
	      		})]
	  		}),
	  		content: [this.oFilterList]
		});

		this.oButtonFilter = new sap.m.Button(
		{
	    	text:oBundle.getText("FILTER_BUTTON"),
	    	press :[oController.onFilterButtonTap, oController ]
		});
	
		this.page = new sap.m.Page(
		{
   	    	title : oBundle.getText("MASTER_TASKLIST_TITLE"),
	    	showNavButton : false,
	    	footer : new sap.m.Bar(
	    	{
				enableFlexBox : true,
				contentRight : [ oPersonalizationButton ],
				contentLeft : [this.oButtonFilter]
			}),
			content : 
			[ 
				pull, 
				new sap.m.Bar(
				{	
	    			enableFlexBox : true, 
	    			contentMiddle : [ this.searchField ] 
	    		}), 
	    		this.oList 
	    	]
		});

		return this.page;
	}
	
});