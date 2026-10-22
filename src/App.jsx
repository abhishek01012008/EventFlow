import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';

import StudentDashboard from './pages/StudentDashboard';
import BrowseEvents from './pages/BrowseEvents';
import EventDetails from './pages/EventDetails';
import MyRegistrations from './pages/MyRegistrations';
import ParticipationHistory from './pages/ParticipationHistory';
import MyCertificates from './pages/MyCertificates';
import StudentProfile from './pages/StudentProfile';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />

            <Route path="student/dashboard" element={<StudentDashboard />} />
            <Route path="events" element={<BrowseEvents />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="student/registrations" element={<MyRegistrations />} />
            <Route path="student/history" element={<ParticipationHistory />} />
            <Route path="student/certificates" element={<MyCertificates />} />
            <Route path="student/profile" element={<StudentProfile />} />

            <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
