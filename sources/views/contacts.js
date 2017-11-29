import {JetView} from "webix-jet";
import contacts_list from "views/subviews/contacts/contacts_list";
import contacts_info from "views/subviews/contacts/contacts_info";
import contact_tabview from "views/subviews/contacts/contact_tabview";

export default class Contacts extends JetView {
	config() {
		return contacts;
	}
}

let contacts =
{
	cols: [
		contacts_list,
		{
			rows: [contacts_info, contact_tabview]
		}
	]
};
