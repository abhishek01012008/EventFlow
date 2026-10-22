import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatCard from '../components/common/StatCard';
import EventCard from '../components/common/EventCard';
import {
  CalendarCheck,
  Award,
  Calendar,
  Compass,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { currentUser, events, registrations, certificates, recentActivity, registerForEvent } = useApp();

  // Metrics for current student
  const studentRegs = registrations.filter(r => r.studentId === currentUser.id);
  const registeredCount = studentRegs.filter(r => r.status === 'Registered').length;
  const attendedCount = studentRegs.filter(r => r.attendance === 'Present').length;
  const myCertificates = certificates.filter(c => c.studentId === currentUser.id);

  // Upcoming events
  const upcomingEvents = events.filter(e => e.status === 'Upcoming');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 60%, #2563EB 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '650px', zIndex: 2 }}>
          <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#93C5FD' }}>
            College Event Portal
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.02em' }}>
            Hello, {currentUser?.name}! 👋
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#E2E8F0', marginTop: '6px', lineHeight: 1.5 }}>
            Here is what's happening with your campus registrations, upcoming competitions, and participation credentials.
          </p>
        </div>

        <div style={{ zIndex: 2 }}>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#FFFFFF', color: '#1E3A8A', border: 'none', fontWeight: 700 }}
            onClick={() => navigate('/events')}
          >
            <Compass size={17} />
            <span>Browse All Events</span>
          </button>
        </div>

        {/* Decorative background shape */}
        <div
          style={{
            position: 'absolute',
            right: '-40px',
            bottom: '-50px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Stat Cards Grid */}
      <div className="stats-grid">
        <StatCard
          label="Registered Events"
          value={registeredCount}
          icon={CalendarCheck}
          color="#2563EB"
          bg="#EFF6FF"
          trend="Active registrations"
        />
        <StatCard
          label="Completed Events"
          value={attendedCount}
          icon={CheckCircle2}
          color="#10B981"
          bg="#ECFDF5"
          trend="Verified participation"
        />
        <StatCard
          label="Upcoming Events"
          value={upcomingEvents.length}
          icon={Calendar}
          color="#F59E0B"
          bg="#FFFBEB"
          trend="College schedule"
        />
        <StatCard
          label="Certificates Earned"
          value={myCertificates.length}
          icon={Award}
          color="#8B5CF6"
          bg="#F5F3FF"
          trend="Ready to download"
        />
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column: Upcoming Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Upcoming Events
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Discover technical symposiums, hackathons, and cultural fests
              </p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/events')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {upcomingEvents.slice(0, 4).map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={registerForEvent}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activity & Quick Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Recent Activity Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
            </div>
            <div className="card-body" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {recentActivity.slice(0, 5).map(act => (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid var(--card-border)',
                      fontSize: '0.84rem'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Clock size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.35 }}>
                        {act.text}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                        {act.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="card" style={{ background: '#FFFFFF' }}>
            <div className="card-header">
              <h3 className="card-title">Quick Student Shortcuts</h3>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => navigate('/student/registrations')}
              >
                <CalendarCheck size={16} color="#2563EB" />
                <span>Check My Active Registrations</span>
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => navigate('/student/certificates')}
              >
                <Award size={16} color="#8B5CF6" />
                <span>Download My Official Certificates</span>
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', width: '100%' }}
                onClick={() => navigate('/student/profile')}
              >
                <FileCheck size={16} color="#10B981" />
                <span>Verify Student Profile & Roll Number</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
