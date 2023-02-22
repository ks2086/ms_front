import { useLoaderData } from "react-router-dom"
import { useState } from "react";


export async function loader({params}){
    return 0;
}

function WelcomePageComponent(){
    const news = useLoaderData()
    return(
        <p>Main</p>
    )

}
export default WelcomePageComponent