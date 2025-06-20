import React from 'react';

export default function Board() {
  // Dummy data for Top Freelancers section
  const topFreelancers = [
    { id: 1, name: 'Kate Adie', role: 'UI/UX Designer', avatar: 'https://avatar.iran.liara.run/public/1' },
    { id: 2, name: 'John Lennon', role: 'Senior Art Director', avatar: 'https://avatar.iran.liara.run/public/2' },
    { id: 3, name: 'Nadine Coyle', role: 'Photographer', avatar: 'https://avatar.iran.liara.run/public/3' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 py-16 lg:py-24 px-4 sm:px-6 lg:px-8 rounded-b-[50px] shadow-lg">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-48 h-48 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-10 right-4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            The #1 Job Board for <span className="text-purple-700">Graphic Design</span> Jobs
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Search and connect with the right candidates faster. This talent search gives you the opportunity to find candidates who may be a perfect fit for your role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
              Post a job now
            </button>
            <a
              href="#"
              className="text-green-600 hover:text-green-800 font-semibold py-3 px-4 transition duration-300 flex items-center justify-center"
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src="https://placehold.co/600x400/E0F2F7/2C3E50?text=Job+Portal+Illustration" // Placeholder image
            alt="People working collaboratively on a job portal"
            className="w-full max-w-md lg:max-w-none h-auto rounded-xl shadow-xl"
          />
        </div>
      </div>

      {/* Top Freelancers Section - positioned below the main hero content */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-6 rounded-xl shadow-xl max-w-sm lg:max-w-md w-[calc(100%-2rem)] mx-auto flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Top Freelancers</h3>
        <div className="w-full space-y-3">
          {topFreelancers.map((freelancer) => (
            <div key={freelancer.id} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{freelancer.name}</p>
                <p className="text-sm text-gray-500">{freelancer.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}