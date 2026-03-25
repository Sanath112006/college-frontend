import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      const auth = data.data || data;
      const userData = { id: auth.userId, name: auth.name, email: auth.email, role: auth.role };
      login(userData, auth.token);
      navigate(isAdmin() ? '/admin' : '/', { replace: true });
    } catch (err) {
      const res = err.response?.data;
      let message = res?.message || res?.error;
      if (Array.isArray(res?.errors)) {
        message = res.errors.map((e) => e.msg || e.message || e).join('. ');
      }
      if (!message) {
        if (err.code === 'ERR_NETWORK' || !err.response) {
          message = 'Cannot reach the server. Check that the backend is running and the API URL is correct.';
        } else {
          message = `Registration failed (${err.response?.status || 'error'}). Please try again.`;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Register</h2>
              <AlertMessage type="danger" message={error} onDismiss={() => setError('')} />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Register as</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="roleStudent"
                        name="role"
                        value="STUDENT"
                        checked={formData.role === 'STUDENT'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="roleStudent">Student</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="roleAdmin"
                        name="role"
                        value="ADMIN"
                        checked={formData.role === 'ADMIN'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="roleAdmin">Admin</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
              <p className="text-center mt-3 mb-0">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
