# Digital Complaint Portal - Frontend

A React.js frontend for the Digital Complaint Portal for Colleges. Students can register, login, submit complaints (including anonymous), view and track their complaints. Admins can view all complaints, filter by category/status, respond to complaints, and update status (Pending, In Progress, Resolved).

## Tech Stack

- **React 18** with hooks
- **React Router v6** for navigation
- **Axios** for API communication
- **Bootstrap 5** for styling

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure the backend API URL (optional). By default the app uses Vite proxy to `/api` (see `vite.config.js`). Create a `.env` file to override:
   ```
   VITE_API_URL=https://college-backend-yv77.onrender.com
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Backend API Expectations

The frontend expects the following endpoints (base path `/api` or `VITE_API_URL`):

### Auth
- `POST /auth/register` - body: `{ name, email, password, role }` → `{ user, token }`
- `POST /auth/login` - body: `{ email, password }` → `{ user, token }`
- `GET /auth/profile` - headers: `Authorization: Bearer <token>` → user object

### Student
- `POST /complaints` - body: `{ title, category, description, isAnonymous }` → created complaint
- `GET /complaints/my` → array of user's complaints
- `GET /complaints/:id` → single complaint

### Admin
- `GET /admin/complaints` - query: `?category=&status=` → array of complaints (or `{ complaints: [] }`)
- `GET /admin/complaints/:id` → single complaint
- `PATCH /admin/complaints/:id/status` - body: `{ status }` → updated complaint
- `POST /admin/complaints/:id/respond` - body: `{ response }` → updated complaint

User object should include: `id`, `email`, `name`, `role` (e.g. `STUDENT`, `ADMIN`).  
Complaint object: `id`, `title`, `category`, `description`, `status`, `isAnonymous`, `createdAt`, `user` (optional), `adminResponse`, `respondedAt` (optional).

## Pages

- **Login** – Student/Admin login
- **Register** – New student registration
- **Student Dashboard** – Links to submit complaint and my complaints
- **Submit Complaint** – Complaint form with optional anonymous
- **My Complaints** – List and track status of own complaints
- **Complaint Detail** (student) – View one complaint and admin response
- **Admin Dashboard** – All complaints with category/status filters
- **Complaint Detail** (admin) – View complaint, update status, respond

## Project Structure

```
src/
  components/     Navbar, ComplaintForm, ComplaintList, StatusIndicator, AlertMessage, ProtectedRoute
  context/        AuthContext
  pages/          Login, Register, Student Dashboard, Submit Complaint, My Complaints,
                  Complaint Detail, Admin Dashboard, Admin Complaint Detail
  services/       api.js (Axios instance + auth, complaint, admin APIs)
  constants.js    Status enum, categories, roles
  App.jsx         Routes and layout
  main.jsx        Entry with BrowserRouter and AuthProvider
```
