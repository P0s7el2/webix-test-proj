import {JetView} from "webix-jet";
import contact_card from "views/subviews/contacts/contact_card";
import contact_tabview from "views/subviews/contacts/contact_tabview";


export default class Contact_info extends JetView {
	config() {
		let contact_info = {
			rows: [contact_card, contact_tabview]
		};
		return contact_info;
	}
}