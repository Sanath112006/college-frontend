import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { API_BASE_URL, COMPLAINT_STATUS, getCategoryLabel, getLocationTypeLabel, normalizeComplaintStatus } from '../constants';
import StatusIndicator from '../components/StatusIndicator';
import AlertMessage from '../components/AlertMessage';

export default function AdminComplaintDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [responseText, setResponseText] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadComplaint = () => {
    adminAPI
      .getComplaintById(id)
      .then((res) => {
        const complaintData = res.data?.data ?? res.data;
        setComplaint(complaintData);
        setNewStatus(normalizeComplaintStatus(complaintData?.status));
      })
      .catch((err) => setError(err.response?.data?.message || 'Complaint not found.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadComplaint();
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    const currentStatusNormalized = normalizeComplaintStatus(complaint?.status);
    if (!newStatus || newStatus === currentStatusNormalized) return;
    setUpdating(true);
    setError('');
    setSuccess('');
    try {
      await adminAPI.updateStatus(id, newStatus);
      setSuccess('Status updated successfully.');
      setComplaint((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!responseText.trim()) return;
    setUpdating(true);
    setError('');
    setSuccess('');
    try {
      await adminAPI.respondToComplaint(id, responseText.trim());
      setSuccess('Response submitted successfully.');
      setResponseText('');
      loadComplaint();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit response.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container main-content text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error && !complaint) {
    return (
      <div className="container main-content">
        <AlertMessage type="danger" message={error} />
        <button className="btn btn-outline-primary mt-2" onClick={() => navigate('/admin')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const fileUrl = complaint?.filePath
    ? `${API_BASE_URL}/complaints/${complaint.id}/file`
    : null;

  return (
    <div className="container main-content">
      <button
        className="btn btn-link text-decoration-none mb-2 p-0"
        onClick={() => navigate('/admin')}
      >
        ← Back to Dashboard
      </button>
      <AlertMessage type="success" message={success} onDismiss={() => setSuccess('')} />
      <AlertMessage type="danger" message={error} onDismiss={() => setError('')} />

      <div className="card card-shadow mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <h2 className="card-title mb-0">{complaint.title}</h2>
            <StatusIndicator status={complaint.status} />
          </div>
          <div className="d-flex gap-2 flex-wrap mb-3">
            <span className="badge bg-secondary">{getCategoryLabel(complaint.category)}</span>
            {complaint.locationType && (
              <span className="badge bg-info">{getLocationTypeLabel(complaint.locationType)}</span>
            )}
            {complaint.blockName && (
              <span className="badge bg-dark">{complaint.blockName}</span>
            )}
            {complaint.roomNumber && (
              <span className="badge bg-secondary">Room {complaint.roomNumber}</span>
            )}
            {complaint.isAnonymous ? (
              <span className="badge anonymous-badge">Anonymous</span>
            ) : (
              complaint.userName && (
                <span className="text-muted">by {complaint.userName}</span>
              )
            )}
            <span className="text-muted small">
              {new Date(complaint.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="card-text">{complaint.description}</p>
          {fileUrl && (
            <div className="mt-3">
              <h6 className="mb-2">Attachment</h6>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary btn-sm me-2"
              >
                View / Download Attachment
              </a>
              {(complaint.filePath.toLowerCase().endsWith('.jpg') ||
                complaint.filePath.toLowerCase().endsWith('.jpeg') ||
                complaint.filePath.toLowerCase().endsWith('.png')) && (
                <div className="mt-2">
                  <img
                    src={fileUrl}
                    alt="Complaint attachment"
                    className="img-fluid rounded border"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              )}
            </div>
          )}
          {complaint.adminResponse && (
            <div className="mt-3 p-3 bg-light rounded">
              <h6 className="text-primary">Admin Response</h6>
              <p className="mb-0">{complaint.adminResponse}</p>
              {complaint.respondedAt && (
                <small className="text-muted">
                  {new Date(complaint.respondedAt).toLocaleString()}
                </small>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card card-shadow">
            <div className="card-body">
              <h5 className="card-title">Update Status</h5>
              <form onSubmit={handleUpdateStatus}>
                <select
                  className="form-select mb-2"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value={COMPLAINT_STATUS.PENDING}>Pending</option>
                  <option value={COMPLAINT_STATUS.IN_PROGRESS}>Fixing</option>
                  <option value={COMPLAINT_STATUS.RESOLVED}>Completed</option>
                  <option value={COMPLAINT_STATUS.REJECTED}>Rejected</option>
                </select>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={updating || newStatus === normalizeComplaintStatus(complaint.status)}
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-shadow">
            <div className="card-body">
              <h5 className="card-title">Respond to Complaint</h5>
              <form onSubmit={handleRespond}>
                <textarea
                  className="form-control mb-2"
                  rows="3"
                  placeholder="Type your response..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm" disabled={updating}>
                  {updating ? 'Submitting...' : 'Submit Response'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
