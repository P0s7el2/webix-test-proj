import {JetView} from "webix-jet";
import {data_contacts} from "models/data_contacts";
import {data_statuses} from "models/data_statuses";

export default class Contact_card extends JetView {
	config() {
		let contact_templ =
		{
			view: "template",
			id: "contacts:card",
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
						{
							view: "button",
							label: "Edit",
							type: "iconButton",
							icon: "edit",
							width: 100,
							click: () => { this.show(`subviews.contacts.contact_form?id=${data_contacts.getCursor()}`); }
						},
						{
							view: "button",
							label: "Delete",
							type: "iconButton",
							icon: "trash",
							width: 100,
							click: () => { this.deleteItem(); }
						}
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

	urlChange(view, url) {
		if (url[0].params.id) {
			const id = url[0].params.id;

			let contact = data_contacts.getItem(id);
			data_statuses.waitData.then(() => {
				let obj = data_statuses.getItem(contact.StatusID * 1 + 1);
				contact.Status = obj.Value;
				contact.StatusIcon = obj.Icon;
				$$("contacts:card").parse(contact);
			});
		}
	}

	deleteItem() {
		webix.confirm({
			text: "The product will be deleted. <br/> Are you sure?",
			ok: "Yes",
			cancel: "Cancel",
			callback: (res) => {
				if (res) {
					data_contacts.remove(data_contacts.getCursor());
					$$("contacts:list").select($$("contacts:list").getFirstId());
				}
			}
		});
	}
}
