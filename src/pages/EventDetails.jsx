import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Modal from '../components/common/Modal';
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Share2,
  CalendarCheck,
  QrCode,
  Download
} from 'lucide-react';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registrations, currentUser, registerForEvent, cancelRegistration, addToast } = useApp();

  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Event Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>The requested event does not exist or has been removed.</p>
        <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/events')}>
          Back to Events
        </button>
      </div>
    );
  }

  const studentReg = registrations.find(r => r.studentId === currentUser?.id && r.eventId === event.id);
  const isRegistered = studentReg && studentReg.status === 'Registered';
  const isPast = event.status === 'Past';
  const seatsLeft = Math.max(0, (event.capacity || 100) - (event.registeredCount || 0));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Link Copied',
      message: 'Event link copied to clipboard',
      type: 'info'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: '320px', backgroundColor: '#0B1F3A' }}>
          <img
            src={event.poster}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 60%, #2563EB 100%)';
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11, 31, 58, 0.9) 0%, rgba(11, 31, 58, 0.2) 60%, transparent 100%)'
            }}
          />

          <div style={{ position: 'absolute', top: '20px', left: '24px', display: 'flex', gap: '10px' }}>
            <span
              style={{
                backgroundColor: 'rgba(37, 99, 235, 0.9)',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backdropFilter: 'blur(8px)'
              }}
            >
              {event.category}
            </span>
            <StatusBadge status={event.status} />
          </div>

          <div style={{ position: 'absolute', top: '20px', right: '24px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}
              onClick={handleShare}
            >
              <Share2 size={15} />
              <span>Share Event</span>
            </button>
          </div>

          <div style={{ position: 'absolute', bottom: '24px', left: '28px', right: '28px' }}>
            <h1 style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              {event.title}
            </h1>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px', color: '#E2E8F0', fontSize: '0.9rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="#93C5FD" />
                {event.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="#93C5FD" />
                {event.startTime} - {event.endTime}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="#93C5FD" />
                {event.venue}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px 28px',
            backgroundColor: isRegistered ? '#ECFDF5' : '#FFFFFF',
            borderBottom: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isRegistered ? (
              <>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#10B981', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#065F46', fontSize: '0.92rem' }}>
                    You are registered for this event!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                    Registered on {studentReg.registrationDate}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Capacity:</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginLeft: '6px' }}>
                  {event.registeredCount || 0} / {event.capacity} Registered
                </span>
                <span style={{ fontSize: '0.82rem', color: seatsLeft <= 10 ? 'var(--danger)' : 'var(--success)', fontWeight: 600, marginLeft: '10px' }}>
                  ({seatsLeft} seats left)
                </span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isRegistered ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => setQrModalOpen(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <QrCode size={16} />
                  <span>Attendance QR</span>
                </button>
                <button
                  className="btn btn-danger-outline"
                  onClick={() => setConfirmCancelOpen(true)}
                  disabled={isPast}
                >
                  <XCircle size={16} />
                  <span>Cancel Registration</span>
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => registerForEvent(event.id)}
                disabled={isPast || seatsLeft === 0}
              >
                <CalendarCheck size={18} />
                <span>{seatsLeft === 0 ? 'Event Full' : 'Register Now'}</span>
              </button>
            )}
          </div>
        </div>

        <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
                About the Event
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {event.description}
              </p>
            </div>

            {event.highlights && event.highlights.length > 0 && (
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
                  Key Highlights & Perks
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {event.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-main)',
                        border: '1px solid var(--card-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}
                    >
                      <CheckCircle2 size={16} color="#2563EB" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: '1px solid var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Important Information
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Registration Deadline
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                    {event.registrationDeadline}
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Eligibility Criteria
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                    {event.eligibility}
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Organizer / Coordinator
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                    {event.organizerName}
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Official Certificate
                  </div>
                  <div style={{ fontWeight: 600, color: '#2563EB', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={16} />
                    <span>Conferred upon verified attendance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmCancelOpen}
        onClose={() => setConfirmCancelOpen(false)}
        onConfirm={() => cancelRegistration(event.id)}
        title="Cancel Event Registration?"
        message={`Are you sure you want to cancel your registration for "${event.title}"? Your seat will be made available to other students.`}
        confirmText="Yes, Cancel Registration"
        isDestructive={true}
      />

      {qrModalOpen && (
        <Modal
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
          title={`Attendance QR: ${event.title}`}
          maxWidth="460px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <a
                href="/attendance-qr-sample.jpg"
                download={`${event.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Attendance_QR.jpg`}
                className="btn btn-secondary btn-sm"
              >
                <Download size={14} />
                <span>Save QR</span>
              </a>
              <button className="btn btn-primary btn-sm" onClick={() => setQrModalOpen(false)}>
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
                Event Date: {event.date} • {event.venue}
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
                Present this QR code to the event coordinator at the venue entry. Once scanned, your attendance will be recorded and certificate issued upon completion.
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
