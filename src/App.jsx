
import { useState, useEffect } from 'react';

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const localApiURL = 'http://localhost:4000/api/services'; // Define local API URL

    // In a future step, you would replace 'null' with your deployed backend URL
    const deployedApiURL = null; // e.g., 'https://your-awesomepawsome-backend.com/api/services'

    const effectiveApiURL = isLocal ? localApiURL : deployedApiURL;

    if (effectiveApiURL) {
      console.log(`Workspaceing services from: ${effectiveApiURL}`);
      setLoading(true); // Set loading true before fetch
      fetch(effectiveApiURL)
        .then(res => {
          if (!res.ok) {
            // If response not OK, throw an error to be caught by .catch()
            throw new Error(`HTTP error! status: ${res.status} while fetching from ${effectiveApiURL}`);
          }
          return res.json();
        })
        .then(data => {
          if (data && data.services && Array.isArray(data.services)) {
            setServices(data.services);
          } else {
            // Handle cases where data.services might be missing or not an array
            console.error('Fetched data does not contain a valid services array:', data);
            setServices([]); // Set to empty array or handle as an error state
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching services:', err);
          setServices([]); // Clear services or set an error state
          setLoading(false);
        });
    } else {
      // Fallback for non-local environments if deployedApiURL is not yet set
      console.log("Using fallback static data (not local and no deployed API URL set).");
      setLoading(true); // Set loading true
      // Simulate a small delay for fallback data like a fetch would have
      setTimeout(() => {
        setServices([
          { id: 1, name: 'Dog Walking (Sample)', price: '$25/hour', description: 'Daily walks for your furry friend' },
          { id: 2, name: 'Pet Sitting (Sample)', price: '$40/day', description: "In-home care while you're away" },
          { id: 3, name: 'Pet Grooming (Sample)', price: '$60/session', description: 'Professional grooming services' }
        ]);
        setLoading(false);
      }, 500); // 500ms delay
    }
  }, []); // Empty dependency array ensures this runs once on component mount

 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header with Logo and Animated Mascots */}
      <header className="w-full bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left: Brand */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800 tracking-wide">
              Debbie's Awesome Pawsome
            </h1>
            <p className="text-sm text-gray-600 hidden sm:block">
              Professional Pet Care Services
            </p>
          </div>
          
          {/* Right: Animated Mascots */}
          <div className="w-24 h-24 md:w-32 md:h-32 relative">
            {/* Placeholder for now - we'll add Lottie animation here */}
            <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center text-2xl animate-pulse">
              🐕🐱
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional, loving care for your furry family members
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-lg text-gray-600">Loading services...</span>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-3">{service.price}</p>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
