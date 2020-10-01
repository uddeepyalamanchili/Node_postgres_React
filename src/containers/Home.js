import React from 'react';
import Menu from '../components/Menu';
import customerService from '../services/customer';
   function Home() {
      return (
         <div>
            <Menu/>
            <h2>Home</h2>
            <p>We have {customerService.getRecords().length} customers in our record.</p>
         </div>
      );
   }
    export default Home;

