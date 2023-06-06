import { useQuery } from "@tanstack/vue-query";
import {  get } from "@/api/article"

export function useGetArticle(slug: string){
    const result = useQuery([get.key, slug],() => get(slug))
    
    onServerPrefetch(async () => {
      await result.suspense()
    })



    return result
}