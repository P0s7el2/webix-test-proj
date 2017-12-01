import {JetView} from "webix-jet";
import grid from "views/subviews/activities/activities_grid";
import ActivityPopup from "views/subviews/activities/activities_popup";

export default class Activities extends JetView {
	config() {
		let open_activity_popup = {
			view: "button",
			type: "iconButton",
			icon: "plus-square",
			label: "Add Activity",
			width: 130,
			click: () => this.ActivityPopup.showWindow()
		};

		let sortButton = {
			name:"lang", 
			optionWidth: 120, 
			view:"segmented", 
			options:[
					{id:"all", value:"All"},
					{id:"override", value:"Overdue"},
					{id:"complited", value:"Complited"},
					{id:"complited", value:"Complited"},
					{id:"complited", value:"Complited"},
					{id:"complited", value:"Complited"},
					{id:"complited", value:"Complited"}
				]

		}

		let activities = {
			rows: [
				{
					cols: [
						{}, sortButton, open_activity_popup
					]
				},
				grid
			]
		};
		return activities;
	}

	init() {
		this.ActivityPopup = this.ui(ActivityPopup);
		this.on(this.app, "callWindow", (id) => {
			this.ActivityPopup.showWindow(id);
		});
	}
}
