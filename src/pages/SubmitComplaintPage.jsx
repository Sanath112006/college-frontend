import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintAPI } from '../services/api';
import ComplaintForm from '../components/ComplaintForm';
import AlertMessage from '../components/AlertMessage';

export default function SubmitComplaintPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await complaintAPI.submit(formData);
      setSuccess('Complaint submitted successfully.');
      setTimeout(() => navigate('/my-complaints'), 1500);
    } catch (err) {
      const res = err.response?.data;
      let message = res?.message || 'Failed to submit complaint. Please try again.';
      if (res?.data && typeof res.data === 'object' && message === 'Validation failed') {
        const parts = Object.entries(res.data).map(([field, msg]) => `${field}: ${msg}`);
        message = parts.length ? parts.join('. ') : message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container main-content">
      <h1 className="mb-4">Submit Complaint</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <AlertMessage type="success" message={success} />
          <AlertMessage type="danger" message={error} onDismiss={() => setError('')} />
          <ComplaintForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}
