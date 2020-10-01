import React,{useState,useEffect} from 'react';
var apiCustomer = 'http://localhost:4000/api/customer';
   function AddCutomer(props) {
      const [id, setId] = useState(0);
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [address, setAddress] = useState('');
      const [label, setLabel] = useState('Add Customer');
     

      const [init, setInit] = useState(false);
    useEffect(()=>{
        console.log("chnage in DOM" + props.match.params.id);
        if(!init){
            setInit(true);
            if(props.match.params.id !== 'undefined'){
               fetch(apiCustomer+"/"+props.match.params.id )
               .then(res => res.json())
               .then(
                   (result) => {
                      console.log(JSON.stringify(result));
                      setId(result.id);
                      setName(result.name);
                      setPhone(result.phone);
                      setAddress(result.address);
                      setEmail(result.email);
                      setLabel('Update Customer');
                   },
                   // Note: it's important to handle errors here
                   // instead of a catch() block so that we don't swallow
                   // exceptions from actual bugs in components.
                   (error) => {
                       //manage error
                   }
               )
            }
        }
    });
      var handleChange = (e) =>{
         if(e.target.name === "email"){
            setEmail(e.target.value);
         }else if(e.target.name === "name"){
            setName(e.target.value);
         }else if(e.target.name === "address"){
            setAddress(e.target.value);
         }else if(e.target.name === "phone"){
            setPhone(e.target.value);
         }
      }
      var addUpdateCustomer=()=>{
         var methodType = 'post';
         var customer = {name:name,email:email,phone:phone,address:address};
         if(id!=0){ //for edit
            methodType = 'put';
            customer.id = id;
         }
         fetch(apiCustomer,{
            method: methodType,
            body:JSON.stringify(customer),
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
         }) .then(function(result){
               props.history.push('/customer');
            }) 
      }
      return (
         <div>
            <h2>{label}</h2>
            <input name="name" onChange={handleChange} placeholder="name" value={name}/><br/><br/>
            <input name="email" onChange={handleChange} placeholder="email" value={email}/><br/><br/>
            <input name="address" onChange={handleChange} placeholder="address" value={address}/><br/><br/>
            <input name="phone" onChange={handleChange} placeholder="phone" value={phone}/><br/><br/>
            <button onClick={addUpdateCustomer}>Submit</button>
         </div>
      );
   }
    export default AddCutomer;
