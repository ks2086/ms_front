import { useRouteError } from "react-router-dom";
function ErrorPageComponent(){

    const error = useRouteError();
    return (
        <div id="error-page">{error.statusText || error.message}</div>
    )

}
export default ErrorPageComponent