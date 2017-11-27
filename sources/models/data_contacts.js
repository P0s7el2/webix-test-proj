export const contacts_data = new webix.DataCollection({ data:
	[
		{"id":1,"FirstName":"1name","LastName":"2name","StatusID":0,"Company":"xbsoft","Address":"minsk","Job":"job11","Website":"vk","Skype":"skp","Phone":"228","Email":"alex@gmail.com","Photo":"http://designgrapher.com/wp-content/uploads/2013/08/still-life-photography30.jpg","Birthday":"01-01-0001","StartDate":"01-01-0001"},
		{"id":2,"FirstName":"","LastName":"","StatusID":0,"Company":"","Address":"","Job":"","Website":"","Skype":"","Phone":"","Email":"doris@gmail.com","Photo":"http://designgrapher.com/wp-content/uploads/2013/08/still-life-photography30.jpg","Birthday":"01-01-0001","StartDate":"01-01-0001"},
		{"id":3,"FirstName":"Alex","LastName":"Brown","StatusID":0,"Company":"","Address":"","Job":"","Website":"","Skype":"","Phone":"","Email":"","Photo":"","Birthday":"16-08-1988","StartDate":"01-01-0001"}
	]});


// export const data = new webix.DataCollection({
// 	url: "http://localhost:8096/api/v1/contacts/",
// 	save: "rest->http://localhost:8096/api/v1/contacts/"
// });

export function getContact(id){
	return contacts_data.getItem(id);
}

export function getOptions(){
    var options = new webix.DataCollection();

contacts_data.waitData.then(webix.bind(function(){
       this.data.each(function(obj){
        options.add({id:obj.id, value:(obj.FirstName || obj.Email)});
    });
},contacts_data));

return options;
}

export function getContactsOptions()
{
    return contacts_data.waitData.then(function()
    {
        var options = [];
        contacts_data.data.each
        (
                function(obj)
            {
                options.push(
                {
                    id:obj.id,
                    value:(obj.FirstName || obj.Email)
                });
            }
        )
        return options;
    })
}