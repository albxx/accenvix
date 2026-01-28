'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import ProtectedRoute from '@/components/admin/protected-route'

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        setMessages(data || [])
      }
    } catch (err) {
      console.error('Unexpected error fetching messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }

      fetchMessages() // Refresh the list
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error('Error deleting message:', err)
      alert('Failed to delete message. Please try again.')
    }
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
                  <Link href="/admin/projects" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Projects
                  </Link>
                  <Link href="/admin/messages" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
                <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Messages List */}
                <div className="md:w-1/3">
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium text-gray-900">Messages ({messages.length})</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      {loading ? (
                        <div className="px-4 py-5 sm:px-6">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                      ) : messages.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                          {messages.map((message) => (
                            <li
                              key={message.id}
                              className={`px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-50 ${selectedMessage?.id === message.id ? 'bg-blue-50' : ''}`}
                              onClick={() => setSelectedMessage(message)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {message.name}
                                  </h4>
                                  <p className="text-sm text-gray-500 truncate">
                                    {message.subject || 'No subject'}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(message.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteMessage(message.id);
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-4 py-5 sm:px-6 text-center">
                          <p className="text-gray-500">No messages found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Detail */}
                <div className="md:w-2/3">
                  {selectedMessage ? (
                    <div className="bg-white shadow rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{selectedMessage.subject || 'No subject'}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              From {selectedMessage.name} ({selectedMessage.email})
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(selectedMessage.created_at).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedMessage(null)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="prose max-w-none">
                          <p>{selectedMessage.message}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white shadow rounded-lg h-full flex items-center justify-center">
                      <div className="text-center p-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No message selected</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Select a message from the list to view details.
                        </p>
                      </div>
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