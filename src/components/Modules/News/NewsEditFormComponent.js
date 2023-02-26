import { useRef } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getNewsItemById, postNewsUpdateById } from "../../../common/axiosMethods"


function NewsEditFormComponent(){

    let {id} = useParams()

    let titleRef = useRef("")
    let contentRef = useRef("")
    let imageRef = useRef("")
    let imageRefURL = useRef("")
 

    const single = useQuery(
        {
            queryKey: ['newsSingle', id],
            queryFn: () => getNewsItemById(id),
            enabled: true,
            staleTime: Infinity,
            retry: false
        }
    )

    const update = useQuery(
        {
            queryKey: ['newsUpdate', id],
            queryFn: () => {

                let formData = new FormData()
                formData.append('title', titleRef.current)
                formData.append('content', contentRef.current)
                formData.append('image', imageRef.current)

                postNewsUpdateById(
                    id, 
                    formData
                )
                
            },
            enabled: false,
            staleTime: Infinity,
            retry: false
        }
    )

    const changeInputValue = (ref, value) => {
        ref.current = value
    }

    if(single.isLoading || single.isFetching || update.isLoading || update.isFetching){
        return <div>Is Loading...</div>
    }

    if(single.isError || update.isError){
        return <div>ERROR</div>
    }

    if(single.data !== undefined && single.data.data !== undefined){
        changeInputValue(titleRef, single.data.data.title)
        changeInputValue(contentRef, single.data.data.content)
        changeInputValue(imageRefURL, single.data.data.image)
    }

    if(update.data !== undefined){
        changeInputValue(titleRef, update.data.data.data.title)
        changeInputValue(contentRef, update.data.data.data.content)
        changeInputValue(imageRefURL, update.data.data.data.image)
    }

    const submitForm = (e) => {
        e.preventDefault()
        update.refetch()
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <h2>Edytuj wpis</h2>
            <div>
                <img src={imageRefURL.current} alt="" style={{width: '200px', height: '200px'}} crossOrigin="true" />
            </div>
            <div>
                <label>Podaj tytuł wpisu</label>
                <input type={"text"} name={"title"} onChange={(e) => changeInputValue(titleRef, e.target.value)} defaultValue={titleRef.current}/>
            </div>
            <div>
                <label>Podaj treść wpisu</label>
                <textarea name={"content"} rows="5" onChange={(e) => changeInputValue(contentRef, e.target.value)} defaultValue={contentRef.current}></textarea>
            </div>
            <div>
                <label>Wybierz zdjęcie wpisu</label>
                <input type={"file"} name={"image"} onChange={(e) => changeInputValue(imageRef, e.target.files[0])} />
            </div>
            <p>
                <button type="submit">Zapisz</button>
            </p>
        </form>
    )
}

export default NewsEditFormComponent