import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  return (
    <div className="container main-content">
      <h1 className="mb-4">Student Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card card-shadow h-100">
            <div className="card-body">
              <h5 className="card-title">Submit a Complaint</h5>
              <p className="card-text">Submit a new complaint or an anonymous complaint.</p>
              <Link to="/submit-complaint" className="btn btn-primary">
                Submit Complaint
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-shadow h-100">
            <div className="card-body">
              <h5 className="card-title">My Complaints</h5>
              <p className="card-text">View and track the status of your complaints.</p>
              <Link to="/my-complaints" className="btn btn-outline-primary">
                View My Complaints
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
