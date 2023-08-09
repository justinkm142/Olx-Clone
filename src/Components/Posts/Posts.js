import React, { useEffect, useState,useContext } from 'react';


import Heart from '../../assets/Heart';
import './Post.css';
import {db} from '../../firebase/config'
import {getDocs,collection} from 'firebase/firestore'
import {PostContext} from '../../store/PostContext'
import {useNavigate} from 'react-router-dom'

function Posts() {


const [product, setProduct] = useState([])
const {setPostDetails} = useContext(PostContext)
const navigate =useNavigate();

useEffect(()=>{
  const productCollectionRef = collection(db,"products")
  console.log("inside useeffect")
  const getData = async ()=>{
    try{
      const data = await getDocs(productCollectionRef);
      const filterdData = data.docs.map((doc)=>({
        ...doc.data(), id: doc.id,
      }))
      console.log(filterdData);
      setProduct(filterdData)
    }catch(err){
      console.log(err);
    }
  }
getData()
},[])



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          
          { product.map((pro)=>{


            return(<div
              className="card"
              onClick={()=>{
                console.log("view clicked", pro)
                setPostDetails(pro);
                navigate('/view')}}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={pro.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {pro.price}</p>
                <span className="kilometer">{pro.category}</span>
                <p className="name"> {pro.name}</p>
               
              </div>
              <div className="date">
                <span>{pro.createdAt }</span>
              </div>
            </div>
            )

          })     
  }
        </div>

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

        { product.map((pro)=>{


          return(<div>
          <div className="card"
          onClick={()=>{
            console.log("view clicked", pro)
            setPostDetails(pro);
            navigate('/view')}}
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={pro.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {pro.price}</p>
              <span className="kilometer">{pro.category}</span>
              <p className="name"> {pro.name}</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>)
      })     
    }

        </div>
      </div>
    </div>
  );
}

export default Posts;
