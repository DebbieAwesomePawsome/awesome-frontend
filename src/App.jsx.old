import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
// Import your animations
import dogAnimation from './assets/animations/happydog.json'; // Make sure these paths are correct
import catAnimation from './assets/animations/happycat.json'; // Make sure these paths are correct

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Global animation states (keep your existing animation logic)
  const [isDogActive, setIsDogActive] = useState(false);
  const [isCatActive, setIsCatActive] = useState(false);

  const triggerPetExcitement = () => {
    setIsDogActive(true);
    setIsCatActive(true);
    setTimeout(() => {
      setIsDogActive(false);
      setIsCatActive(false);
    }, 2000);
  };

  const triggerDogOnly = () => {
    setIsDogActive(true);
    setTimeout(() => setIsDogActive(false), 1500);
  };

  const triggerCatOnly = () => {
    setIsCatActive(true);
    setTimeout(() => setIsCatActive(false), 1500);
  };

  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // When deployed, API calls will be relative to the current domain (e.g., /api/services)
    // When local, it will use the full URL to your local backend server
    const effectiveApiURL = isLocal
      ? 'http://localhost:4000/api/services' // For local development
      : '/api/services';                     // For production on debspawsome.com (relative path)

    console.log(`Fetching services from: ${effectiveApiURL}`); // Typo fixed
    setLoading(true);
    fetch(effectiveApiURL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} while fetching from ${effectiveApiURL}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && data.services && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          console.error('Fetched data does not contain a valid services array:', data);
          setServices([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setServices([]);
        setLoading(false);
      });
    // With this setup, the 'else' block for static data fallback is no longer strictly needed
    // because 'effectiveApiURL' will always be truthy. Error handling in fetch deals with failures.
    // If you still want a hardcoded fallback for a catastrophic API failure on production,
    // you could add it within the .catch() block.
  }, []);

  // Your existing return JSX with Tailwind classes and Lottie animations
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="w-full bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left: Brand */}
          <div className="flex-1">
            <h1
              className="text-2xl md:text-3xl font-bold text-purple-800 tracking-wide cursor-pointer hover:text-purple-600 transition-colors"
              onMouseEnter={triggerPetExcitement}
            >
              Debbie's Awesome Pawsome
            </h1>
            <p className="text-sm text-gray-600 hidden sm:block">
              Professional Pet Care Services
            </p>
          </div>

          {/* Right: Interactive Mascots */}
          <div className="flex items-center space-x-2">
            {/* Dog */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onMouseEnter={triggerDogOnly}
            >
              <Lottie
                animationData={dogAnimation}
                loop={true}
                autoplay={true} // Keeping this true as per your last version
                className="w-full h-full"
              />
            </div>

            {/* Cat */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onMouseEnter={triggerCatOnly}
            >
              <Lottie
                animationData={catAnimation}
                loop={true}
                autoplay={true} // Keeping this true as per your last version
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Interactive Services */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 cursor-pointer hover:text-purple-600 transition-colors"
            onMouseEnter={triggerPetExcitement}
          >
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
          services.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 hover:border-pink-500"
                  onMouseEnter={() => {
                    if (index % 2 === 0) triggerDogOnly();
                    else triggerCatOnly();
                  }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-3">{service.price}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-semibold hover:scale-105 transform"
                    onMouseEnter={triggerPetExcitement}
                    onClick={triggerPetExcitement}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No services to display at the moment. Please try again later.</p> // Added a fallback message
          )
        )}
      </main>
    </div>
  );
}

export default App;
