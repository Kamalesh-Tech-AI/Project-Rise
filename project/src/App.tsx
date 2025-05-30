import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import AdminLayout from './pages/AdminLayout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import ProjectDetails from './components/projects/ProjectDetails';
import ProjectUploadForm from './components/projects/ProjectUploadForm';
import AdminDashboard from './pages/AdminDashboard';
import ProjectInbox from './components/admin/ProjectInbox';
import DeveloperManagement from './components/admin/DeveloperManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Site Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="upload" element={<ProjectUploadForm />} />
        </Route>
        
        {/* Admin Site Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectInbox />} />
          <Route path="developers" element={<DeveloperManagement />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </Router>
  );
}

export default App;