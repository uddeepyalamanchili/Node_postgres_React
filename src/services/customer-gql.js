const {createApolloFetch} = require('apollo-fetch');
const fetch = createApolloFetch({
    uri:'http://localhost:4000/customer'
});
var model ={};
var customers = [
	{id:1, name:'Vivek', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'},
	{id:2, name:'Rama', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'},
	{id:3, name:'Krishna', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'},
	{id:4, name:'Rahim', email:'vivek@gmail.com', phone:'112233', address:'ahmedabad'}
];

export var getRecords = async function(){
    let response = await fetch({
        query: '{ customers { id,name,email,phone,address }}',
      })
    //let result = await response.json();
    return response.data.customers;
  }

export var searchRecords = async function(text,field){
    console.log('fields in search : '+text+' |||'+field);
    var query = `
    {
      customers(`+field+`: "`+text+`") {
        id,
        name,
        email,
        phone,address
      }
    }`;
    let response = await fetch({
        query: query,
      })
    //let result = await response.json();
    console.log("in update :"+JSON.stringify( response));
    return response.data.customers;
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

export var addRecords = async function(record){
    console.log("record in addRecords"+console.log(JSON.stringify(record)));
    var query = `
    mutation {
        addCustomer(name:"`+record.name+`",email:"`+record.email+`",phone:"`+record.phone+`",address:"`+record.address+`") 
        {
          id,
          name,
          email,
          phone,
          address,
        }
      }`;
    console.log("query in add records : \n"+query);
    let response = await fetch({
        query: query,
      })
    console.log("response in add records :"+JSON.stringify(response));
    return {};
  }


  export var updateRecords = async function(record){
    console.log("record in updateRecords"+JSON.stringify(record));
    var query = `
    mutation {
        updateCustomer(id:`+record.id+`,name:"`+record.name+`",email:"`+record.email+`"
          ,phone:"`+record.phone+`",address:"`+record.address+`") 
        {
          id,
          name
          email
          phone
          address
        }
      }`;
    console.log("query in add records : \n"+query);
    let response = await fetch({
        query: query,
      })
    console.log("response in update records :"+JSON.stringify(response));
    return {};
  }

  export var deleteRecord = async function(id){
    console.log("id in delete"+JSON.stringify(id));
    var query = `
    mutation {
        deleteCustomer(id:`+id+`) {
          id
          name
        }
      }`;
    console.log("query in delete record: \n"+query);
    let response = await fetch({
        query: query,
      })
    console.log("response in delete :"+JSON.stringify(response));
    return {};
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