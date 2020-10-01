import React, {useState} from 'react';

export default function Person(props) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState('');

    var updateName = ()=>{

        setName('India');
        //set State in lazy function
        alert(name);
        //India
    }
      return (
   <div>
    <h4>Name:{name}  Email:{props.email} </h4>
    <button onClick={updateName} >update Name</button>
    </div>
  );
}

export function Rama() {
    return (
      <div>
      <h4>Name: Rama</h4>
      </div>
    );
  }
  