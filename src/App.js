import React,{useEffect,useContext} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

import {auth} from './firebase/config' 
// import { onAuthStateChanged } from 'firebase/auth';



import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create';
import View from './Pages/ViewPost'
import { AuthContext } from './store/Context';
import Post from './store/PostContext';


const router =createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/signup',
    element:<SignupPage />
  },
  {
    path:'/login',
    element:<LoginPage />
  },
  {
    path:'/create',
    element:<CreatePage />
  },
  {
    path:'/view',
    element:<View />
  }
  
])

function App() {
  const {setUser} = useContext(AuthContext)
  // const {firebase} = useContext(FirebaseContext)
   useEffect( ()=>{
   
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user)
        console.log("User is signed in:", user.uid);
      } else {
        // User is signed out
        console.log("User is signed out.");
      }
    });
  })

  return (
    <div>
      <Post>
      <RouterProvider router = {router} />
      </Post>
    </div>
  );
}

export default App;
