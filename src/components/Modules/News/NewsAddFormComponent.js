import { useState } from "react"
import { useQuery } from "react-query"
import {postNewsCreate} from '../../../common/axiosMethods'

function NewsAddFormComponent(){

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const {isLoading, isFetching, isError, data, error, refetch} = useQuery(
        {
            queryKey: ['newsStore', title, content],
            queryFn: () => postNewsCreate({title: title, content: content}),
            enabled: false,
            staleTime: Infinity,
            retry: false
        }
    )

    if(isLoading || isFetching){
        return <div>Is Loading...</div>
    }

    if(isError){
        return <div>ERROR</div>
    }

    console.log(data)

    const submitForm = (e) => {
        e.preventDefault()
        refetch()
    }

    return(
        <form onSubmit={(e) => submitForm(e)}>
            <h2>Dodaj nowy wpis</h2>
            <div>
                <label>Podaj tytuł wpisu</label>
                <input type={"text"} name={"title"} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Podaj treść wpisu</label>
                <textarea name={"content"} rows="5" onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <p>
                <button type="submit">Zapisz</button>
            </p>
        </form>
    )

}
export default NewsAddFormComponent