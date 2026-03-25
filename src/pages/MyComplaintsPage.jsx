import React, { useState, useEffect } from 'react';
import { complaintAPI } from '../services/api';
import ComplaintList from '../components/ComplaintList';
import AlertMessage from '../components/AlertMessage';

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    complaintAPI
      .getMyComplaints()
      .then((res) => setComplaints(res.data?.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load complaints.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container main-content">
      <h1 className="mb-4">My Complaints</h1>
      <AlertMessage type="danger" message={error} onDismiss={() => setError('')} />
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ComplaintList complaints={complaints} basePath="/complaints" />
      )}
    </div>
  );
}
