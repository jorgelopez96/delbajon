import { supabase } from './supabase'

const BUCKET = 'product-images'

export async function uploadImage(file, productId) {
  const ext = file.name.split('.').pop()
  const path = `${productId}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteImage(url) {
  const path = url.split(`${BUCKET}/`)[1]
  if (!path) return
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw error
}
