import { JetView } from "webix-jet";
import { getState } from "models/data_activities_types";

export default class Popup extends JetView {
	config() {
		alert("kk");
		return popup;
	}
	init(){
	
	}
}


var form = {
	view: "form",
	width: "450",
	bordeless: true,
	elements: [
		{ view: "textarea", label: "Details", name: "Details" },
		{ view: "richselect", label: "Type", name: "TypeID", options: [] },
		{ view: "richselect", label: "Contact", name: "ContactID", options: [] },
		{ view: "datepicker", label: "Date", timepicker: true, name: "DueDate" },
		{ label: "Completed", view: "checkbox", width: 120, labelWidth: 100, name: "State" },
		{ cols:
			[
				{},
				{
					view: "button",
					type: "iconButton",
					icon: "trash",
					label: "Add (*save)",
					id: "AddBtn",
				},
				{ view: "button", type: "iconButton", icon: "edit", label: "Cancel"}
			]
		}
	]
};

