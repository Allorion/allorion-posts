import axios, { AxiosResponse } from "axios"
import { IComment, IPost, IPostForm } from "../types/home.type"

class PostService {

    private URL: string = 'https://jsonplaceholder.typicode.com/posts'

    getPosts(page: number): Promise<AxiosResponse<IPost[], any>> {
        return axios.get<IPost[]>(`${this.URL}?_page=${page}&_limit=20`)
    }

    getPostById(id: string): Promise<AxiosResponse<IPost, any>> {
        return axios.get<IPost>(`${this.URL}/${id}`)
    }

    getCommentForPost(id: string): Promise<AxiosResponse<IComment[], any>> {
        return axios.get<IComment[]>(`${this.URL}/${id}/comments`)
    }

    addPost(data: IPostForm) {
        return axios.post<IPost>(`${this.URL}`, data, { headers: { 'Content-type': 'application/json; charset=UTF-8', }, })
    }

}

export const postService = new PostService() 