// Supabase database operations
import { supabase } from './client'

// Services CRUD operations
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getServiceById(id: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function createService(service: any) {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single()

  return { data, error }
}

export async function updateService(id: string, updates: any) {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  return { error }
}

// Projects CRUD operations
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function createProject(project: any) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  return { data, error }
}

export async function updateProject(id: string, updates: any) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  return { error }
}

// Contact messages operations
export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function createContactMessage(message: any) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()
    .single()

  return { data, error }
}

// Profile operations
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}

export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

// Settings operations
export async function getSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single()

  return { data, error }
}

export async function updateSettings(updates: any) {
  const { data, error } = await supabase
    .from('settings')
    .update(updates)
    .eq('id', updates.id || 'DEFAULT_SETTINGS_ID')
    .select()
    .single()

  return { data, error }
}