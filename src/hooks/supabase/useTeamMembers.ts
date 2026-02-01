import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { TeamMember } from '@/lib/supabase/client'

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('name')

      if (error) throw error
      setTeamMembers(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching team members:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert([{ ...member }])
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setTeamMembers(prev => [data, ...prev])
        return data
      }
    } catch (err) {
      setError(err.message)
      console.error('Error creating team member:', err)
      throw err
    }
  }

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setTeamMembers(prev => prev.map(member => member.id === id ? data : member))
        return data
      }
    } catch (err) {
      setError(err.message)
      console.error('Error updating team member:', err)
      throw err
    }
  }

  const deleteTeamMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setTeamMembers(prev => prev.filter(member => member.id !== id))
    } catch (err) {
      setError(err.message)
      console.error('Error deleting team member:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  return {
    teamMembers,
    loading,
    error,
    fetchTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
  }
}