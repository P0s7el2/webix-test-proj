import {JetView} from "webix-jet";
import {getContact} from "models/records";

export default class Contacts_info extends JetView {
	config()
	{
		var contact_templ =
		{
			view: "template",
			template: templ
		};

		var contact_edit =
		{
			rows:[
				{
					cols: [
						{ view:"button", value:"Save" , type:"form"},
						{ view:"button", value:"Delete" , type:"form"}, 
					]
				},
				{ width: 150 }
			]
		};

		var contact_info = 
		{
			cols:[contact_templ, contact_edit]
		};

		return contact_info;
	}
	init(view)
	{
		this.app.attachEvent("contactSelected", (id) => 
		{ 
			//view.parse(getContact(id));
			view.queryView({ view:"template" }).parse(getContact(id));
			alert("data");
		} )
	}
}

function templ(){


				return "#name#"+

			"<div style='background:grey; width:200px; height:160px;'><p class='center'>Status</p></div>"+ 

			"<div class='info_user'><span class ='icons webix_icon fa-envelope'></span>Email: #email#<br>"+
			"<span class ='icons webix_icon fa-skype'></span>Skype: #skype#<br>"+ 
			"<span class ='icons webix_icon fa-tag'></span>Job: #jobe#<br>"+ 
			"<span class ='icons webix_icon fa-briefcase'></span>Company: #company#</div>"+ 

			"<div class='info_user'><span class ='icons webix_icon fa-calendar'></span>Date of birth: <br>"+ 
			"<span class ='icons webix_icon fa-map-marker'></span>Location: <br></div>";
			}