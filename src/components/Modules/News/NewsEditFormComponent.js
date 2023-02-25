import { queries } from "@testing-library/react"
import { useState, useRef } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getNewsItemById, postNewsUpdateById } from "../../../common/axiosMethods"


function NewsEditFormComponent(){

    let {id} = useParams()

    let titleRef = useRef("")
    let contentRef = useRef("")
 

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

                let title = titleRef.current.value === undefined ? titleRef.current : titleRef.current.value
                let content = contentRef.current.value === undefined ? contentRef.current : contentRef.current.value

                postNewsUpdateById(
                    id, 
                    {
                        title: title,
                        content: content
                    }
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
    }

    if(update.data !== undefined){
        changeInputValue(titleRef, update.data.data.data.title)
        changeInputValue(contentRef, update.data.data.data.content)
    }

    const submitForm = (e) => {
        e.preventDefault()
        update.refetch()
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <h2>Edytuj wpis</h2>
            <div>
                <label>Podaj tytuł wpisu</label>
                <input type={"text"} name={"title"} onChange={(e) => changeInputValue(titleRef, e.target.value)} ref={titleRef} defaultValue={titleRef.current}/>
            </div>
            <div>
                <label>Podaj treść wpisu</label>
                <textarea name={"content"} rows="5" onChange={(e) => changeInputValue(contentRef, e.target.value)} ref={contentRef} defaultValue={contentRef.current}></textarea>
            </div>
            <p>
                <button type="submit">Zapisz</button>
            </p>
        </form>
    )
}

export default NewsEditFormComponent