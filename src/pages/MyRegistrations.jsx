import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import { Calendar, MapPin, Clock, ArrowRight, XCircle, QrCode, Download, CheckCircle2 } from 'lucide-react';

export default function MyRegistrations() {
  const navigate = useNavigate();
  const { registrations, events, currentUser, cancelRegistration } = useApp();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [eventToCancel, setEventToCancel] = useState(null);
  const [selectedQrItem, setSelectedQrItem] = useState(null);

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
                {item.status === 'Registered' && (
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    onClick={() => setSelectedQrItem(item)}
                    title="Show Attendance QR Code"
                  >
                    <QrCode size={14} />
                    <span>QR</span>
                  </button>
                )}

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

      {selectedQrItem && (
        <Modal
          isOpen={!!selectedQrItem}
          onClose={() => setSelectedQrItem(null)}
          title={`Attendance QR: ${selectedQrItem.event.title}`}
          maxWidth="460px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <a
                href="/attendance-qr-sample.jpg"
                download={`${selectedQrItem.event.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Attendance_QR.jpg`}
                className="btn btn-secondary btn-sm"
              >
                <Download size={14} />
                <span>Save QR</span>
              </a>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedQrItem(null)}>
                Done
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--card-border)',
                boxShadow: 'var(--shadow-md)',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src="/attendance-qr-sample.jpg"
                alt="Attendance QR Code"
                style={{ width: '240px', height: '240px', objectFit: 'contain', display: 'block', borderRadius: 'var(--radius-md)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {currentUser?.name}
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Roll No: <strong>{currentUser?.rollNo}</strong> &nbsp;|&nbsp; Dept: <strong>{currentUser?.department}</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Event Date: {selectedQrItem.event.date} • {selectedQrItem.event.venue}
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                fontSize: '0.82rem',
                color: '#1E3A8A',
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                textAlign: 'left'
              }}
            >
              <CheckCircle2 size={16} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                Show this QR code to the event coordinator at the entry desk. Once scanned, your attendance will be verified and your certificate will be unlocked.
              </div>
            </div>
          </div>
        </Modal>
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
