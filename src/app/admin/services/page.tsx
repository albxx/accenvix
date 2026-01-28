'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import ProtectedRoute from '@/components/admin/protected-route'

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_url: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching services:', error)
      } else {
        setServices(data || [])
      }
    } catch (err) {
      console.error('Unexpected error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase
        .from('services')
        .insert([formData])

      if (error) {
        throw new Error(error.message)
      }

      setFormData({ title: '', description: '', icon_url: '' })
      fetchServices() // Refresh the list
    } catch (err) {
      console.error('Error creating service:', err)
      setSubmitError('Failed to create service. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase
        .from('services')
        .update(formData)
        .eq('id', editingService.id)

      if (error) {
        throw new Error(error.message)
      }

      setEditingService(null)
      setFormData({ title: '', description: '', icon_url: '' })
      fetchServices() // Refresh the list
    } catch (err) {
      console.error('Error updating service:', err)
      setSubmitError('Failed to update service. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }

      fetchServices() // Refresh the list
    } catch (err) {
      console.error('Error deleting service:', err)
      alert('Failed to delete service. Please try again.')
    }
  }

  const handleEditClick = (service: any) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description || '',
      icon_url: service.icon_url || ''
    })
  }

  const handleCancelEdit = () => {
    setEditingService(null)
    setFormData({ title: '', description: '', icon_url: '' })
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
                  <Link href="/admin/services" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Services
                  </Link>
                  <Link href="/admin/projects" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
                <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
              </div>

              {/* Service Form */}
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <form onSubmit={editingService ? handleUpdateService : handleCreateService}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="icon_url" className="block text-sm font-medium text-gray-700">
                        Icon URL
                      </label>
                      <input
                        type="text"
                        name="icon_url"
                        id="icon_url"
                        value={formData.icon_url}
                        onChange={(e) => setFormData({...formData, icon_url: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="mt-4 text-red-600 text-sm">{submitError}</div>
                  )}

                  <div className="mt-6 flex space-x-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (editingService ? 'Updating...' : 'Creating...') : (editingService ? 'Update Service' : 'Create Service')}
                    </button>
                    {editingService && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Services List */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">Existing Services</h3>
                </div>
                <div className="border-t border-gray-200">
                  {loading ? (
                    <div className="px-4 py-5 sm:px-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                  ) : services.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {services.map((service) => (
                        <li key={service.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {service.icon_url ? (
                                <img
                                  src={service.icon_url}
                                  alt={service.title}
                                  className="h-10 w-10 rounded-full"
                                />
                              ) : (
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                </div>
                              )}
                              <div className="ml-4">
                                <h4 className="text-sm font-medium text-gray-900">{service.title}</h4>
                                <p className="text-sm text-gray-500 truncate">
                                  {service.description || 'No description'}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditClick(service)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
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
                      <p className="text-gray-500">No services found. Add your first service above.</p>
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