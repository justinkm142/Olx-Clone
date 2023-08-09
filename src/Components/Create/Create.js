import React, { Fragment,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { db,auth,storage } from '../../firebase/config';
import{ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { getDocs,collection,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const userCollection = collection(db,"products")

const Create = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null)
  let todayDate = new Date() ;
  todayDate= todayDate.toDateString()
  const uploadDetails = async ()=>{
    if(!image) return;
    const fileUploadRef = ref(storage,`productImages/${image.name}`)
    try{
      await uploadBytes(fileUploadRef,image)
      let downloadURL = await getDownloadURL(fileUploadRef)
      await addDoc(userCollection,{name:name,category:category,price:price,userId:auth.currentUser.uid,url:downloadURL,createdAt:todayDate})

      navigate('/')
    }catch(err){
      console.log(err);
    }
    
  };
 

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
            onChange={(e)=> setName(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
             onChange={(e)=> setCategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
            onChange={(e)=> setPrice(e.target.value)}
            className="input" 
            type="number" id="fname" 
            name="Price" 
            value={price}/>
            
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input 
            onChange={(e)=>{
              setImage(e.target.files[0])
            }}
            type="file" />
            <br />
            <button onClick={uploadDetails} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
