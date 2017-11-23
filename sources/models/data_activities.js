const data_activities = new webix.DataCollection({
  url: 'http://localhost:8096/api/v1/activities/',
  save: 'rest->http://localhost:8096/api/v1/activities/'
});

export function getData() {
  return data_activities;
}

export function getDataItem(id) {
  return data_activities.getItem(id)
}

export function addActivity(obj) {
  data_activities.add(obj)
}

export function editActivity(id, obj) {
  data_activities.update(id, obj);
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