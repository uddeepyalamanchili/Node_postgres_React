import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
   function Menu() {
      var doLogout = () =>{
         localStorage.removeItem('user');
      }
      return (
         <div>
            <h2>Customer Mangement</h2>
                <Link to={'/home'}>Home</Link> | &nbsp;
                <Link to={'/customer'}>Customer</Link> | &nbsp;
                <Link to={'/customer-app'}>CustomerApp</Link> | &nbsp;
                <Link to={'/temperature'}>Temperature</Link> | &nbsp;
                <Link to={'/about'}>About</Link> | &nbsp;
                <Link onClick={doLogout} to={'/login'}>Logout</Link> 
            <hr />
         </div>
      );
   }
    export default Menu;
