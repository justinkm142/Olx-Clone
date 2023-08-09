import React,{useState}  from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

import {auth,db} from '../../firebase/config' 
import { signInWithEmailAndPassword } from 'firebase/auth';


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let navigate = useNavigate();

  async function signin(){
    try{

      let loginResult= await signInWithEmailAndPassword(auth,email,password)
      console.log (loginResult)
      
      navigate('/')

    }catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e)=>e.preventDefault()}>
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
          <button onClick={signin}>Login</button>
        </form>
        <NavLink to={'/signup'} >
        <a>Signup</a>
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
