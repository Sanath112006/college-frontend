import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusIndicator from './StatusIndicator';
import { API_BASE_URL, getCategoryLabel, COMPLAINT_STATUS } from '../constants';

const STATUS_ACTION_OPTIONS = [
  { value: COMPLAINT_STATUS.PENDING, label: 'Pending' },
  { value: COMPLAINT_STATUS.IN_PROGRESS, label: 'Fixing' },
  { value: COMPLAINT_STATUS.RESOLVED, label: 'Completed' },
];

export default function ComplaintList({ complaints, showUser = false, basePath = '/complaints', showActionColumn = false, onStatusChange, onRefresh }) {
  const [updatingId, setUpdatingId] = useState(null);

  const handleActionChange = async (complaintId, newStatus) => {
    if (!onStatusChange) return;
    setUpdatingId(complaintId);
    try {
      await onStatusChange(complaintId, newStatus);
      onRefresh?.();
    } finally {
      setUpdatingId(null);
    }
  };

  if (!complaints || complaints.length === 0) {
    return (
      <div className="alert alert-info">
        No complaints found.
      </div>
    );
  }

  if (showActionColumn) {
    return (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Block / Room</th>
              <th>Status</th>
              {showUser && <th>Submitted by</th>}
              <th>Date</th>
              <th>Attachment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>
                  <Link to={`${basePath}/${complaint.id}`} className="text-decoration-none fw-medium">
                    {complaint.title}
                  </Link>
                </td>
                <td><span className="badge bg-secondary">{getCategoryLabel(complaint.category)}</span></td>
                <td>
                  {complaint.blockName}
                  {complaint.roomNumber && <span className="text-muted"> / {complaint.roomNumber}</span>}
                </td>
                <td><StatusIndicator status={complaint.status} /></td>
                {showUser && (
                  <td className="small">
                    {complaint.isAnonymous ? 'Anonymous' : (complaint.userName || complaint.user?.name || complaint.user?.email || '—')}
                  </td>
                )}
                <td className="small text-muted">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                <td>
                  {complaint.filePath ? (
                    <>
                      <a
                        href={`${API_BASE_URL}/complaints/${complaint.id}/file`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        View
                      </a>
                      {(complaint.filePath.toLowerCase().endsWith('.jpg') ||
                        complaint.filePath.toLowerCase().endsWith('.jpeg') ||
                        complaint.filePath.toLowerCase().endsWith('.png')) && (
                        <div className="mt-1">
                          <img
                            src={`${API_BASE_URL}/complaints/${complaint.id}/file`}
                            alt="Attachment"
                            style={{ maxHeight: '50px', maxWidth: '80px' }}
                            className="border rounded"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-muted small">—</span>
                  )}
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={complaint.status}
                    onChange={(e) => handleActionChange(complaint.id, e.target.value)}
                    disabled={updatingId === complaint.id}
                  >
                    {STATUS_ACTION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="list-group">
      {complaints.map((complaint) => (
        <Link
          key={complaint.id}
          to={`${basePath}/${complaint.id}`}
          className="list-group-item list-group-item-action card-shadow mb-2 rounded"
        >
          <div className="d-flex w-100 justify-content-between align-items-start">
            <div className="flex-grow-1">
              <h6 className="mb-1">{complaint.title}</h6>
              <p className="mb-1 text-muted small text-truncate" style={{ maxWidth: '100%' }}>
                {complaint.description}
              </p>
              <div className="d-flex gap-2 flex-wrap align-items-center mt-2">
                <span className="badge bg-secondary">{getCategoryLabel(complaint.category)}</span>
                {complaint.roomNumber && <span className="badge bg-info">{complaint.roomNumber}</span>}
                <StatusIndicator status={complaint.status} />
                {complaint.isAnonymous && (
                  <span className="badge anonymous-badge">Anonymous</span>
                )}
                {showUser && complaint.user && !complaint.isAnonymous && (
                  <span className="text-muted small">
                    by {complaint.user.name || complaint.user.email}
                  </span>
                )}
              </div>
            </div>
            <small className="text-muted ms-2">
              {new Date(complaint.createdAt).toLocaleDateString()}
            </small>
          </div>
        </Link>
      ))}
    </div>
  );
}
