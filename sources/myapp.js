import "./styles/app.css";
import "./styles/ext.css";
import {JetApp} from "webix-jet";

webix.ready(() => {
	webix.i18n.parseFormat = "%d-%m-%Y";
	webix.i18n.setLocale();
	var app = new JetApp({

		id:			APPNAME,
		version:	VERSION,
		start:		"/top/contacts",
		debug: true
	});
	app.render();

	app.attachEvent("app:error:resolve", function(name, error){
		window.console.error(error);
	});
});