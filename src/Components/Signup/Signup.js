import React, { useState,useContext } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';

import {auth,db,app} from '../../firebase/config' 
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';

import { getDocs,collection,addDoc } from 'firebase/firestore';
import { FirebaseContext } from '../../store/Context';
// import { app } from 'firebase-admin';







const userCollection = collection(db,"users")


export default function Signup() {

  let navigate = useNavigate();

  const {firebase} = useContext(FirebaseContext);

  console.log("firbase context", firebase )

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  console.log(auth?.currentUser?.uid)


async function handleSubmit(){
  try{
   
   let signupResult = await createUserWithEmailAndPassword(auth,email,password)
   const user = signupResult.user;

  
  console.log("User signed in:", user.uid);

   
  let xxx = await updateProfile(user,{displayName:username});
  
  

  await addDoc(userCollection,{username:username,phone:phone,id:auth.currentUser.uid})
  
  navigate('/login')

  }catch(err){
    console.log(err)
  }
}



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <NavLink to={'/login'}>
        <a>Login</a>
        </NavLink>
        
      </div>
    </div>
  );
}
