import {JetView} from "webix-jet";
import { getData, getDataItem, getStates } from "models/data_activities";
import { getOptions } from "models/data_contacts";
import { getState, getActivityOptions } from "models/data_activities_types";

export default class ActivitiesGrid extends JetView {
	config(){
		
			getActivityOptions().then(function(opts)
					{
						$$("productsData").getColumnConfig("TypeID").collection = opts;
						$$("productsData").refreshColumns();
					});
			
		

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
					header: " ",
					width: 35,
					
					template: function (state)
					{
					if(state.state == "Open")
						return "<span class=\"webix_icon_btn fa-check-square-o\" style=\"max-width:32px;\"></span>";
					else
						return "<span class=\"webix_icon_btn fa-square-o\" style=\"max-width:32px;\"></span>";
					}
				},
				{id:"TypeID", header:["Activity type", {content:"selectFilter"} ], sort:"string", minWidth: 120, fillspace: 2, editor:"richselect"},
				{id:"DueDate", header:["Due date", {content:"textFilter"} ], sort:"string", minWidth: 80, fillspace: 1},
				{id:"Details", header:["Details", {content:"textFilter"} ], sort:"string", minWidth: 80, fillspace: 1},
				{id:"ContactID", header:["Contact", {content:"selectFilter"} ], sort:"string", minWidth: 120, fillspace: 2, editor: "richselect"},


				{id:"edit", header:"&nbsp;", width:35, template:"<span  style=' cursor:pointer;' class='webix_icon fa-pencil'></span>"},
				{id:"delete", header:"&nbsp;", width:35, template:"<span  style='cursor:pointer;' class='webix_icon fa-trash-o'></span>"}
			],


			onClick:{
				"fa-trash-o":function(e,id){
					webix.confirm({
						text:"The product will be deleted. <br/> Are you sure?", ok:"Yes", cancel:"Cancel",
						callback:(res) => {
							if(res){
								getData().remove(id);
								// const item = this.getItem(id);
								// item.status = "0";
								// item.statusName = "Deleted";
								// this.refresh(id);
							}
						}
					});
				},
				"fa-square-o":function(e,id){
					alert("kek");
				}

			}
		};
		return grid;
	}
	init(view){
		view.parse(getData());
	}
}
