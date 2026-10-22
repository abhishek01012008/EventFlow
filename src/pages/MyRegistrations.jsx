import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { Calendar, MapPin, Clock, ArrowRight, XCircle } from 'lucide-react';

export default function MyRegistrations() {
  const navigate = useNavigate();
  const { registrations, events, currentUser, cancelRegistration } = useApp();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [eventToCancel, setEventToCancel] = useState(null);

  const myRegistrations = registrations
    .filter(r => r.studentId === currentUser.id)
    .map(r => {
      const evt = events.find(e => e.id === r.eventId);
      return {
        ...r,
        event: evt
      };
    })
    .filter(r => r.event);

  const upcomingRegs = myRegistrations.filter(r => r.status === 'Registered' && r.event.status !== 'Past');
  const pastRegs = myRegistrations.filter(r => r.status === 'Completed' || (r.status === 'Registered' && r.event.status === 'Past'));
  const cancelledRegs = myRegistrations.filter(r => r.status === 'Cancelled');

  const displayedList =
    activeTab === 'upcoming' ? upcomingRegs :
    activeTab === 'past' ? pastRegs :
    cancelledRegs;

  const handleConfirmCancel = () => {
    if (eventToCancel) {
      cancelRegistration(eventToCancel.id);
      setEventToCancel(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title="My Registrations"
        subtitle="Manage your registered college events, schedules, and enrollment status"
      />

      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <span>Upcoming Events</span>
          <span className="tab-badge">{upcomingRegs.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          <span>Past & Completed</span>
          <span className="tab-badge">{pastRegs.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          <span>Cancelled</span>
          <span className="tab-badge">{cancelledRegs.length}</span>
        </button>
      </div>

      {displayedList.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {displayedList.map(item => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: '#0B1F3A',
                  flexShrink: 0
                }}
              >
                <img
                  src={item.event.poster}
                  alt={item.event.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #0B1F3A, #2563EB)';
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                    {item.event.category}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <StatusBadge status={item.status} />
                </div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/events/${item.event.id}`)}
                >
                  {item.event.title}
                </h3>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    {item.event.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {item.event.startTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} />
                    {item.event.venue}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right', minWidth: '150px' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Registered On</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {item.registrationDate}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate(`/events/${item.event.id}`)}
                >
                  <span>Details</span>
                  <ArrowRight size={14} />
                </button>

                {activeTab === 'upcoming' && (
                  <button
                    className="btn btn-danger-outline btn-sm"
                    onClick={() => setEventToCancel(item.event)}
                  >
                    <XCircle size={14} />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab} registrations`}
          description={
            activeTab === 'upcoming'
              ? 'You have not registered for any upcoming events yet. Explore open events and sign up!'
              : `You have no ${activeTab} event registrations in your record.`
          }
          actionText={activeTab === 'upcoming' ? 'Browse All Events' : undefined}
          onAction={() => navigate('/events')}
        />
      )}

      <ConfirmDialog
        isOpen={!!eventToCancel}
        onClose={() => setEventToCancel(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Registration?"
        message={`Are you sure you want to cancel your enrollment in "${eventToCancel?.title}"?`}
        confirmText="Confirm Cancellation"
        isDestructive={true}
      />
    </div>
  );
}
