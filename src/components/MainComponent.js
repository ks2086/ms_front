import React from "react";
import { Outlet } from "react-router-dom";

import NavigationPartial from "../partials/NavigationPartial";

function MainComponent(){

    return(
        <React.Fragment>
            <NavigationPartial />
            <Outlet />
        </React.Fragment>
    )

} 
export default MainComponent