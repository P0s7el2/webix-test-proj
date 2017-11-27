const data_activities = new webix.DataCollection({
  url: 'http://localhost:8096/api/v1/activities/',
  save: 'rest->http://localhost:8096/api/v1/activities/'
});

export function getData() {
  return data_activities;
}

export function getActivitiesItem(id) {
  return data_activities.getItem(id);
}

export function setActivities(id, data){ 
  if (!id){data_activities.add(data);}
  else{data_activities.updateItem(id, data);}
}

export function removeActivity(id) {
  data_activities.remove(id);
}

export function getStates() {
  const states = new webix.DataCollection();
  data_activities.waitData.then(webix.bind(function () {
    this.data.each(function (obj ) {
    states.add({id:obj.id, value:(obj.State)});
  });
}, data_activities));
return states;
}