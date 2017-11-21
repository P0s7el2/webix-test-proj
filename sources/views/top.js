import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		var header = {
			type:"header", template:"Start page", id:"header"
		};

		var menu = {
			view:"menu", id:"top:menu", 
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon fa-#icon#'></span> #value# ",
			data:[
				{ value:"Contacts", id:"contacts", icon:"users" },
				{ value:"Activities",		 id:"activities",  icon:"calendar" },
				{ value:"Settings",		 id:"top",  icon:"cogs" }
			]
		};

		var ui = 
		{
			rows:
			[
				header, 
				{
					cols: [
						menu,
						{type:"clean", rows: [{$subview:true}] } 
					]
				}
			]
		};


		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
	urlChange(view, url){
		$$("header").config.template = webix.template(url[1].page);
		$$("header").refresh();
	}
}