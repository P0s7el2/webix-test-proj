import {JetView} from "webix-jet";
import contacts_list from "views/subviews/contacts/contacts_list";
import contacts_info from "views/subviews/contacts/contacts_info";

export default class Contacts extends JetView {
	config()
	{
		return contacts;
	}
}

var contacts = 
{
	cols:[contacts_list,contacts_info]
};