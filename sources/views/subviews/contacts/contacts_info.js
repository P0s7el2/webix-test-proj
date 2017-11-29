import {JetView} from "webix-jet";
import {data_contacts} from "models/data_contacts";
import {data_statuses} from "models/data_statuses";

export default class Contacts_info extends JetView {
	config() {
		let contact_templ =
		{
			view: "template",
			id: "contacts:info",
			borderless: true,
			template(item) {
				let str = "";

				if (item.FirstName) { str += `<h1>${item.FirstName}`; }
				else { str += "<h1>FirstName"; }
				if (item.LastName) { str += `  ${item.LastName}</h1>`; }
				else { str += " LastName</h1>"; }

				str += "<div class='status contact-templ'>";

				if (item.Photo) str += `<img class='contactimg' src='${item.Photo}'>`;
				else str += "<div><span class = 'big_icon icons webix_icon fa-user-circle'> </span></div>";

				if (item.StatusIcon) str += `<br> <span class = 'icons webix_icon fa-${item.StatusIcon}'> </span>`;
				item.Status		? 	str += `<p> ${item.Status}</p>` : str += " contact status";

				str += "</div><div class='contact-templ'></span>";

				function past_field(field, icon) {
					str += `<span class ='field icons webix_icon fa-${icon}'></span> ${field}<br>`;
				}
				past_field(item.Email, "envelope");
				past_field(item.Skype, "skype");
				past_field(item.Job, "tag");
				past_field(item.Company, "briefcase");
				past_field(item.Birthday, "calendar");
				past_field(item.Address, "map-marker");
				str += "</div>";

				return str;
			}
		};

		let contact_edit =
		{
			rows: [
				{
					cols: [
						{view: "button", value: "Save", type: "form"},
						{view: "button", value: "Delete", type: "form"}
					]
				},
				{width: 150}
			]
		};

		let contact_info =
		{
			cols:
			[
				contact_templ,
				contact_edit
			]
		};
		return contact_info;
	}
	init(view) {
		this.on(this.app, "contactSelected", (id) => {
			let contact = data_contacts.getItem(id);
			data_statuses.waitData.then(() => {
				let obj = data_statuses.getItem(contact.StatusID + 1);
				contact.Status = obj.Value;
				contact.StatusIcon = obj.Icon;
				$$("contacts:info").parse(contact);
			});
		});
	}
}
