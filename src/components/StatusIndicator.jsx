import React from 'react';
import { COMPLAINT_STATUS, normalizeComplaintStatus } from '../constants';

const statusConfig = {
  [COMPLAINT_STATUS.PENDING]: { variant: 'warning', label: 'Pending' },
  [COMPLAINT_STATUS.IN_PROGRESS]: { variant: 'info', label: 'Fixing' },
  [COMPLAINT_STATUS.RESOLVED]: { variant: 'success', label: 'Completed' },
  [COMPLAINT_STATUS.REJECTED]: { variant: 'danger', label: 'Rejected' },
};

export default function StatusIndicator({ status }) {
  const normalized = normalizeComplaintStatus(status);
  const config = statusConfig[normalized] || { variant: 'secondary', label: normalized ?? status };
  return (
    <span className={`badge bg-${config.variant} status-badge`}>
      {config.label}
    </span>
  );
}
