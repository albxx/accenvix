import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Task } from '@/lib/supabase/client'

export const useTasks = (projectId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = async (projId?: string) => {
    try {
      setLoading(true)
      let query = supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (projId) {
        query = query.eq('project_id', projId)
      }

      const { data, error } = await query

      if (error) throw error
      setTasks(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...task }])
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setTasks(prev => [data, ...prev])
        return data
      }
    } catch (err) {
      setError(err.message)
      console.error('Error creating task:', err)
      throw err
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setTasks(prev => prev.map(task => task.id === id ? data : task))
        return data
      }
    } catch (err) {
      setError(err.message)
      console.error('Error updating task:', err)
      throw err
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (err) {
      setError(err.message)
      console.error('Error deleting task:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchTasks(projectId)
  }, [projectId])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  }
}