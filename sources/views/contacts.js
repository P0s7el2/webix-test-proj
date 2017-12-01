import {JetView} from "webix-jet";
import contacts_list from "views/subviews/contacts/contacts_list";
import contact_card from "views/subviews/contacts/contact_card";
import contact_tabview from "views/subviews/contacts/contact_tabview";

export default class Contacts extends JetView {
	config() {
		let addContact = 	{
			view: "button",
			label: "Add contact",
			type: "iconButton",
			icon: "plus",
			click: () => {
				this.show("subviews.contacts.contact_form");
			}
		};
		let contacts =
		{
			cols: [
				{
					rows: [contacts_list, addContact]
				},
				{$subview: true}
			]
		};

		return contacts;
	}
}




