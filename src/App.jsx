import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './context/AuthContext'
import { Navigate, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import HRDashboard from './pages/hr/HRDashboard'
import RoleRoute from './routes/RoleRoute'
import CandidateDashboard from './pages/candidate/CandidateDashboard'
import InterviewDashboard from './pages/interviewer/InterviewDashboard'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import Jobs from './pages/hr/Jobs'
import Layout from './components/Layout'
import CreateJob from './pages/hr/CreateJob'
import EditJob from './pages/hr/EditJob'
import JobDetails from './pages/candidate/JobDetails'
import CandidateJobs from './pages/candidate/Jobs'
import Applications from './pages/recruiter/Applications'
const App = () => {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/hr"
        element={
          <RoleRoute allowedRoles={["HR"]}>
            <Layout>
              <HRDashboard />
            </Layout>
          </RoleRoute>
        }
      />     <Route
        path="/recruiter"
        element={
          <RoleRoute allowedRoles={["Recruiter"]}>
            <Layout>
              <RecruiterDashboard />
            </Layout>
          </RoleRoute>
        }
      />
      <Route
        path="/interviewer"
        element={
          <RoleRoute allowedRoles={["Interviewer"]}>
            <Layout>
              <InterviewDashboard />
            </Layout>          </RoleRoute>
        }
      />

      <Route
        path="/candidate"
        element={
          <RoleRoute allowedRoles={["Candidate"]}>
            <Layout>
              <CandidateDashboard />

            </Layout>
          </RoleRoute>
        }
      />
      <Route
        path="/hr/jobs"
        element={
          <RoleRoute allowedRoles={["HR"]}>
            <Layout>
              <Jobs />
            </Layout>
          </RoleRoute>
        }
      />
      <Route
        path="/hr/jobs"
        element={
          <RoleRoute allowedRoles={["HR"]}>
            <Layout>
              <Jobs />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/hr/jobs/create"
        element={
          <RoleRoute allowedRoles={["HR"]}>
            <Layout>
              <CreateJob />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/hr/jobs/edit/:id"
        element={
          <RoleRoute allowedRoles={["HR"]}>
            <Layout>
              <EditJob />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/candidate/jobs"
        element={
          <RoleRoute allowedRoles={["Candidate"]}>
            <Layout>
              <CandidateJobs />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/candidate/jobs/:id"
        element={
          <RoleRoute allowedRoles={["Candidate"]}>
            <Layout>
              <JobDetails />
            </Layout>
          </RoleRoute>
        }
      />
      <Route
        path="/recruiter/applications"
        element={
          <RoleRoute allowedRoles={["Recruiter"]}>
            <Layout> <Applications /></Layout>
          </RoleRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>

  )
}

export default App