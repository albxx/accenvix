'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import ProtectedRoute from '@/components/admin/protected-route'
import { Input, TextArea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        setProjects(data || [])
      }
    } catch (err) {
      console.error('Unexpected error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase
        .from('projects')
        .insert([formData])

      if (error) {
        throw new Error(error.message)
      }

      setFormData({ title: '', description: '', image_url: '', link: '' })
      fetchProjects() // Refresh the list
    } catch (err) {
      console.error('Error creating project:', err)
      setSubmitError('Failed to create project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase
        .from('projects')
        .update(formData)
        .eq('id', editingProject.id)

      if (error) {
        throw new Error(error.message)
      }

      setEditingProject(null)
      setFormData({ title: '', description: '', image_url: '', link: '' })
      fetchProjects() // Refresh the list
    } catch (err) {
      console.error('Error updating project:', err)
      setSubmitError('Failed to update project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }

      fetchProjects() // Refresh the list
    } catch (err) {
      console.error('Error deleting project:', err)
      alert('Failed to delete project. Please try again.')
    }
  }

  const handleEditClick = (project: any) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      link: project.link || ''
    })
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
    setFormData({ title: '', description: '', image_url: '', link: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/admin" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/admin/services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Services
                  </Link>
                  <Link href="/admin/projects" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Projects
                  </Link>
                  <Link href="/admin/messages" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Messages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
              </div>

              {/* Project Form */}
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <form onSubmit={editingProject ? handleUpdateProject : handleCreateProject}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Input
                      label="Title"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Image URL"
                      id="image_url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                    />
                    <div className="md:col-span-2">
                      <TextArea
                        label="Description"
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label="Project Link (optional)"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="mt-4 text-red-600 text-sm">{submitError}</div>
                  )}

                  <div className="mt-6 flex space-x-3">
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? (editingProject ? 'Updating...' : 'Creating...') : (editingProject ? 'Update Project' : 'Create Project')}
                    </Button>
                    {editingProject && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* Projects List */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">Existing Projects</h3>
                </div>
                <div className="border-t border-gray-200">
                  {loading ? (
                    <div className="px-4 py-5 sm:px-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                  ) : projects.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {projects.map((project) => (
                        <li key={project.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                                {project.image_url ? (
                                  <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <h4 className="text-sm font-medium text-gray-900">{project.title}</h4>
                                <p className="text-sm text-gray-500 truncate">
                                  {project.description || 'No description'}
                                </p>
                                {project.link && (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                  >
                                    View Project
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditClick(project)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-5 sm:px-6 text-center">
                      <p className="text-gray-500">No projects found. Add your first project above.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
