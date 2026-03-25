import React, { useState } from 'react';
import { COMPLAINT_CATEGORIES, LOCATION_TYPES } from '../constants';

export default function ComplaintForm({ onSubmit, loading = false, initialData }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || COMPLAINT_CATEGORIES[0].value,
    description: initialData?.description || '',
    locationType: initialData?.locationType || LOCATION_TYPES[0].value,
    blockName: initialData?.blockName || '',
    roomNumber: initialData?.roomNumber || '',
    isAnonymous: initialData?.isAnonymous || false,
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const selected = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFile(selected);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please enter a title.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please enter a description.');
      return;
    }
    if (formData.description.trim().length < 10) {
      setError('Description must be at least 10 characters.');
      return;
    }
    if (!formData.blockName.trim()) {
      setError('Please enter Block name.');
      return;
    }
    onSubmit({ ...formData, file });
  };

  return (
    <form onSubmit={handleSubmit} className="card card-shadow p-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title *</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Brief title for your complaint"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          className="form-select"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {COMPLAINT_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="locationType" className="form-label">Class / Lab / Seminar Hall *</label>
        <select
          className="form-select"
          id="locationType"
          name="locationType"
          value={formData.locationType}
          onChange={handleChange}
        >
          {LOCATION_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="blockName" className="form-label">Block name *</label>
        <input
          type="text"
          className="form-control"
          id="blockName"
          name="blockName"
          value={formData.blockName}
          onChange={handleChange}
          placeholder="e.g. A Block, Main Block"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="roomNumber" className="form-label">Room number</label>
        <input
          type="text"
          className="form-control"
          id="roomNumber"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="e.g. 101, Lab-2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="file" className="form-label">
          Attachment (optional, JPG / PNG / PDF, max 5 MB)
        </label>
        <input
          type="file"
          className="form-control"
          id="file"
          name="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description *</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your complaint in detail"
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isAnonymous"
          name="isAnonymous"
          checked={formData.isAnonymous}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="isAnonymous">
          Submit as anonymous complaint
        </label>
      </div>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Complaint'}
      </button>
    </form>
  );
}
