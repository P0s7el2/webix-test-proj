export const data_ActivitiesTypes = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activitytypes/",
	save: "rest->http://localhost:8096/api/v1/activitytypes/"
});

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
