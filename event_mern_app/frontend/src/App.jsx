import { useState, useEffect } from 'react';
import './index.css';

const API_URL = '/api/registrations';

function App() {
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    teamSize: '1'
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('Registration successful.');
        setFormData({ name: '', email: '', phone: '', college: '', teamSize: '1' });
        fetchRegistrations();
        setTimeout(() => setStatus(''), 4000);
      } else {
        setStatus('Error: Please check your details.');
      }
    } catch (err) {
      setStatus('Server connection failed.');
    }
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Event Registration</h1>
        <p>Paintball Tournament at PICT Campus</p>
        <p className="date-line">May 30, 2026 • 09:00 AM onwards</p>
      </header>

      {status && <div className="status-box">{status}</div>}

      <main className="content">
        <section className="card">
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" type="text" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>College</label>
              <input name="college" type="text" value={formData.college} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>Team Size</label>
              <select name="teamSize" value={formData.teamSize} onChange={handleInputChange}>
                <option value="1">1 Member</option>
                <option value="2">2 Members</option>
                <option value="3">3 Members</option>
                <option value="4">4 Members</option>
                <option value="5">5 Members</option>
              </select>
            </div>

            <button type="submit">Register</button>
          </form>
        </section>

        <section className="card">
          <h2>Event Details</h2>
          <ul className="details-list">
            <li>Venue: PICT Basketball Court Area</li>
            <li>Equipment will be provided</li>
            <li>Prize Pool: ₹50,000</li>
            <li>ID Proof is mandatory during check-in</li>
          </ul>
        </section>

        <section className="card full-width">
          <h2>Registered Participants</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>College</th>
                  <th>Team Size</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-row">No registrations yet.</td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg._id}>
                      <td>{reg.name}</td>
                      <td>{reg.college}</td>
                      <td>{reg.teamSize} Member{Number(reg.teamSize) > 1 ? 's' : ''}</td>
                      <td>Confirmed</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
