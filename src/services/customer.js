var model ={};
var customers = [
	{id:1, name:'Vivek', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'},
	{id:2, name:'Rama', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'},
	{id:3, name:'Krishna', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'},
	{id:4, name:'Rahim', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'}
];

model.getRecords = function(){
	return customers;
}

model.getRecordsBySearch = function(field,text){
	let searchRecords=[];
	for (var i = 0;i < customers.length; i++) {
		if(customers[i][field].startsWith(text)){
			searchRecords.push(customers[i]);
		}
	}
	return searchRecords;
}

model.getRecordById = function(recordId){
	for (var i = 0; i < customers.length; i++) {
		if(recordId == customers[i].id){
			return customers[i];
		}
	}
	return {};
}

model.addRecord = function(record){
	return customers.push(record);
}

model.deleteRecord = function(id){
	let temp = [];
	for (var i = 0; i < customers.length; i++) {
		if(id != customers[i].id){
			temp.push(customers[i]);
		}
	}
	customers = temp;
}

model.updateRecord = function(record){
	let customer = record;
	for (var i = 0; i < customers.length; i++) {
		if(customer.id == customers[i].id){
			customers[i] = customer;
		}
	}
}

export default model;