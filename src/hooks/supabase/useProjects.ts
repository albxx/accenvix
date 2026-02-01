import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Project } from '@/lib/supabase/client'

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...project }])
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setProjects(prev => [data, ...prev])
        return data
      }
    } catch (err) {
      setError(err.message)
      console.error('Error creating project:', err)
      throw err
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setProjects(prev => prev.map(project => project.id === id ? data : project))
        return data
      }
    } catch (err) {
      setError(err.message)
      console.error('Error updating project:', err)
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setProjects(prev => prev.filter(project => project.id !== id))
    } catch (err) {
      setError(err.message)
      console.error('Error deleting project:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  }
}