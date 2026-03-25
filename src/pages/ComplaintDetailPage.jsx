import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintAPI } from '../services/api';
import StatusIndicator from '../components/StatusIndicator';
import AlertMessage from '../components/AlertMessage';
import { API_BASE_URL, getCategoryLabel, getLocationTypeLabel } from '../constants';

export default function ComplaintDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    complaintAPI
      .getComplaintById(id)
      .then((res) => setComplaint(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Complaint not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container main-content text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="container main-content">
        <AlertMessage type="danger" message={error || 'Complaint not found.'} />
        <button className="btn btn-outline-primary mt-2" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const fileUrl = complaint?.filePath
    ? `${API_BASE_URL}/complaints/${complaint.id}/file`
    : null;

  return (
    <div className="container main-content">
      <button className="btn btn-link text-decoration-none mb-2 p-0" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="card card-shadow">
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
            {complaint.isAnonymous && <span className="badge anonymous-badge">Anonymous</span>}
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
            <div className="mt-4 p-3 bg-light rounded">
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
    </div>
  );
}
