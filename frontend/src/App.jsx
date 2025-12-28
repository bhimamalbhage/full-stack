import { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/data`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handlePing = () => {
    setLoading(true);
    fetch(`${API_URL}/api/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'Ping from frontend!' }),
    })
      .then((res) => res.json())
      .then((newData) => {
        console.log(newData);
        // Re-fetch or just update local state if needed
        alert(`Backend received: ${newData.received}`);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Full Stack React App</h1>
        <p>Frontend interacting with Node.js Backend</p>
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Backend Status</h2>
          {loading && <p className="status loading">Loading...</p>}
          {error && <p className="status error">Error: {error}</p>}
          {data && (
            <div className="data-display">
              <p><strong>Message:</strong> {data.message}</p>
              <p><strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}</p>
              <p><strong>Environment:</strong> {data.environment}</p>
            </div>
          )}
        </div>

        <div className="card action-card">
          <h2>Actions</h2>
          <button className="primary-btn" onClick={handlePing} disabled={loading}>
            Ping Backend
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
