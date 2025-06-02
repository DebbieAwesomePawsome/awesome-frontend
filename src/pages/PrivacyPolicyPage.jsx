// frontend/src/pages/PrivacyPolicyPage.jsx
import React from 'react';
// No MainLayout import here, as it will be rendered via the parent route's Outlet

export default function PrivacyPolicyPage() {
  return (
    // Page-specific content directly returned
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-8">
          Privacy Policy
        </h1>

        <div className="text-lg text-gray-700 space-y-4 leading-relaxed">
          <p>
            Your privacy is important to us at Debbie's Awesome Pawsome. This privacy policy 
            outlines the types of personal information that is received and collected and how it is used.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Information We Collect</h2>
          <p>
            When you use our "Request Booking" form or "General Enquiry" form, we collect information 
            you voluntarily provide, which may include your name, email address, phone number, pet details, 
            service interests, preferred times, and any messages or notes you add.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">How We Use Your Information</h2>
          <p>
            The information you provide is used solely for the purpose of:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Responding to your booking requests and enquiries.</li>
            <li>Scheduling and providing pet care services.</li>
            <li>Communicating with you about these services and your requests.</li>
            <li>Sending confirmation emails or updates related to your enquiries.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside 
            parties. This does not include trusted third parties who assist us in operating our website or 
            email services (like our email provider, Postmark, for notifications), so long as those 
            parties agree to keep this information confidential.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information 
            when you submit a request. However, no method of transmission over the Internet or method of 
            electronic storage is 100% secure, and we cannot guarantee its absolute security.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Your Consent</h2>
          <p>
            By using our site and submitting information through our forms, you consent to this privacy policy.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Changes to Our Privacy Policy</h2>
          <p>
            If we decide to change our privacy policy, we will post those changes on this page. This policy 
            was last updated on June 2, 2025. {/* Update date as needed */}
          </p>
          <p className="mt-6">
            If you have any questions regarding this privacy policy, you may contact us using the 
            "Inquire" form linked in our website footer.
          </p>
        </div>
      </div>
    </section>
  );
}