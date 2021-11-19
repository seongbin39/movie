import React from "react";

function Home({...rest}){
    return(
        <div>
            <h1>Home</h1>
            <h1>{rest.title}</h1>
        </div>
        
    )
}

export default Home