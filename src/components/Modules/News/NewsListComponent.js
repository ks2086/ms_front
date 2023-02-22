import { useLoaderData, Link } from "react-router-dom"
import React from "react";
import { getNewsList } from "../../../common/axiosMethods"


export async function loader(){
    return await getNewsList().then(res => {return res.data});
}

function NewsListComponent(){
    
    const news = useLoaderData()
    return(
        <React.Fragment>
            <Link to={'/news/add'}>Dodaj nowy wpis</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tytuł</th>
                        <th>Data dodania</th>
                        <th>Data aktualizacji</th>
                        <th>Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        news.map((item, key) => {
                            return(
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.cdate}</td>
                                    <td>{item.udate == null ? "-" : item.udate}</td>
                                    <td><Link to={`/news/${item.id}`}>Edytuj</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </React.Fragment>
    )

}
export default NewsListComponent