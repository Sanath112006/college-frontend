import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user, isAdmin } = useAuth();

  if (user) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Welcome back, {user.name || user.email}</h1>
          <div>
            {isAdmin() ? (
              <Link to="/admin" className="btn btn-primary">
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link to="/student" className="btn btn-primary">
                Go to Student Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-shield-check me-2"></i>
            Digital Complaint Portal
          </Link>
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-light">Login</Link>
            <Link to="/register" className="btn btn-light fw-semibold text-primary">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow-1 d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
              <h1 className="display-4 fw-bold text-dark mb-4">
                Voice Your Concerns, <br />
                <span className="text-primary">We Are Listening</span>
              </h1>
              <p className="lead text-secondary mb-5">
                The Digital Complaint Portal provides a secure, transparent, and seamless platform 
                to submit, track, and resolve your complaints efficiently. Join our community and 
                help us improve together.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/register" className="btn btn-primary btn-lg px-4 shadow-sm">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-secondary btn-lg px-4 bg-white">
                  Track Complaint
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: '60px', height: '60px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                        <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532z"/>
                        <path d="M15.811 3.312c-.086.062-.327.245-.56.464l-.99.98c-.22.218-.403.456-.464.55-.07.11-.122.253-.162.404-.04.149-.071.303-.095.462a6.3 6.3 0 0 0-.012.33 3.4 3.4 0 0 1-.65 2.158A5.9 5.9 0 0 1 11.2 9.878v.528a4.9 4.9 0 0 0 1.293 3.321l.365.364c.22.219.462.417.725.592a2.3 2.3 0 0 1-1.01.551 2.4 2.4 0 0 1-1.226-.06l-1.042-.348a2 2 0 0 1-1.127-1.077l-.608-1.458-.888-.889a7.6 7.6 0 0 1-1.332-1.954l-1.954-1.332-.89-.888-1.458-.608a2 2 0 0 1-1.076-1.127L.178 4.414a2.4 2.4 0 0 1 .491-2.235A2.3 2.3 0 0 1 1.22 1.17l.592.725c.175.263.373.504.593.725l.364.364a4.9 4.9 0 0 0 3.322 1.293h.528a5.9 5.9 0 0 1 1.21-1.674 3.4 3.4 0 0 1 2.157-.65 6.3 6.3 0 0 0 .33-.012c.159-.024.313-.055.462-.095.15-.04.294-.092.405-.162.093-.061.331-.244.549-.464l.981-.99c.218-.232.4-.473.463-.56.095-.13.203-.234.306-.307.037-.026.082-.056.126-.08.064-.035.127-.066.19-.089l.067-.022A1.8 1.8 0 0 1 15 1c.54 0 1 .458 1 1.026v.053c0 .178-.02.348-.063.507-.023.084-.055.163-.09.239l-.08.126a3 3 0 0 1-.308.307zM3.461 7.248c-.628.73-1.464 1.34-2.42 1.706a1.9 1.9 0 0 0-.256.124l.583 1.401c.148.354.436.643.791.791l1.402.583a1.9 1.9 0 0 0 .123-.256c.366-.956.976-1.792 1.706-2.42z"/>
                      </svg>
                    </div>
                    <h5 className="fw-bold">Fast Resolution</h5>
                    <p className="text-muted small mb-0">Direct channel to designated authorities for swift action.</p>
                  </div>
                </div>
                <div className="col-sm-6 mt-lg-5">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: '60px', height: '60px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7.2 7.2 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.2 7.2 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415"/>
                      </svg>
                    </div>
                    <h5 className="fw-bold">Secure</h5>
                    <p className="text-muted small mb-0">Your data and identity remain completely confidential.</p>
                  </div>
                </div>
                <div className="col-sm-6 mt-sm-n4 mt-lg-0">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                    <div className="bg-info bg-opacity-10 text-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: '60px', height: '60px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                    </div>
                    <h5 className="fw-bold">Real-time Tracking</h5>
                    <p className="text-muted small mb-0">Follow the status of your complaints with live updates.</p>
                  </div>
                </div>
                <div className="col-sm-6 mt-lg-5">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                    <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: '60px', height: '60px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                      </svg>
                    </div>
                    <h5 className="fw-bold">Community Focus</h5>
                    <p className="text-muted small mb-0">Empowering student voices for a better campus lifecycle.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-4 mt-auto border-top">
        <div className="container text-center">
          <p className="text-muted mb-0 small">
            &copy; {new Date().getFullYear()} Digital Complaint Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
