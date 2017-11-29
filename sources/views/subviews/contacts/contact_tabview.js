import {JetView} from "webix-jet";
import activities_grid from "views/subviews/activities/activities_grid";
import {data_activities} from "models/data_activities";

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
				rows: [activities_grid, {view: "template", template: "", autoheight: true}]
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
		this.on(this.app, "contactSelected", (id) => {
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
		});
	}
}
