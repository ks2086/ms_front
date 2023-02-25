import { NavLink } from "react-router-dom";

function NavigationPartial(){

    return(
        <ul>
            <li><NavLink to={'/'}>Strona główna</NavLink></li>
            <li><NavLink to={'/news'}>Aktualności</NavLink></li>
            <li><NavLink to={'/logout'}>Wyloguj</NavLink></li>
        </ul>
    )

}

export default NavigationPartial;