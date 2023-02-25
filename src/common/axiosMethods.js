import axios from "axios";
const uri = "http://localhost:8000/";

//  LOGIN
export function postAuth(userCredentials){
    return axios.post(uri + "auth", userCredentials)
}

// NEWS
export function getNewsList(){
    return axios.get(uri + "news/list", {
        headers: {
            'x-access-token': localStorage.getItem("jwt")
        }
    });
}

export function getNewsItemById(id){
    return axios.get(uri + "news/" + id, {
        headers: {
            'x-access-token': localStorage.getItem("jwt")
        }
    });
}

export function postNewsUpdateById(id, updateData){
    return axios.post(uri + "news/" + id, updateData, {
        headers: {
            'x-access-token': localStorage.getItem("jwt")
        }
    });
}

export function postNewsCreate(newsData){
    return axios.post(uri + "news/store", newsData, {
        headers: {
            'x-access-token': localStorage.getItem("jwt")
        }
    })
}