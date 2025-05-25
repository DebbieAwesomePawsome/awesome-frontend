
import { useState, useEffect } from 'react';

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data.services);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

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
