import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import SubmitComplaintPage from './pages/SubmitComplaintPage';
import MyComplaintsPage from './pages/MyComplaintsPage';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaintDetailPage from './pages/AdminComplaintDetailPage';

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }
  if (user) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/student'} replace />;
  }
  return children;
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Navbar />
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-complaint"
          element={
            <ProtectedRoute>
              <Navbar />
              <SubmitComplaintPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute>
              <Navbar />
              <MyComplaintsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <ComplaintDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <Navbar />
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints/:id"
          element={
            <ProtectedRoute requireAdmin>
              <Navbar />
              <AdminComplaintDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
