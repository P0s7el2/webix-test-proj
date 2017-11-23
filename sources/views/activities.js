import {JetView} from "webix-jet";
import grid from "views/subviews/activities/activities_grid";
//import {popup} from "views/subviews/activities/activities_popup";

export default class Activities extends JetView {
	config(){
		var open_activity = {
			view: "button",
			type: "iconButton",
			icon: "plus-square",
			label: "Add Activity",
			width: 130,
			click:() => popup
		};

		var activities = {
			rows: [
				{
					cols: [
						{}, open_activity
					]
				},
				grid
			]
		};
		return activities;
	}
}