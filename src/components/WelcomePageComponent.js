import { useLoaderData } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export async function loader({params}){
    return 0;
}

function WelcomePageComponent(){
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt")
    if(token == null){
        navigate('/login')
    }


    const loaderData = useLoaderData()
    return(
        <p>Main</p>
    )

}
export default WelcomePageComponent