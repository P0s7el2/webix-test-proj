import { JetView } from "webix-jet";
import { getState } from "models/data_activities_types";
import { getOptions } from "models/data_contacts";
import { setActivities, getActivitiesItem } from "models/data_activities";

export default class ActivityPopup extends JetView{

	config() {

		const form = {
			view: "form",
			width: 420,
			bordeless: true,
			elements: [
				{view: "textarea", label: "Details", name: "Details"},
				{view: "richselect",
					label: "Type",
					name: "TypeID",
				
					 options: {
						data: getState()
					 },
				},
				{view: "richselect",
					id: "contselect",
					label: "Contact",
					name: "ContactID",
					options: {
						data: getOptions()
					},
				},
				{view: "datepicker", name: "DueDate", label: "Date", format: "%d-%m-%Y", stringResult: true},
				{label: "Completed", name: "State", view: "checkbox", width: 120, labelWidth: 100, checkValue: "Close", uncheckValue: "Open"},
				{cols: [
					{view: "button", type: "iconButton", icon: "plus", label: "Add (*save)", click:() => {this.addActivity()}},
					{view: "button", type: "iconButton", icon: "edit", label: "Cancel",  click() {this.$scope.closePopup()} }
				]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty
			}
	};

	const popup = {
		view: "window",
		width: 300,
		position: "center",
		modal: true,
		head: "Add (*edit) activity",
		body: form
	};
		return popup;
	}


	showWindow(id) {
		this.getRoot().show();
		if (id !== undefined) {
			this.getRoot().queryView({view: "form"}).setValues(getActivitiesItem(id.row));
		}
	}

	addActivity() {
		if (this.getRoot().queryView({view: "form"}).validate()) {
			const dataInput = this.getRoot().queryView({view: "form"}).getValues();
			setActivities(dataInput.id, dataInput);
			this.closePopup();
		}
	}

	closePopup() {
		this.getRoot().queryView({view: "form"}).clear();
		this.getRoot().hide();
	}
}
