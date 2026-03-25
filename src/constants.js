// API base URL - use proxy in dev or set your backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const COMPLAINT_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
};

// Must match backend ComplaintCategory enum (value sent to API)
export const COMPLAINT_CATEGORIES = [
  { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'HOSTEL', label: 'Hostel' },
  { value: 'ADMINISTRATION', label: 'Administration' },
];

// Must match backend LocationType enum
export const LOCATION_TYPES = [
  { value: 'CLASS', label: 'Class' },
  { value: 'LAB', label: 'Lab' },
  { value: 'SEMINAR_HALL', label: 'Seminar Hall' },
];

export function getCategoryLabel(value) {
  const found = COMPLAINT_CATEGORIES.find((c) => c.value === value);
  return found ? found.label : value;
}

export function getLocationTypeLabel(value) {
  const found = LOCATION_TYPES.find((c) => c.value === value);
  return found ? found.label : value;
}

export const USER_ROLES = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
};
