import React from 'react';

export default function AlertMessage({ type = 'info', message, onDismiss }) {
  if (!message) return null;
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      {onDismiss && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onDismiss}
        />
      )}
    </div>
  );
}
