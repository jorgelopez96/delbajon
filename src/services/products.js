import { supabase } from './supabase'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, emoji)')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getAdditionals() {
  const { data, error } = await supabase
    .from('additionals')
    .select('*')
    .eq('active', true)
    .order('name', { ascending: true })
  if (error) throw error
  return data
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function createAdditional(additional) {
  const { data, error } = await supabase
    .from('additionals')
    .insert([additional])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateAdditional(id, updates) {
  const { data, error } = await supabase
    .from('additionals')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteAdditional(id) {
  const { error } = await supabase
    .from('additionals')
    .delete()
    .eq('id', id)
  if (error) throw error
}
