import {useHistory} from 'react-router-dom';
import React, { useState,useContext } from 'react';
import {  createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth'; // Import the specific functions
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { auth } from '../../Firebase/Config';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function Signup() {
  const history = useHistory()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const {Firebase} = useContext(FirebaseContext);
  

  
  // const handleSubmit = (e)=>{
  //   e.preventDefault()
  //   createUserWithEmailAndPassword(email,password).then((result)=>{
  //     result.user.updateProfile({displayName:username})
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = authCred.user;
      
      // Update user profile
      await updateProfile(user,{ displayName: username });
  
     // Add the user data to the Firestore database
     const db = getFirestore(Firebase);
     await addDoc(collection(db, 'users'), {
       uid: user.uid,
       username,
       email,
       phone,
     }).then(()=>{
      history.push("/login")
     })

    } catch (error) {
      console.error('Error creating user:', error);
    
    }
  };
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
