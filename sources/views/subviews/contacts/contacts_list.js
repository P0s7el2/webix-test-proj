import {JetView} from "webix-jet";
import {data_contacts} from "../../../models/data_contacts";

export default class Contacts_list extends JetView {
	config() {
		let contacts_list =
		{
			view: "list",
			select: true,
			id: "contacts:list",
			template(item) {
				let str = "";
				item.Photo ? str += "<img class=\"round\" src=\"${item.Photo}\">" : str += "<span class = \"average_icon icons webix_icon fa-user-circle\"></span>";
				if (item.FirstName || item.LastName) str += `<b>${item.FirstName} ${item.LastName}</b> <br>`;
				else if (item.Email) str += item.Email;
				if (item.Company) str += item.Company;
				return str;
			},
			type:
			{
				width: 300,
				height: "auto"
			},
			on:
				{
					onAfterSelect: (id) => {
						this.app.callEvent("contactSelected", [id]);
					}
				}
		};
		return contacts_list;
	}
	init(view) {
		$$("contacts:list").parse(data_contacts);
		data_contacts.waitData.then(() => {
			view.select(view.getFirstId());
		});
	}
}
