import React from 'react';
import Menu from '../components/Menu'
import customerService from '../services/customer';
import customerGQL,{getRecords,addRecords,deleteRecord,updateRecords,searchRecords} from '../services/customer-gql';

export default class CustomerApp extends React.Component {
    state = { items:[], id:'' , name: '',email:'',address:'',phone:'',dob:'',searchText:'',searchField:'name',buttonLabel:"Add Customer"};
  constructor(p) {
    super(p);  
    //Another approach to handle this 
    // this.handleChange = this.handleChange.bind(this); // line handles this pointer
    // this.handleSubmit = this.handleSubmit.bind(this); // line handles this pointer
  }
  componentDidMount(){
    getRecords().then((result)=>{
        console.log(result)
        this.setState({items:result});
    })
  }
  render() {
    return (
      <div>
        <Menu/>
        <h3>CustomerApp</h3>
        <form onSubmit={this.addUpdateItem}>
              <input type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="name"
              /><br/><br/>
              <input type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="email"
              /><br/><br/>
              <input type="text"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
                placeholder="phone"
              /><br/><br/>
              <input type="text"
                name="address"
                onChange={this.handleChange}
                value={this.state.address}
                placeholder="address"
              /><br/><br/>
              <button>
                {this.state.buttonLabel}
              </button>
              <br/>
              <br/>
        </form>
        <input type="text"
                name="searchText"
                onChange={this.handleChange}
                value={this.state.searchText}
                placeholder="enter text to search"
        />    &nbsp; &nbsp;
        <select name="searchField"
          onChange={this.handleChange}
          value={this.state.searchField}
          >
            <option value = "name">Name</option>
            <option value = "email">E-mail</option>
            <option value = "address">Address</option>
        </select>&nbsp;&nbsp; &nbsp;
         <button onClick={this.searchItems}
         >Search</button> 
         &nbsp;| &nbsp;
         <br/><br/>

        <CustomerList 
        items={this.state.items} 
        editItem={this.editItem} 
        deleteItem={this.deleteItem}/>
      </div>
    );
  }
  handleChange = (e) => {
    //setState is lazy function
    // currentState + 1
    // twice  
    this.setState({ [e.target.name]: e.target.value });
  }

searchItems = () =>{
  if(this.state.searchText!=''){
       searchRecords(this.state.searchText,this.state.searchField).then((result)=>{
        console.log(result)
        this.setState({items:result});
      })
      this.setState({searchText:""});
  }
  else{
    getRecords().then((result)=>{
      //console.log(result)
      this.setState({items:result});
  })
  }
}

deleteItem = (id) => { 
    console.log()
    deleteRecord(id).then((result)=>{
        console.log(result)
        getRecords().then((result)=>{
            //console.log(result)
            this.setState({items:result});
        })
        })
 }
 
  addUpdateItem = (e) => {
    e.preventDefault();
    if (!this.state.name.length) {
      return;
    }
    const newItem = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      //dob: this.state.dob
    };
    if(this.state.id !==''){
        newItem.id = this.state.id;
        updateRecords(newItem).then((result)=>{
            console.log(result)
            getRecords().then((result)=>{
                console.log(result)
                this.setState({items:result});
            })
        })
    }else{
      newItem.id = Date.now();
      addRecords(newItem).then((result)=>{
        console.log(result)
        getRecords().then((result)=>{
            console.log(result)
            this.setState({items:result});
        })
        })
    }
    this.setState({
        name: '',
        email: '',
        phone: '',
        address: '',
        id: '',
        buttonLabel:"Add Customer"
      });
  }
    editItem = (id) => { 
        console.log("edit id:"+id);
        var temp = this.state.items.filter(item => item.id === id);
        if(temp.length == 1){
            this.setState({
                id:temp[0].id,
                name:temp[0].name,
                email:temp[0].email,
                phone:temp[0].phone,
                address:temp[0].address,
                buttonLabel:"Update Customer"
            })
        }
    }
}

class CustomerList extends React.Component {
  render() {
    return (
        <table border="1">
          <thead>
              <tr>
              <th width="20px">No</th>
              <th width="250px">Name</th>
              <th width="220px">Email</th>
              <th width="100px">Phone</th>
              <th width="300px">Address</th>
              <th></th>
              <th></th>
              </tr>
          </thead>
          <tbody>
            {
            this.props.items.map((item) => (
            <tr key={item.id}>
                <td>
                {item.id}
                </td>
                <td  id={item.id}>
                {item.name}
                </td>
                <td>
                {item.email}
                </td>
                <td>
                {item.phone}
                </td>
                <td>
                {item.address}
                </td>
                <td>
                <button onClick={()=>this.props.editItem(item.id)}>Edit</button>
                </td>
                <td>
                <button onClick={()=>this.props.deleteItem(item.id)}>Delete</button>
                </td>
                </tr>
            ))}
          </tbody>
      </table>
    );
  }
}
