import {JetView} from "webix-jet";
import {data_activities} from "models/data_activities";
import {getContactsOptions} from "models/data_contacts";
import {getActivityOptions} from "models/data_activities_types";
import ActivityPopup from "views/subviews/activities/activities_popup";

export default class ActivitiesGrid extends JetView {
	config() {
		function custom_checkbox(obj, common, value) {
			if (value !== "Open") { return "<span style='cursor:pointer;' class=\"webix_table_checkbox webix_icon_btn fa-check-square-o\" style=\"max-width:32px;\"></span>"; }
			return "<span style='cursor:pointer;' class= \"webix_table_checkbox webix_icon_btn fa-square-o\" style=\"max-width:32px;\"></span>";
		}

		let grid =
		{
			id: "activities:grid",
			view: "datatable",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{
					id: "State",
					header: "&nbsp;",
					width: 35,
					checkValue: "Close",
					uncheckValue: "Open",
					template: custom_checkbox
				},
				{id: "TypeID", header: ["Activity type", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2, editor: "richselect"},

				{id: "DueDate", header: ["Due date", {content: "dateFilter"}], format: webix.i18n.dateFormatStr, minWidth: 80, fillspace: 1/* sort: "date"*/},
				{id: "Details", header: ["Details", {content: "textFilter"}], sort: "string", minWidth: 80, fillspace: 1},
				{id: "ContactID", header: ["Contact", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2, editor: "richselect"},


				{id: "edit", header: "&nbsp;", width: 35, template: "<span  style=\"cursor:pointer;\" class=\"webix_icon fa-pencil\"></span>"},
				{id: "delete", header: "&nbsp;", width: 35, template: "<span  style=\"cursor:pointer;\" class=\"webix_icon fa-trash-o\"></span>"}
			],
			checkboxRefresh: true,

			onClick: {
				"fa-trash-o": (e, id) => {
					webix.confirm({
						text: "The product will be deleted. <br/> Are you sure?",
						ok: "Yes",
						cancel: "Cancel",
						callback: (res) => {
							if (res) {
								data_activities.remove(id);
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
	init(view) {
		view.parse(data_activities);
		getActivityOptions().then((opts) => {
			$$("activities:grid").getColumnConfig("TypeID").collection = opts;
			$$("activities:grid").refreshColumns();
		});

		getContactsOptions().then((opts) => {
			$$("activities:grid").getColumnConfig("ContactID").collection = opts;
			$$("activities:grid").refreshColumns();
		});
		this.on(this.app, "sort:table", (value) => {
			let currentDate = new Date();
			let currentDatePart = webix.Date.datePart(currentDate);

			switch (value) {
				case "all":
				{
					view.parse(data_activities);
					break;
				}
				case "overdue":
				{
					$$("activities:grid").filter((obj) => {
						if (obj.DueDate < currentDate) { return obj.DueDate; }
					});
					break;
				}
				case "complited":
				{
					$$("activities:grid").filter((obj) => {
						if (obj.State == "Close") { return obj; }
					});

					break;
				}
				case "today":
					{
						$$("activities:grid").filter((obj) => {
							if (webix.Date.equal(obj.DueDate, currentDatePart)) { return obj; }
						});
					}
					break;
				case "tomorrow":
				{
					$$("activities:grid").filter((obj) => {
						if(webix.Date.equal(webix.Date.add(currentDate, 1, "day"), obj.DueDate))
							{return obj;}
					});
					break;
				}
				case "this week":
				{
					$$("activities:grid").filter((obj) => {
						if (webix.Date.equal(webix.Date.weekStart(obj.DueDate), webix.Date.weekStart(currentDatePart))) { return obj; }
					});
					break;
				}
				case "this month":
					{
						$$("activities:grid").filter((obj) => {
							if (webix.Date.equal(webix.Date.monthStart(obj.DueDate), webix.Date.monthStart(currentDatePart))) { return obj; }
						});
					}
					break;
			}
		});
	}
}
