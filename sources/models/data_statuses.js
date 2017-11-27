const data_statuses = new webix.DataCollection({
  url: 'http://localhost:8096/api/v1/statuses/',
  save: 'rest->http://localhost:8096/api/v1/statuses/'
});

export function getStatuses() {
return data_statuses.waitData.then(function()
	{
		var options = [];
		data_statuses.data.each
		(
				function(obj)
			{
				options.push(
				{
					//id:obj.id,
					value:obj.Value,
					icon:obj.Icon


				});
			}
		)
		return options;
	})
}