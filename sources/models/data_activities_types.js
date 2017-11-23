const activityTypesCollection = new webix.DataCollection({
  url: 'http://localhost:8096/api/v1/activitytypes/',
  save: 'rest->http://localhost:8096/api/v1/activitytypes/'
});


export function getState() {
  const state = new webix.DataCollection();
  activityTypesCollection.waitData.then(webix.bind(function () {
    this.data.each(function (obj) {
      state.add({id:obj.id, value:(obj.Value)});
    });
  }, activityTypesCollection));
  return state;
}

export function getActivityOptions()
{
	return activityTypesCollection.waitData.then(function()
	{
		var options = [];
		activityTypesCollection.data.each
		(
				function(obj)
			{
				options.push(
				{
					id:obj.id,
					value:obj.Value
				});
			}
		)
		return options;
	})
}