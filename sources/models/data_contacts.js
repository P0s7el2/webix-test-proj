export const contacts_data = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
});

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