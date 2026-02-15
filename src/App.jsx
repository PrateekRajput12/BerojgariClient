import React from "react";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { Navigate, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import HRDashboard from "./pages/hr/HRDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import InterviewDashboard from "./pages/interviewer/InterviewDashboard";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";

import Jobs from "./pages/hr/Jobs";
import CreateJob from "./pages/hr/CreateJob";
import EditJob from "./pages/hr/EditJob";

import CandidateJobs from "./pages/candidate/Jobs";
import JobDetails from "./pages/candidate/JobDetails";

import Applications from "./pages/recruiter/Applications";
import MyInterviews from "./pages/interviewer/MyInterviews";

import Offers from "./pages/hr/Offers";
import CandidateOffer from "./pages/candidate/CandidateOffer";

import Layout from "./components/Layout";
import RoleRoute from "./routes/RoleRoute";

const App = () => {
  const { loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* HR Routes */}
      <Route
        path="/hr"
        element={
          <RoleRoute allowedRoles={["HR"]}>
            <Layout>
              <HRDashboard />
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
        path="/hr/offers"
        element={
          <RoleRoute allowedRoles={["HR"]}>
            <Layout>
              <Offers />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Recruiter Routes */}
      <Route
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
        path="/recruiter/applications"
        element={
          <RoleRoute allowedRoles={["Recruiter"]}>
            <Layout>
              <Applications />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Interviewer Routes */}
      <Route
        path="/interviewer"
        element={
          <RoleRoute allowedRoles={["Interviewer"]}>
            <Layout>
              <InterviewDashboard />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/interviewer/my-interviews"
        element={
          <RoleRoute allowedRoles={["Interviewer"]}>
            <Layout>
              <MyInterviews />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Candidate Routes */}
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
        path="/candidate/offers"
        element={
          <RoleRoute allowedRoles={["Candidate"]}>
            <Layout>
              <CandidateOffer />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
};

export default App;
