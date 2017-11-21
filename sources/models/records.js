export const data = new webix.DataCollection({ data:[
	{ id:1, name:"The Shawshank Redemption", email:1994, company:678790, image:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_.jpg", rank:1},
	{ id:2, name:"The Godfather", email:1972, company:511495, image:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_.jpg", rank:2},
	{ id:3, name:"The Godfather: Part II", email:1974, company:319352, image:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_.jpg", rank:3},
	{ id:4, name:"The Good, the Bad and the Ugly", email:1966, company:213030, image:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_.jpg", rank:4},
	{ id:5, name:"My Fair Lady", email:1964, company:533848, image:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_.jpg", rank:5},
	{ id:6, name:"12 Angry Men", email:1957, company:164558, image:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_.jpg", rank:6}
]});


export function getContact(id){
	return data.getItem(id);
}