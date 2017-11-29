const data_ActivitiesTypes = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activitytypes/",
	save: "rest->http://localhost:8096/api/v1/activitytypes/"
});

export function getState() {
	const state = new webix.DataCollection();
	data_ActivitiesTypes.waitData.then(webix.bind(function () {
		this.data.each((obj) => {
			state.add({id: obj.id, value: obj.Value});
		});
	}, data_ActivitiesTypes));
	return state;
}

export function getActivityOptions() {
	return data_ActivitiesTypes.waitData.then(() => {
		let options = [];
		data_ActivitiesTypes.data.each(
			(obj) => {
				options.push(
					{
						id: obj.id,
						value: obj.Value
					});
			}
		);
		return options;
	});
}
