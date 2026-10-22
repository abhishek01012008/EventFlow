import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  CheckCircle2
} from 'lucide-react';

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, recentActivity } = useApp();

  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const notifMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target)) {
        setNotifMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/student/dashboard')) return 'Student Dashboard';
    if (path.includes('/events/')) return 'Event Overview & Registration';
    if (path === '/events') return 'Explore Events';
    if (path.includes('/student/registrations')) return 'My Registrations';
    if (path.includes('/student/history')) return 'Participation History';
    if (path.includes('/student/certificates')) return 'Official Certificates';
    if (path.includes('/student/profile')) return 'My Profile';
    return 'EventFlow Student Portal';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <h2 className="page-title">{getPageTitle()}</h2>
        </div>
      </div>

      <form className="topbar-search" onSubmit={handleSearchSubmit}>
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search college events, workshops, fests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="topbar-right">
        <div style={{ position: 'relative' }} ref={notifMenuRef}>
          <button
            className="topbar-icon-btn"
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          {notifMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                width: '320px',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                padding: '12px',
                zIndex: 100,
                animation: 'fadeInDown 0.15s ease-out'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                  borderBottom: '1px solid var(--card-border)',
                  fontSize: '0.84rem',
                  fontWeight: 700
                }}
              >
                <span>Recent Activity</span>
                <span style={{ fontSize: '0.72rem', color: '#2563EB', fontWeight: 600 }}>Updates</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--bg-main)',
                        display: 'flex',
                        gap: '10px',
                        fontSize: '0.78rem'
                      }}
                    >
                      <CheckCircle2 size={16} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.3 }}>
                          {item.text}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '3px' }}>
                          {item.time}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    No recent notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className="topbar-user"
          onClick={() => navigate('/student/profile')}
        >
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="topbar-avatar"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
            }}
          />
          <span className="topbar-user-name">{currentUser?.name}</span>
          <span className="topbar-role-tag">Student</span>
        </div>
      </div>
    </header>
  );
}
