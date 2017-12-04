export const data_contacts = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
});

export function getContactsOptions() {
	return data_contacts.waitData.then(() => {
		let options = [];
		data_contacts.data.each(
			(obj) => {
				options.push(
					{
						id: obj.id,
						value: obj.FirstName || obj.Email
					});
			}
		);
		return options;
	});
}
