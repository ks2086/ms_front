import axios from "axios";
const uri = "http://localhost:8000/";

// NEWS
export function getNewsList(){
    return axios.get(uri + "news/list");
}

export function getNewsItemById(id){
    return axios.get(uri + "news/" + id);
}