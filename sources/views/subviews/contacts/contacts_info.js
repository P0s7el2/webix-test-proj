import {JetView} from "webix-jet";
import {getContact} from "models/data_contacts";

export default class Contacts_info extends JetView {
	config()
	{
		var contact_templ =
		{
			view: "template",
			template: function(item) 
			{  
				var str = " ";
				
				(typeof item.FirstName != "undefined")	?	str += "<h1>"+item.FirstName+"</h1>" 				: str+=  "<h1> </h1>" ; 
				(typeof item.LastName != "undefined")	? 	str += "<h1>" + item.LastName + "</h1>" 			: str+=  "<h1> </h1>";
				(typeof item.Photo != "undefined")		?	str += "<img class='contactimg' src='"+item.Photo+"'>" 				: str+=  "<img src='standart_photo'>";
				(typeof item.Status != "undefined")		? 	str += "<p class='center'>"+item.Status+"</p>"		: str+=  "<p class='center'> __</p>";

				(typeof item.email != "undefined")		? 	str += "<span class ='icons webix_icon fa-envelope'></span>Email:"+ item.email+"<br>" 		: str+=  "<span class ='icons webix_icon fa-envelope'></span>Email: __ <br>";
				(typeof item.skype != "undefined")		? 	str += "<span class ='icons webix_icon fa-skype'></span>Skype:"+ item.skype+"<br>" 			: str+= "<span class ='icons webix_icon fa-skype'></span>Skype: __<br>";
				(typeof item.job != "undefined")		? 	str += "<span class ='icons webix_icon fa-tag'></span>Job:"+ item.job+"<br>" 				: str += "<span class ='icons webix_icon fa-tag'></span>Job: __<br>";
				(typeof item.company != "undefined")	? 	str += "<span class ='icons webix_icon fa-briefcase'></span>Company:"+ item.company+"<br>" 	: str += "<span class ='icons webix_icon fa-tag'></span>Job: __<br>";

				(typeof item.Birthday != "undefined")	? 	str += "<span class ='icons webix_icon fa-calendar'></span>Date of birth:"+ item.Birthday + "<br>" 	: str += "<span class ='icons webix_icon fa-calendar'></span>Date of birth: __<br>";
				(typeof item.Address != "undefined")	? 	str += "<span class ='icons webix_icon fa-map-marker'></span>Location:"+ item.Address +" <br>" 		: str += "<span class ='icons webix_icon fa-map-marker'></span>Location: __<br>"; 
				
				return  str;
			}
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
		} )
	}
}

