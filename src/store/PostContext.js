import { createContext, useState } from "react";

export const PostContext = createContext(null)


function Post ({children}){
    const [postDetails, setPostDetails]= useState(null);

    const obj = {postDetails,setPostDetails}

    return (
        <PostContext.Provider value={obj}>
            {children}
        </PostContext.Provider>
    )
}

export default Post;