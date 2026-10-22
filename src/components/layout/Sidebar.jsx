import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  History,
  Award,
  User,
  GraduationCap
} from 'lucide-react';

export default function Sidebar() {
  const { currentUser, registrations } = useApp();
  const navigate = useNavigate();

  const myRegisteredCount = registrations.filter(r => r.studentId === currentUser?.id && r.status === 'Registered').length;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <GraduationCap size={22} />
        </div>
        <div>
          <div className="sidebar-title">EventFlow</div>
          <div className="sidebar-subtitle">Student Portal</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Navigation</div>
        <NavLink to="/student/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard className="icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Compass className="icon" />
          <span>Browse Events</span>
        </NavLink>
        <NavLink to="/student/registrations" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <CalendarCheck className="icon" />
          <span>My Registrations</span>
          {myRegisteredCount > 0 && <span className="badge">{myRegisteredCount}</span>}
        </NavLink>
        <NavLink to="/student/history" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <History className="icon" />
          <span>Participation History</span>
        </NavLink>
        <NavLink to="/student/certificates" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Award className="icon" />
          <span>My Certificates</span>
        </NavLink>
        <NavLink to="/student/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <User className="icon" />
          <span>My Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div
          className="sidebar-user-pill"
          onClick={() => navigate('/student/profile')}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="sidebar-avatar"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
            }}
          />
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{currentUser?.name}</div>
            <div className="sidebar-user-role">Student</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
