import {JetView} from "webix-jet";
import {getContact} from "models/data_contacts";
import {getStatuses } from "models/data_statuses";

export default class Contacts_info extends JetView {
	config()
	{

		var contact_templ =
		{
			view: "template",
			name: "contactinfo",
			template: function(item) 
			{  
				var str = "";
				if (typeof item.FirstName != "undefined")	str +=  "<div class='user-column'> <h1>"+item.FirstName; 
				else if (typeof item.LastName != "undefined")	str +=  item.LastName + "</h1>" ;
				else str += "</h1>";
				(typeof item.Photo != "undefined")		?	str += "<img class='contactimg' src='"+item.Photo+"'> </div><div class='user-column'>"	: str+=  "<img src='standart_photo'></div><div class='user-column'>";
				

				(typeof item.email != "undefined")		? 	str += "<span class ='icons webix_icon fa-envelope'></span>Email:"+ item.email+"<br>" 		: str+=  "<span class ='icons webix_icon fa-envelope'></span>Email: __ <br>";
				(typeof item.skype != "undefined")		? 	str += "<span class ='icons webix_icon fa-skype'></span>Skype:"+ item.skype+"<br>" 			: str+= "<span class ='icons webix_icon fa-skype'></span>Skype: __<br>";
				(typeof item.job != "undefined")		? 	str += "<span class ='icons webix_icon fa-tag'></span>Job:"+ item.job+"<br>" 				: str += "<span class ='icons webix_icon fa-tag'></span>Job: __<br>";
				(typeof item.company != "undefined")	? 	str += "<span class ='icons webix_icon fa-briefcase'></span>Company:"+ item.company+"<br>" 	: str += "<span class ='icons webix_icon fa-briefcase'></span>Job: __<br>";

				(typeof item.Birthday != "undefined")	? 	str += "<span class ='icons webix_icon fa-calendar'></span>Date of birth:"+ item.Birthday + "<br>" 	: str += "<span class ='icons webix_icon fa-calendar'></span>Date of birth: __<br>";
				(typeof item.Address != "undefined")	? 	str += "<span class ='icons webix_icon fa-map-marker'></span>Location:"+ item.Address +" <br>" 		: str += "<span class ='icons webix_icon fa-map-marker'></span>Location: __<br>"; 
				str += "</div>";
				return  str;
			}
		};

		var status = 
		{ 
			view:"template", 
			name: "status",
			template: function(item)
			{
				var str = ""; 
				if(typeof item.icon != "undefined") str += "<span class ='icons webix_icon fa-" + item.icon + "'>";
				else if(typeof item.value != "undefined") str += item.value + "</span>";
				else str += "</span>";
				return str;
			}
		};

		var contact_edit =
		{
			rows:[
				{
					cols: [
						{ view:"button", value:"Save" , type:"form"},
						{ view:"button", value:"Delete" , type:"form"}
					]
				},
				{ width: 150 }
			]
		};

		var contact_info = 
		{
			cols:[
			 {rows: [contact_templ, status]},
			 contact_edit]
		};
		return contact_info;
	}
	init(view)
	{
		this.on(this.app, "contactSelected", (id) => 
		{ 
			var contact = getContact(id);
			view.queryView({ name: "contactinfo" }).parse(contact);
			view.queryView({ name: "status" }).parse(getStatuses(contact.StatusID+1));
		} );
	}
}

