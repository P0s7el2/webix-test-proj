import {JetView} from "webix-jet";
import {data_contacts} from "models/data_contacts";

export default class Contact_form extends JetView {
	config() {
		const contact_form = {
			view: "form",
			id: "contact_form",
			borderless: true,
			elements: [
				{cols: [
					{rows: [
						{view: "text", label: "First Name", name: "FirstName"},
						{view: "text", label: "Last Name", name: "LastName"},
						{view: "datepicker", label: "Joining date", name: "StartDate", format: "%d-%m-%Y", stringResult: true},
						{view: "text", label: "Status", name: "StatusID"},
						{view: "text", label: "Job", name: "Job"},
						{view: "text", label: "Company", name: "Company"},
						{view: "text", label: "Website", name: "Website"},
						{view: "text", label: "Address", name: "Address"}
					]},
					{rows: [
						{view: "text", label: "Email", name: "Email"},
						{view: "text", label: "Skype", name: "Skype"},
						{view: "text", label: "Phone", name: "Phone"},
						{view: "datepicker", label: "Birthday", name: "Birthday", format: "%d-%m-%Y", stringResult: true}
					]}
				]},
				{},
				{cols: [
					{},
					{
						view: "button",
						type: "iconButton",
						icon: "edit",
						autowidth: true,
						label: "Cancel",
						click: () => { this.show(`subviews.contacts.contact_info?id=${data_contacts.getCursor()}`);}
					},
					{
						view: "button",
						type: "iconButton",
						icon: "plus",
						autowidth: true,
						label: "Add (*save)",
						click: () => { this.saveForm(); }
					}
				]}
			],

			elementsConfig: {
				labelWidth: 100,

				margin: 30
			}
		};

		return contact_form;
	}

	urlChange(view, url) {
		$$("contact_form").clear();
		if (url[0].params.id) {
			const id = url[0].params.id;
			if (id) {
				$$("contact_form").setValues(data_contacts.getItem(id));
			}
		}
	}

	saveForm() {

		const dataInput = $$("contact_form").getValues();

		if (!dataInput.id) {
			data_contacts.add(dataInput);
		}
		else {
			data_contacts.updateItem(dataInput.id, dataInput);
		}
		const id = dataInput.id || data_contacts.getLastID();

		if (id === data_contacts.getLastId()) {
				$$("contacts:list").select(id);
			}
			else {
				this.show(`subviews.contacts.contact_info?id=${id}`);
			}

	}
}
