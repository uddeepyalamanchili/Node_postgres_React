import React,{useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
   function Login(props) {
      const [email, setEmail] = useState('admin');
      const [password, setPassword] = useState("admin");
      var handleChange = (e) =>{
         if(e.target.name === "email"){
            setEmail(e.target.value);
         }else if(e.target.name === "password"){
            setPassword(e.target.value);
         }
      }
      return (
         <div>
            <h2>Login</h2>
            <Form>
               <FormGroup>
               <Label for="exampleEmail">Email</Label>
               <Input type="email" name="email" id="exampleEmail"  onChange={handleChange} value={email}  placeholder="with a placeholder" />
               </FormGroup>
               <FormGroup>
               <Label for="examplePassword">Password</Label>
               <Input type="password" name="password" id="examplePassword"  onChange={handleChange}  value={password} placeholder="password placeholder" />
               </FormGroup>
               <Button color="primary" onClick={()=>{
               if(email === password){
                  localStorage.setItem('user',email);
                  props.history.push('/customer-app');
               }else{
                  alert('Incorrect email or password. Please try again.')
               }
            }}>Submit</Button>
            </Form>
         </div>
      );
   }
    export default Login;
