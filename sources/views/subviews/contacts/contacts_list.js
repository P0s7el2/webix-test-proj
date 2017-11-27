import {JetView} from "webix-jet";
import { contacts_data } from "models/data_contacts";

export default class Contacts_list extends JetView {
	config()
	{
		var contacts_list = 
		{
			view: "list",
			select: true,
			
			template: function(item){
				var str = "";
				(item.Photo) ? str += "<img class='round' src='"+item.Photo+"'>" : str += "<span class = 'average_icon icons webix_icon fa-user-circle'></span>";
				if(item.FirstName || item.LastName) str += "<b>"+item.FirstName+" "+item.LastName+"</b> <br>";
				else if(item.Email) str += item.Email;
				if(item.Company) str += item.Company;
				return str;
			},
			type: 
			{
				width: 300,
				height: "auto",
			},
			on: 
				{
				onAfterSelect: (id) => {
					this.app.callEvent("contactSelected",  [id]);
				}
			}
		};
		return contacts_list;
	}
	init(view){
		view.parse(contacts_data);
		contacts_data.waitData.then(function(){
			view.select(view.getFirstId());
		});
	}
}