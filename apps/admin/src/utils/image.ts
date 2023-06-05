export function image(src: string) {
  return new URL(src, import.meta.env.VITE_SUPABASE_IMAGE).href
}