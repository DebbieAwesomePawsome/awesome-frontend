// frontend/src/pages/TestimonialsPage.jsx
import React from 'react';
// Removed: import MainLayout from '../layouts/MainLayout.jsx'; 

export default function TestimonialsPage() {
  return (
    // No <MainLayout> wrapper here
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-8">
          Happy Paws & Happy Owners!
        </h1>
        <div className="text-center text-lg text-gray-700 space-y-6 leading-relaxed">
          {/* ... your placeholder testimonial content ... */}
          <p>
            We love hearing about the great experiences our furry clients and their humans have with Debbie's Awesome Pawsome care! 
          </p>
          <p className="font-semibold text-indigo-600">
            More testimonials from happy clients will be shared here soon.
          </p>
          {/* ... etc. ... */}
        </div>
      </div>
    </section>
    // No </MainLayout> wrapper here
  );
}