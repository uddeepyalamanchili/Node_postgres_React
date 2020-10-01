import React,{useEffect,useState} from 'react';
import Menu from '../components/Menu'
import { Table } from 'reactstrap';

var apiCustomer = 'http://localhost:4000/api/customer';
export default function CustomerList(props) {
    const [init, setInit] = useState(false);
    const [customers, setCustomers] = useState([]);
    useEffect(()=>{
        console.log("chnage in DOM");
        if(!init){
            setInit(true);
            fetch(apiCustomer)
            .then(res => res.json())
            .then(
                (result) => {
                    setCustomers(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //manage error
                }
            )
        }
    });
    var doDelete= (record) =>{
        fetch(apiCustomer,{
            method: 'delete',
            body:JSON.stringify(record),
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
         })
            .then(res => res.json())
            .then(
                (result) => {
                    setInit(false);
                },
                (error) => {
                    //manage error
                }
            )
    }
    return (
        <div>
        <Menu/>
        <h3>Customers</h3>
        <button onClick={()=>{
            props.history.push("/customer/add");
        }}>Add Customer</button><br/><br/>

<Table bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {customers.map((item) => (
            <tr key={item.id}>
                <td>
                {item.id}
                </td>
                <td>
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
                <button  onClick={()=>{
                    props.history.push("/customer/edit/"+item.id);
                    }} >Edit</button>
                </td>
                <td>
                <button onClick={()=>doDelete(item)}>Delete</button>
                </td>
                </tr>
            ))}
      </tbody>
    </Table>
      </div>
    );

}
