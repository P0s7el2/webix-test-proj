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
			name: "filter",
			optionWidth: 120,
			view: "segmented",
			options: [
				{id: "all", value: "All"},
				{id: "overdue", value: "Overdue"},
				{id: "complited", value: "Complited"},
				{id: "today", value: "Today"},
				{id: "tomorrow", value: "Tomorrow"},
				{id: "this week", value: "This week"},
				{id: "this month", value: "This month"}
			],
			click: () => this.filterTable()

		};

		let activities = {
			rows: [
				{
					cols: [
						{width: 100}, sortButton, open_activity_popup
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

	filterTable() {
		const value = this.getRoot().queryView({name: "filter"}).getValue();
		this.app.callEvent("sort:table", [value]);
	}
}
