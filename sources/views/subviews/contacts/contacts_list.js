import {JetView} from "webix-jet";
import {data} from "models/records";

export default class Contacts_list extends JetView {
	config()
	{
		var contacts_list = 
		{
			view: "list",
			id: "contact_list",
			select: true,
			
			template:"<img class='round' src='#image#'> <b>#name#</b> <br> #company#",
			type:{
				width:300,
				height:"auto",
			},
			on:{
				onAfterSelect:function(id){
					this.$scope.app.callEvent("contactSelected",  [id]);
				}
			}
		};
		return contacts_list;
	}
	init(view){
		view.parse(data);		
	}
}