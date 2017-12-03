import {JetView} from "webix-jet";
import activities_grid from "views/subviews/activities/activities_grid";
import {data_activities} from "models/data_activities";
import ActivityPopup from "views/subviews/activities/activities_popup";
import {data_contacts} from "models/data_contacts";

export default class ContactTabview extends JetView {
	config() {
		let contact_tabview =
{
	view: "tabview",
	cells: [
		{
			header: "Activities",
			autoheaght: true,
			body:
			{
				rows: [
					activities_grid,
					{
						cols: [
							{ },
							{view: "button",
								type: "iconButton",
								icon: "plus-square",
								label: "Add Activity",
								width: 130,
								click: () => this.ActivityPopup.showWindow(data_contacts.getCursor(), "user")}
						]
					}
				]
			}
		},
		{
			header: "Files",
			body: {
				id: "files",
				template: "files"
			}
		}
	]
};
		return contact_tabview;
	}
	init(view) {
		this.ActivityPopup = this.ui(ActivityPopup);
		this.on(this.app, "callWindow", (id) => {
			this.ActivityPopup.showWindow(id);
		});
	}


	urlChange(view, url) {
		if (url[0].params.id) {
			const id = url[0].params.id;
			if (this._ev) {
				$$("activities:grid").data.detachEvent(this._ev);
			}
			this._ev = view.queryView({view: "datatable"}).data.attachEvent("onAfterFilter", function () {
				this.blockEvent();
				this.filter("#ContactID#", id, true);
				this.unblockEvent();
			});
			$$("activities:grid").data.sync(data_activities, function () {
				this.filter(item => item.ContactID == id);
			});
			if ($$("activities:grid").isColumnVisible("ContactID")) {
				$$("activities:grid").hideColumn("ContactID");
			}
		}
	}
}
