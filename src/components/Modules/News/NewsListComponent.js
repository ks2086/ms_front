import React from "react";
import { Link } from "react-router-dom"
import { getNewsList } from "../../../common/axiosMethods"
import { useQuery } from "react-query";



function NewsListComponent(){

    const { isLoading, data, isError, error, refetch, isFetching } = useQuery(
        {
            queryKey: ['newsList'],
            queryFn: getNewsList,
            enabled: true,
            staleTime: Infinity,
            retry: false
        }
    )

    if(isLoading || isFetching){
        return <div>Is Loading...</div>
    }

    if(isError){
        return <div>Wystapił bład podczas ładowania treści</div>
    }

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
                        data?.data.map((item, key) => {
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