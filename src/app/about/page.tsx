import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Accenvix Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn more about our company, mission, and values
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, Accenvix Solutions began with a simple vision: to provide exceptional technology services that empower businesses to thrive in the digital age. What started as a small team of passionate developers has grown into a full-service technology consultancy serving clients across various industries.
              </p>

              <p className="text-lg text-gray-600 mb-6">
                Our founders recognized a gap in the market for reliable, transparent, and innovative technology solutions that truly serve business objectives. Since then, we've helped hundreds of businesses transform their digital presence and operations through custom software development, cloud solutions, and strategic consulting.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to bridge the gap between business goals and technology solutions. We believe that technology should empower, not complicate. That's why we focus on creating solutions that are not only technically sound but also strategically aligned with our clients' objectives.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    We conduct business with honesty and transparency, building trust with our clients and partners.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    We strive for the highest quality in everything we do, continuously improving our skills and processes.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    We embrace new technologies and methodologies to deliver cutting-edge solutions to our clients.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Collaboration</h3>
                  <p className="text-gray-600">
                    We believe in the power of teamwork, both internally and in partnership with our clients.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
                <p className="text-gray-600 mb-6">
                  Our diverse team of experts brings together decades of experience in software development, design, and business strategy.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Alex Johnson</h3>
                      <p className="text-blue-600">CEO & Founder</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Sarah Williams</h3>
                      <p className="text-blue-600">CTO</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Michael Chen</h3>
                      <p className="text-blue-600">Lead Developer</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Info</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@accenvix.com</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Tech Street, Silicon Valley, CA 94000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}