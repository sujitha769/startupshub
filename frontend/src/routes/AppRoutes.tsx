import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'

// Pages
import LandingPage from '../pages/LandingPage'

// Auth Pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import StaffRegisterPage from '../pages/auth/StaffRegisterPage'
import AdminSetupPage from '../pages/auth/AdminSetupPage'

import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'

// Dashboards
import UserDashboard from '../pages/dashboards/UserDashboard'
import StaffDashboard from '../pages/dashboards/StaffDashboard'
import AdminDashboard from '../pages/dashboards/AdminDashboard'

// Leads
import LeadsPage from '../pages/leads/LeadsPage'
import LeadDetailsPage from '../pages/leads/LeadDetailsPage'

// Funding
import FundingPage from '../pages/funding/FundingPage'

// Admin
import ManageStaffPage from '../pages/admin/ManageStaffPage'
import ManageHighlightsPage from '../pages/admin/ManageHighlightsPage'

import ManageSubscriptionsPage from '../pages/admin/ManageSubscriptionsPage'
import ManageInvestorsPage from '../pages/admin/ManageInvestorsPage'

// Startups
import StartupsPage from '../pages/startups/StartupsPage'
import ProfilePage from '../pages/profile/ProfilePage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Root */}
        <Route path="/" element={<LandingPage />} />

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
       
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Secret */}
        <Route path="/register/staff-s3cr3t" element={<StaffRegisterPage />} />
        <Route path="/setup/adm1n-1n1t" element={<AdminSetupPage />} />

        {/* Dashboards */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/staff"
          element={
            <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Leads (ALL ROLES) */}
        <Route
          path="/dashboard/leads"
          element={
            <ProtectedRoute allowedRoles={['USER', 'STAFF', 'ADMIN']}>
              <LeadsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute allowedRoles={['USER', 'STAFF', 'ADMIN']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/leads/:id"
          element={
            <ProtectedRoute allowedRoles={['USER', 'STAFF', 'ADMIN']}>
              <LeadDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Staff Management */}
        <Route
          path="/dashboard/admin/staff"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <ManageStaffPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Highlights Management */}
        <Route
          path="/dashboard/admin/highlights"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <ManageHighlightsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Investors Management */}
        <Route
          path="/dashboard/admin/investors"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <ManageInvestorsPage />
            </ProtectedRoute>
          }
        />

        {/* Funding (ALL ROLES) */}
        <Route
          path="/dashboard/funding"
          element={
            <ProtectedRoute allowedRoles={['USER', 'STAFF', 'ADMIN']}>
              <FundingPage />
            </ProtectedRoute>
          }
        />

        

        {/* Admin Subscriptions Management */}
        <Route
          path="/dashboard/admin/subscriptions"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <ManageSubscriptionsPage />
            </ProtectedRoute>
          }
        />

        {/* Startups (ALL ROLES) */}
        <Route
          path="/dashboard/startups"
          element={
            <ProtectedRoute allowedRoles={['USER', 'STAFF', 'ADMIN']}>
              <StartupsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes