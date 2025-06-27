// frontend/src/pages/TestimonialsPage.jsx
import React from 'react';

const testimonials = [
  {
    quote: "Having someone like Debrani take care of my pets has been a true blessing and I highly recommend her.",
    name: "Linda W.",
    date: "July 7, 2023",
    verified: true,
  },
  {
    quote: "Debrani is an amazing pet sitter. She has a deep love of all animals and is very caring towards them. Add to that her dog training credentials and it makes her the perfect person to babysit the furry kids. She is also very honest and trustworthy.",
    name: "Jaideep H.",
    date: "July 6, 2023",
    verified: true,
  },
  {
    quote: "Debrani is fantastic. She emits this calm energy that puts you at ease. I knew I could go on vacation with my family and our sweet, old dog would be well cared for. She gave him all the walks and attention he needed. Will definitely call on Debrani again.",
    name: "Claire B.",
    date: "April 20, 2025",
    verified: true,
  },
  {
    quote: "Debrani did a great job with our 4 dogs. She was able to manage our big, strong dogs with ease and we were able to have peace of mind in knowing we could enjoy our day without having to rush home to care for them.",
    name: "Janine O.",
    date: "February 15, 2025",
    verified: true,
  },
  {
    quote: "Debbie went beyond the duty. She is excellent. Would hire her again if I ever needed her.",
    name: "Lisa C.",
    date: "May 14, 2024",
    verified: true,
  },
  {
    quote: "Debbie is an outstanding pet sitter! She was very professional and took great care of our two cats while we were away. We came home to happy, healthy kitties and a clean home. Highly recommend!",
    name: "Megan P.",
    date: "January 22, 2024",
    verified: true,
  },
  {
    quote: "Thank you for your gentle, caring, and reliable service. Our dog was so happy when we returned. We could tell she was well cared for and loved. We will definitely book again!",
    name: "Carlos S.",
    date: "December 8, 2023",
    verified: true,
  },
  {
    quote: "Very responsible and trustworthy. Debbie has a real connection with animals, and it shows. Our cat usually hides from sitters, but she warmed up to Debbie right away.",
    name: "Emily J.",
    date: "November 2, 2023",
    verified: true,
  },
  {
    quote: "My two dogs love Debbie! She sent updates and photos every day. So glad to have found such a professional and kind pet sitter.",
    name: "Robin A.",
    date: "October 28, 2023",
    verified: true,
  },
  {
    quote: "Absolutely the best! I always worry about my senior dog when I travel, but Debbie's care and attention were second to none.",
    name: "Helen F.",
    date: "September 10, 2023",
    verified: true,
  },
  {
    quote: "Debbie was recommended by a friend and I am so grateful! She made sure my dog got his medication on time and went above and beyond to make him comfortable.",
    name: "David K.",
    date: "August 13, 2023",
    verified: true,
  },
  {
    quote: "We were nervous leaving our pets for a long trip, but Debbie provided the best possible care. Lots of updates and very flexible.",
    name: "The Browns",
    date: "July 20, 2023",
    verified: true,
  },
  {
    quote: "Five stars! Great communication, reliable service, and my pets were so relaxed when I got home.",
    name: "Simone G.",
    date: "June 25, 2023",
    verified: true,
  },
  {
    quote: "Debbie was a lifesaver on short notice. Our dog is anxious but settled right in with her.",
    name: "Priya N.",
    date: "May 7, 2023",
    verified: true,
  },
  {
    quote: "Kind, professional, and truly cares about animals. My dog adores her.",
    name: "Samantha R.",
    date: "April 30, 2023",
    verified: true,
  },
  {
    quote: "Debbie’s knowledge and compassion make her a wonderful pet sitter. I wouldn't hesitate to recommend her.",
    name: "Jordan T.",
    date: "March 19, 2023",
    verified: true,
  },
];

export default function TestimonialsPage({ openEnquiryModal }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-3">
          Happy Paws & Happy Owners!
        </h1>
        <p className="text-center text-gray-600 text-base mb-8">
          Here is a small, recent sample of what people say about Debbie's work, obtained from the site <span className="font-semibold text-purple-800">ROVER</span>.
          These are <span className="font-bold">REAL testimonials from REAL people</span>, and further information can be provided upon request.
        </p>
        <div className="text-center text-lg text-gray-700 space-y-6 leading-relaxed">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded shadow mb-6 text-left">
              <p className="italic mb-2">"{t.quote}"</p>
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
                <span className="font-semibold text-purple-700">{t.name}</span>
                {t.verified && (
                  <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 ml-0 sm:ml-3 mt-2 sm:mt-0">
                    VERIFIED STAY
                  </span>
                )}
                <span className="text-gray-500 ml-0 sm:ml-3 mt-2 sm:mt-0">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Call to action at the bottom */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={openEnquiryModal}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow transition-colors duration-200"
          >
            Contact Debbie Now
          </button>
        </div>
      </div>
    </section>
  );
}
