import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { COMPLAINT_STATUS, COMPLAINT_CATEGORIES } from '../constants';
import ComplaintList from '../components/ComplaintList';
import AlertMessage from '../components/AlertMessage';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
  });

  const fetchComplaints = () => {
    setLoading(true);
    const params = { page: 0, size: 500 };
    if (filters.category) params.category = filters.category;
    if (filters.status) params.status = filters.status;
    adminAPI
      .getAllComplaints(params)
      .then((res) => {
        const data = res.data?.data ?? res.data;
        const list = data?.content ?? (Array.isArray(data) ? data : data?.complaints ?? []);
        setComplaints(list);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load complaints.'))
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (complaintId, status) => {
    await adminAPI.updateStatus(complaintId, status);
  };

  useEffect(() => {
    fetchComplaints();
  }, [filters.category, filters.status]);

  return (
    <div className="container main-content">
      <h1 className="mb-4">Admin Dashboard</h1>
      <AlertMessage type="danger" message={error} onDismiss={() => setError('')} />
      <div className="card card-shadow mb-4">
        <div className="card-body">
          <h6 className="card-title">Filters</h6>
          <div className="row g-2">
            <div className="col-md-4">
              <label className="form-label small">Category</label>
              <select
                className="form-select form-select-sm"
                value={filters.category}
                onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
              >
                <option value="">All</option>
                {COMPLAINT_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
              >
                <option value="">All</option>
                <option value={COMPLAINT_STATUS.PENDING}>Pending</option>
                <option value={COMPLAINT_STATUS.IN_PROGRESS}>Fixing</option>
                <option value={COMPLAINT_STATUS.RESOLVED}>Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mb-3">All Complaints Received from Students</h5>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <ComplaintList
          complaints={complaints}
          showUser
          basePath="/admin/complaints"
          showActionColumn
          onStatusChange={handleStatusChange}
          onRefresh={fetchComplaints}
        />
      )}
    </div>
  );
}
