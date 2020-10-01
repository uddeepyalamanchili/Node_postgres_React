import React from 'react';
import Menu from '../components/Menu'
import customerService from '../services/customer';

export default class CustomerApp extends React.Component {
  state = { items:customerService.getRecords(), id:'' , name: '',email:'',address:'',phone:'',buttonLabel:"Add Customer"};
  constructor(p) {
    super(p);  
    //Another approach to handle this 
    // this.handleChange = this.handleChange.bind(this); // line handles this pointer
    // this.handleSubmit = this.handleSubmit.bind(this); // line handles this pointer
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

  deleteItem = (id) => { 
    console.log()
    customerService.deleteRecord(id);
   // var temp = this.state.items.filter(item => item.id !== id)
    this.setState({ items:customerService.getRecords() });
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
    };
    if(this.state.id !==''){
        newItem.id = this.state.id;
        customerService.updateRecord(newItem);
        this.state.items =  customerService.getRecords();
    }else{
      newItem.id = Date.now();
      customerService.addRecord(newItem);
      this.state.items =  customerService.getRecords();
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
            {this.props.items.map((item) => (
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
