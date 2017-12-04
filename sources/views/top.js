import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
	
		let header = {
			type: "header", template: "Start page", id: "header"
		};

		let menu = {
			view: "menu",
			id: "top:menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon fa-#icon#'></span> #value# ",
			data: [
				{value: _("Contacts"), id: "contacts", icon: "users"},
				{value: _("Activities"),		 id: "activities", icon: "calendar"},
				{value: _("Settings"),		 id: "settings", icon: "cogs"}
			]
		};

		let ui =
		{
			rows:
			[
				header,
				{
					cols: [
						menu,
						{type: "clean", rows: [{$subview: true}]}
					]
				}
			]
		};


		return ui;
	}
	init() {
		this.use(plugins.Menu, "top:menu");
		
	}
	urlChange(view, url) {
		let value = $$("top:menu").getSelectedItem();
		$$("header").config.template = webix.template(value.value);
		$$("header").refresh();
	}
}
