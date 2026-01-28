'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {service.icon_url ? (
                        <img
                          src={service.icon_url}
                          alt={service.title}
                          className="h-12 w-12 text-blue-500"
                        />
                      ) : (
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      )}
                      <h3 className="ml-4 text-xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600">
                      {service.description || 'No description available for this service.'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-500">We're working on adding our service offerings. Please check back soon!</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Solutions</h2>
            <p className="text-lg text-gray-600 mb-6">
              Don't see exactly what you need? We specialize in creating custom technology solutions tailored to your specific business requirements. Our team works closely with you to understand your challenges and develop innovative solutions that drive results.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Request Custom Solution
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}