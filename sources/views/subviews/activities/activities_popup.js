import {JetView} from "webix-jet";
import {data_activities_types} from "models/data_activities_types";
import {data_contacts} from "models/data_contacts";
import {data_activities} from "models/data_activities";

export default class ActivityPopup extends JetView {
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
						data: data_activities_types,
						body: {
							template: "#Value#"
						}
					}
				},
				{view: "richselect",
					label: "Contact",
					name: "ContactID",
					options: {
						body: {
							data: data_contacts,
							template: obj => obj.FirstName || obj.Email
						}
					}
				},
				{view: "datepicker", name: "DueDate", label: "Date", format: "%d-%m-%Y", stringResult: true},
				{label: "Completed", name: "State", view: "checkbox", width: 120, labelWidth: 100, checkValue: "Close", uncheckValue: "Open"},
				{cols: [
					{view: "button", type: "iconButton", icon: "plus", label: "Add (*save)", click: () => { this.addActivity(); }},
					{view: "button", type: "iconButton", icon: "edit", label: "Cancel", click: () => { this.closePopup(); }}
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


	showWindow(id, type) {
		this.getRoot().show();

		if (type === "user" && id) {
			this.getRoot().queryView({view: "form"}).elements.ContactID.setValue(id);
		} else if (id) {
			this.getRoot().queryView({view: "form"}).setValues(data_activities.getItem(id.row));
		}

	}

	addActivity() {
		if (this.getRoot().queryView({view: "form"}).validate()) {
			const dataInput = this.getRoot().queryView({view: "form"}).getValues();
			if (!dataInput.id) {
				data_activities.add(dataInput);
			}
			else {
				data_activities.updateItem(dataInput.id, dataInput);
			}
			this.closePopup();
		}
	}

	closePopup() {
		this.getRoot().queryView({view: "form"}).clear();
		this.getRoot().hide();
	}
}
