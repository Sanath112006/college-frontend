import React from 'react';
import { COMPLAINT_STATUS } from '../constants';

const statusConfig = {
  [COMPLAINT_STATUS.PENDING]: { variant: 'warning', label: 'Pending' },
  [COMPLAINT_STATUS.IN_PROGRESS]: { variant: 'info', label: 'Fixing' },
  [COMPLAINT_STATUS.RESOLVED]: { variant: 'success', label: 'Completed' },
};

export default function StatusIndicator({ status }) {
  const config = statusConfig[status] || { variant: 'secondary', label: status };
  return (
    <span className={`badge bg-${config.variant} status-badge`}>
      {config.label}
    </span>
  );
}
