
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
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f9fafb' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '2rem' }}>
        Debbie's Awesome Pawsome
      </h1>
      <div>
        <p className="text-xl text-gray-600 mb-8">
          Coming soon: The friendliest pet care site on the web! 🐾
        </p>
        <div className="text-sm text-gray-500">
          Professional pet sitting, dog walking, and grooming services
        </div>
      </div>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Services</h2>
        {loading ? (
          <p>Loading services...</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {services.map(service => (
              <div key={service.id} style={{ background: '#fff', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 0 4px #ddd' }}>
                <h3 style={{ fontWeight: 'bold' }}>{service.name}</h3>
                <p style={{ color: '#16a34a', fontWeight: 'bold' }}>{service.price}</p>
                <p style={{ color: '#555' }}>{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
