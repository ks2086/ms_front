import { Link } from "react-router-dom";

function NavigationPartial(){

    return(
        <ul>
            <li><Link to={'/'}>Strona główna</Link></li>
            <li><Link to={'/news'}>Aktualności</Link></li>
        </ul>
    )

}

export default NavigationPartial;