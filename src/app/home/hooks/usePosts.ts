import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { postService } from "../service/post.service"
import { notFetchError } from "@/global-data/static/styles/functions/notFetchError"

export function usePost(page: number) {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => postService.getPosts(page),
        select: data => data.data,
    })

    useEffect(() => {
        if (isError) {
            notFetchError(error.message)
        }
    }, [isError])


    return { data, isError, isLoading }
}