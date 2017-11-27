import {JetView} from "webix-jet";
import {getContact} from "models/data_contacts";
import {data_statuses } from "models/data_statuses";

export default class Contacts_info extends JetView {
	config()
	{

		var contact_templ =
		{
			view: "template",
			name: "contactinfo",
			borderless: true,
			template: function(item) 
			{  
				var str = "";

				if (item.FirstName)	
					str +=  "<h1>"+item.FirstName; 
				else 
					str +=  "<h1>FirstName";
				if (item.LastName)	
					str +=  "  " + item.LastName + "</h1>" ;
				else 
					str += " LastName</h1>";

				str += "<div class='status contact-templ'>";

				if(item.Photo) str += "<img class='contactimg' src='" + item.Photo + "'>";
				else str += "<div><span class = 'big_icon icons webix_icon fa-user-circle'> </span></div>";
				
				if (item.StatusIcon) str += "<br> <span class = 'icons webix_icon fa-"+item.StatusIcon+"'> </span>";
				(item.Status)		? 	str += "<p> " + item.Status + "</p>" : str += " contact status";
				
				str+=  "</div><div class='contact-templ'></span>";
				(item.Email)		? 	str += "<span class ='field icons webix_icon fa-envelope'></span>Email: "+ item.Email+"<br>" 				: str += "<span class ='field icons webix_icon fa-envelope'></span>Email: <br>";
				(item.Skype)		? 	str += "<span class ='field icons webix_icon fa-skype'></span>Skype: "+ item.Skype+"<br>" 					: str += "<span class ='field icons webix_icon fa-skype'></span>Skype: <br>";
				(item.Job)			? 	str += "<span class ='field icons webix_icon fa-tag'></span>Job: "+ item.Job+"<br>" 						: str += "<span class ='field icons webix_icon fa-tag'></span>Job: <br>";
				(item.Company)		? 	str += "<span class ='field icons webix_icon fa-briefcase'></span>Company: "+ item.Company+"<br>" 			: str += "<span class ='field icons webix_icon fa-briefcase'></span>Company: <br>";
				(item.Birthday)		? 	str += "<span class ='field icons webix_icon fa-calendar'></span>Date of birth: "+ item.Birthday + "<br>" 	: str += "<span class ='field icons webix_icon fa-calendar'></span>Date of birth: <br>";
				(item.Address)		? 	str += "<span class ='field icons webix_icon fa-map-marker'></span>Location: "+ item.Address +" <br>" 		: str += "<span class ='field icons webix_icon fa-map-marker'></span>Location: <br>";
				str += "</div>";
				
				return  str;
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
			cols:
			[
				{
					rows: [contact_templ, {height: 100, borderless:true}]
				},
				contact_edit
			]
		};
		return contact_info;
	}
	init(view)
	{
		this.on(this.app, "contactSelected", (id) => 
		{ 
			var contact = getContact(id);
			data_statuses.waitData.then(function()
			{
				var obj = data_statuses.getItem(contact.StatusID+1);
				contact.Status = obj.Value;
				contact.StatusIcon = obj.Icon;
				view.queryView({ name: "contactinfo" }).parse(contact);
			});
		} );
	}
}

