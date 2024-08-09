import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postService } from "../service/post.service"
import { IPostForm } from "../types/home.type"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { notFetchError } from "@/global-data/static/styles/functions/notFetchError"

export function useAddPost() {

    const queryClient = useQueryClient();

    const router = useRouter()

    const { data, isError, error, mutate, isPending } = useMutation({
        mutationKey: ['add post'],
        mutationFn: (data: IPostForm) => postService.addPost(data),
        onSuccess: (data) => {
            const newPost  = data.data
            
            queryClient.setQueryData(['post', newPost.id.toString()], { data: newPost });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            router.push(`/${newPost.id}`)
        },
    })

    useEffect(() => {
        if (isError) {
            notFetchError(error.message)
        }
    }, [isError])


    return { data, isError, isPending, mutate}
}