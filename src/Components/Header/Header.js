import React,{useContext} from 'react';
// import {auth,app,db} from '../../firebase/config' 
import { signOut,getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../store/Context';


const auth1 = getAuth()


function Header() {
  const navigate =useNavigate();
  const {user} = useContext(AuthContext)

  function signOutpage(){
    
     signOut(auth1);
     navigate('/login'); 
  }


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <div>
          {user.displayName ? <span>Welcome {user.displayName}</span> : <NavLink to={'/login'} >Login</NavLink>}
          <hr />
          {user.displayName ? <span onClick={signOutpage}>Sign Out</span> : <span></span>}
        </div>
          
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <NavLink to={'/create'} > <span>SELL</span> </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
