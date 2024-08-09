"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { postService } from "../service/post.service"
import { notFetchError } from "@/global-data/static/styles/functions/notFetchError"

export function useComments(id: string) {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => postService.getCommentForPost(id),
        select: data => data.data,
        enabled: !!id
    })

    useEffect(() => {
        if (isError) {
            notFetchError(error.message)
        }
    }, [isError])


    return { data, isError, isLoading }
}