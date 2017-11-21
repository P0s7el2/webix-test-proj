import {JetView} from "webix-jet";
import {data} from "models/records";

export default class DataView extends JetView{
	config(){
		return grid;
	}
	init(view){
		//view.parse(data);
	}
}

var grid = 
{
	id:"productsData",
	view:"datatable", select:true, editable:true, editaction:"dblclick",
	columns:[
		{id:"id", header:" ", width:35, template:"<span  class='webix_icon_btn fa-square-o'></span>"},
		
		{id:"code", header:["Code", {content:"textFilter"} ], sort:"string", minWidth:80, fillspace: 1},
		{id:"name", header:["Name", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"categoryName", header:["Category", {content:"selectFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text",  template:"<div class='category#category#'>#categoryName#</div>"},
		{id:"price", header:["Price"], sort:"int", minWidth:80, fillspace: 1, format:webix.i18n.priceFormat},
		{id:"quantity", header:["Quantity" ], sort:"int", minWidth:60, fillspace: 1},
		{id:"statusName", header:["Status"], minWidth:75, sort:"string", fillspace: 1, template:"<span class='status status#status#'>#statusName#</span>"},

		{id:"edit", header:"&nbsp;", width:35, template:"<span  style=' cursor:pointer;' class='webix_icon fa-pencil'></span>"},
		{id:"delete", header:"&nbsp;", width:35, template:"<span  style='cursor:pointer;' class='webix_icon fa-trash-o'></span>"}
	],

	onClick:{
		"fa-trash-o":function(e,id){
			webix.confirm({
				text:"The product will be deleted. <br/> Are you sure?", ok:"Yes", cancel:"Cancel",
				callback:(res) => {
					// if(res){
					// 	const item = this.getItem(id);
					// 	item.status = "0";
					// 	item.statusName = "Deleted";
					// 	this.refresh(id);
					}
				}
			});
		}
	},
};