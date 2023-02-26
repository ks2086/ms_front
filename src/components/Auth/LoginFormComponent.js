import { useState } from "react"
import { postAuth } from '../../common/axiosMethods'
import { Navigate } from "react-router-dom"
import { useQuery } from "react-query"

function LoginFormComponent(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState(null)

    const { isLoading, data, isError, error, refetch, isFetching } = useQuery(
        {
            queryKey: ['login', username, password],
            queryFn: () => postAuth({username: username, password: password}),
            enabled: false,
            staleTime: Infinity,
            retry: false
        }
        
    )

    if(isError && validation == null){
        setValidation(error.response.data.error)
    }
    else if(data !== undefined && data.data !== undefined && data.data.token !== undefined && data.data.token !== ""){
        localStorage.setItem("jwt", data.data.token)
        return <Navigate to="/news" replace={true} />
    }
        

    const submitForm = async (e) => {
        e.preventDefault()
        setValidation(null)
        refetch()
    }

    if(isLoading || isFetching){
        return <div>Trwa ładowanie....</div>
    }

    return(
        <>
        {validation}
            <form onSubmit={(e) => submitForm(e)}>

                <div>
                    <label>Podaj adres e-mail</label>
                    <input type={"email"} onChange={(e) => setUsername(e.target.value)} value={username} name={"username"} />
                </div>

                <div>
                    <label>Podaj hasło</label>
                    <input type={"password"} onChange={(e) => setPassword(e.target.value)} name={"password"} />
                </div>

                <div>
                    <input type={"submit"} value={"Zaloguj"} />
                </div>

            </form>
        </>
    )

}
export default LoginFormComponent;