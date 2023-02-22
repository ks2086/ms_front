import React from "react";
import { useLoaderData, useParams, Form, redirect } from "react-router-dom"
import { getNewsItemById } from "../../../common/axiosMethods"
export async function loader({params}){
    return await getNewsItemById(params.id).then(res => {return res.data});
}

export async function editAction({ request, params }){
    const formData = await request.formData()
    const update = Object.fromEntries(formData)

    console.log(update)

    return redirect(`/news/${params.id}`);
}

function NewsEditComponent(){
    const news = useLoaderData();
    if(news.length > 0){

    }
    return (
        <React.Fragment>
            {
                news.map((item, key) => {
                    return(
                        <Form method="post" id="news-item-form" key={key}>
                            <input type={"hidden"} name="id" value={item.id} />
                            <div>
                                <label>Podaj tytuł wpisu</label>
                                <input type={"text"} name={"title"} defaultValue={item.title} />
                            </div>
                            <div>
                                <label>Podaj treść wpisu</label>
                                <textarea name={"content"} rows="5" defaultValue={item.content}></textarea>
                            </div>
                            <p>
                                <button type="submit">Zapisz</button>
                            </p>
                        </Form>
                    )
                })
            }
        </React.Fragment>
    )
}

export default NewsEditComponent