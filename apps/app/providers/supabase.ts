import { joinURL, withQuery } from 'ufo'

const defaultModifiers = {}





// https://supabase.com/blog/storage-image-resizing-smart-cdn
export const getImage = (src: string, {
  modifiers = {},
  baseURL = '/'
} = {}) => {

  const operations = { ...defaultModifiers, ...modifiers }

//   console.log(operations);
  
  // const operations = operationsGenerator(mergeModifiers as any)
  // GET https://project_id.supabase.co/storage/v1/render/image/public/bucket/image.jpg?width=500&height=600
  // https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
  const url = operations ? withQuery( joinURL(baseURL.replace("object", "render/image"), src), operations) : joinURL(baseURL, src)

  return {
    url
  }
}