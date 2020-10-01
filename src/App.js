import Home from './containers/Home';
import Login from './containers/Login';
import About from './containers/About';
import CustomerApp from './containers/CustomerApp';
import Customer from './containers/Customer';
import CustomerAdd from './containers/CustomerAdd';
import Temperature from './containers/Temperature';
import React, { useContext, createContext, useState,useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export default  function App() {
  return (
    <Router>
    <div style={{marginLeft:'20px',marginRight:'20px',}}>
       <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/customer' component={Customer} />
          <Route exact path='/customer/add' component={CustomerAdd} />
          <Route exact path='/customer/edit/:id' component={CustomerAdd} />
          <Route exact path='/temperature' component={Temperature} />
          <Route exact path='/customer-app' component={CustomerApp} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/about' component={About} />
       </Switch>
    </div>
 </Router>
  );
}