import {JetView} from "webix-jet";
import { getData, getStates } from "models/data_activities";
import { getOptions, getContactsOptions } from "models/data_contacts";
import { getState, getActivityOptions } from "models/data_activities_types";
import ActivityPopup from "views/subviews/activities/activities_popup";

export default class ActivitiesGrid extends JetView {
	config(){
		
			


	function custom_checkbox (obj, common, value){
		//1
		if(value !== "Open")
			return "<span style='cursor:pointer;' class=\"webix_table_checkbox webix_icon_btn fa-check-square-o\" style=\"max-width:32px;\"></span>";
		else
			return "<span style='cursor:pointer;' class= \"webix_table_checkbox webix_icon_btn fa-square-o\" style=\"max-width:32px;\"></span>";
	};

		var grid =
		{
			id: "productsData",
			view: "datatable",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{
					id: "State",
					header: "&nbsp;",
					width: 35,
					checkValue:"Close",
					uncheckValue:"Open",
					template: custom_checkbox
				},
				{id:"TypeID", header:["Activity type", {content:"selectFilter"} ], sort:"string", minWidth: 120, fillspace: 2, editor:"richselect"},
				{id:"DueDate", header:["Due date", {content:"textFilter"} ], sort:"string", minWidth: 80, fillspace: 1},
				{id:"Details", header:["Details", {content:"textFilter"} ], sort:"string", minWidth: 80, fillspace: 1},
				{id:"ContactID", header:["Contact", {content:"selectFilter"} ], sort:"string", minWidth: 120, fillspace: 2, editor: "richselect"},


				{id:"edit", header:"&nbsp;", width:35, template:"<span  style=' cursor:pointer;' class='webix_icon fa-pencil'></span>"},
				{id:"delete", header:"&nbsp;", width:35, template:"<span  style='cursor:pointer;' class='webix_icon fa-trash-o'></span>"}
			],
			checkboxRefresh:true,

			onClick:{
				"fa-trash-o":function(e,id){
					webix.confirm({
						text:"The product will be deleted. <br/> Are you sure?", ok:"Yes", cancel:"Cancel",
						callback:(res) => {
							if(res){
								getData().remove(id);
							}
						}
					});
				},
				"fa-pencil": (ev, id) => {
					this.app.callEvent("callWindow", [id]);
					}

			}
		};
		return grid;
	}
	init(view){
		view.parse(getData());

		getActivityOptions().then( function (opts)
		{

			view.getColumnConfig("TypeID").collection = opts;
			view.refreshColumns();
		});

	getContactsOptions().then( function (opts)
		{

			view.getColumnConfig("ContactID").collection = opts;
			view.refreshColumns();
		});
	}
}
