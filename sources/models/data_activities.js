export const data_activities = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activities/",
	save: "rest->http://localhost:8096/api/v1/activities/"
});

export function getStates() {
	const states = new webix.DataCollection();
	data_activities.waitData.then(webix.bind(function () {
		this.data.each((obj) => {
			states.add({id: obj.id, value: obj.State});
		});
	}, data_activities));
	return states;
}
