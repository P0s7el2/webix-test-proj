export const data_activities_types = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activitytypes/",
	save: "rest->http://localhost:8096/api/v1/activitytypes/"
});

export function getActivityOptions() {
	return data_activities_types.waitData.then(() => {
		let options = [];
		data_activities_types.data.each(
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
