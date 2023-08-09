import React,{useEffect, useState} from 'react';

import { useContext } from 'react';
import {PostContext} from '../../store/PostContext'

import {db} from '../../firebase/config'
import {getDocs,collection, where, query} from 'firebase/firestore'



import './View.css';

function View() {

  const [user1, setUser1] = useState([])

  const {postDetails} = useContext(PostContext);
  
useEffect(()=>{

  const productCollectionRef = query(collection(db,"users"), where ("id","==",postDetails.userId) )

  const getData = async ()=>{
    try{
      const data = await getDocs(productCollectionRef);
      const filterdData = data.docs.map((doc)=>({
        ...doc.data(), id: doc.id,
      }))
      console.log(filterdData);
      setUser1(filterdData)
    }catch(err){
      console.log(err);
    }
  }
getData()


},[])




  return (

    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user1[0]?.username}</p>
          <p>{user1[0]?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
