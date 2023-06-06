import { useQuery } from "@tanstack/vue-query";
import { mostPopular } from "@/api/article"



export function useTopArticles(){
    const result = useQuery([mostPopular.key], mostPopular)

    onServerPrefetch(async () => {
      await result.suspense()
    })

    return result
}