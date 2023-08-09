import React from 'react'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'

import { useContext } from 'react';
import {PostContext} from '../store/PostContext'
import { useNavigate } from 'react-router-dom';


function ViewPost(props) {
    let  navigate = useNavigate()
    const {postDetails} = useContext(PostContext);
    return (
        <div>
            <Header />
            {postDetails ? <View/> :  navigate('/')}
            {/* <View/> */}
        </div>
    )
}

export default ViewPost
