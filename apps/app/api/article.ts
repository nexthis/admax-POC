


export async function mostPopular(){
    const supabase = useSupabaseClient();

    const {data, error} = await supabase.from("articles").select("*")

    return data
}

mostPopular.key = "article.top"



export async function get(slug: string ){
    const supabase = useSupabaseClient();

    const {data, error} = await supabase.from("articles").select("*").eq("slug", slug).maybeSingle();

    return data
}

get.key = "article.get"