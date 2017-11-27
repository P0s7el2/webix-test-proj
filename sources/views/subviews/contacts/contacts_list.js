import {JetView} from "webix-jet";
import { contacts_data } from "models/data_contacts";

export default class Contacts_list extends JetView {
	config()
	{
		var contacts_list = 
		{
			view: "list",
			select: true,
			
			template: "<img class='round' src='#Photo#'> <b>#FirstName# #LastName#</b> <br> #Company#",
			type: 
			{
				width: 300,
				height: "auto",
			},
			on: 
				{
				onAfterSelect:function(id){
					this.$scope.app.callEvent("contactSelected",  [id]);
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
		//all
	}
}