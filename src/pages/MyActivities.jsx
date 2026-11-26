import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge, ConfirmDialog, EmptyState, Modal, CertificatePreview } from '../components';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  XCircle,
  QrCode,
  Download,
  CheckCircle2,
  Award,
  Search,
  Eye
} from 'lucide-react';
import attendanceQrImage from '../assets/attendance-qr-sample.jpg';
import { downloadCertificatePDF } from '../utils/generatePdf';

export default function MyActivities() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { registrations, events, certificates, currentUser, cancelRegistration } = useApp();

  const initialTab = searchParams.get('tab') || 'upcoming';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [eventToCancel, setEventToCancel] = useState(null);
  const [selectedQrItem, setSelectedQrItem] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [historySearch, setHistorySearch] = useState('');

  // Switch tab and update query param
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Student Registrations with joined Event data
  const myRegistrations = registrations
    .filter(r => r.studentId === currentUser.id)
    .map(r => {
      const evt = events.find(e => e.id === r.eventId);
      return { ...r, event: evt };
    })
    .filter(r => r.event);

  const upcomingRegs = myRegistrations.filter(r => r.status === 'Registered' && r.event.status !== 'Past');
  const pastRegs = myRegistrations.filter(r => r.status === 'Completed' || (r.status === 'Registered' && r.event.status === 'Past'));
  const cancelledRegs = myRegistrations.filter(r => r.status === 'Cancelled');

  // History records with joined certificate
  const historyRecords = registrations
    .filter(r => r.studentId === currentUser.id && (r.status === 'Completed' || r.attendance === 'Present' || r.certificateId))
    .map(r => {
      const evt = events.find(e => e.id === r.eventId);
      const cert = certificates.find(c => c.studentId === currentUser.id && c.eventId === r.eventId);
      return { ...r, event: evt, certificate: cert };
    })
    .filter(r => r.event)
    .filter(r => {
      if (!historySearch.trim()) return true;
      const q = historySearch.toLowerCase();
      return (
        r.event.title.toLowerCase().includes(q) ||
        r.event.venue.toLowerCase().includes(q) ||
        r.event.category.toLowerCase().includes(q)
      );
    });

  // Student certificates
  const studentCertificates = certificates.filter(c => c.studentId === currentUser.id);

  const handleConfirmCancel = () => {
    if (eventToCancel) {
      cancelRegistration(eventToCancel.id);
      setEventToCancel(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title="My Registrations & Activities"
        subtitle="Manage registrations, attendance check-in QR codes, participation history, and official certificates"
      />

      {/* Unified 4-Tab Navigation */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => handleTabChange('upcoming')}
        >
          <span>Upcoming Events</span>
          <span className="tab-badge">{upcomingRegs.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => handleTabChange('certificates')}
        >
          <span>My Certificates</span>
          <span className="tab-badge">{studentCertificates.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => handleTabChange('history')}
        >
          <span>Participation History</span>
          <span className="tab-badge">{historyRecords.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => handleTabChange('cancelled')}
        >
          <span>Cancelled</span>
          <span className="tab-badge">{cancelledRegs.length}</span>
        </button>
      </div>

      {/* TAB 1: Upcoming Registrations */}
      {activeTab === 'upcoming' && (
        upcomingRegs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {upcomingRegs.map(item => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '20px',
                  border: '1px solid var(--card-border)',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ width: '130px', height: '90px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={item.event.poster}
                    alt={item.event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)';
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                      {item.event.category}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <h3
                    style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
                    onClick={() => navigate(`/events/${item.event.id}`)}
                  >
                    {item.event.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} />
                      {item.event.date}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} />
                      {item.event.startTime}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} />
                      {item.event.venue}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: 'auto' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedQrItem(item)}
                    title="Show entry QR code"
                  >
                    <QrCode size={15} />
                    <span>Attendance Pass</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/events/${item.event.id}`)}
                  >
                    <span>View Event</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setEventToCancel(item.event)}
                    title="Cancel your registration"
                  >
                    <XCircle size={15} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Upcoming Registrations"
            description="You have not registered for any upcoming events yet. Explore upcoming tech fests, workshops, and symposiums."
            actionText="Browse Events"
            onAction={() => navigate('/events')}
          />
        )
      )}

      {/* TAB 2: My Certificates */}
      {activeTab === 'certificates' && (
        studentCertificates.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '22px' }}>
            {studentCertificates.map(cert => (
              <div
                key={cert.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--card-border)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)',
                    padding: '24px 20px',
                    color: '#FFFFFF',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F59E0B'
                      }}
                    >
                      <Award size={24} />
                    </div>
                    <span
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        border: '1px solid #10B981',
                        color: '#A7F3D0',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                    >
                      Verified Credential
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                    {cert.title}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '4px', lineHeight: 1.35 }}>
                    {cert.eventName}
                  </h3>
                </div>

                <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Recipient:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{cert.studentName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Roll Number:</span>
                    <strong style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{cert.rollNo}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Issue Date:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{cert.issueDate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Certificate ID:</span>
                    <strong style={{ color: 'var(--text-main)', fontFamily: 'monospace', fontSize: '0.78rem' }}>{cert.certificateNo}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => setSelectedCert(cert)}
                    >
                      <Eye size={15} />
                      <span>Preview Image</span>
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => downloadCertificatePDF(cert)}
                    >
                      <Download size={15} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Award}
            title="No Certificates Issued Yet"
            description="Complete and attend college events to earn official accredited participation and achievement certificates."
            actionText="Explore Events"
            onAction={() => navigate('/events')}
          />
        )
      )}

      {/* TAB 3: Participation History */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '38px', height: '38px' }}
                placeholder="Search past events by name, category, or location..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
              />
            </div>
          </div>

          {historyRecords.length > 0 ? (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Category</th>
                    <th>Date Conducted</th>
                    <th>Organizer</th>
                    <th>Status</th>
                    <th>Certificate</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyRecords.map(record => (
                    <tr key={record.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                          {record.event.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {record.event.venue}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2563EB', textTransform: 'uppercase' }}>
                          {record.event.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.84rem' }}>{record.event.date}</td>
                      <td style={{ fontSize: '0.84rem' }}>{record.event.organizerName}</td>
                      <td>
                        <StatusBadge status="Completed" />
                      </td>
                      <td>
                        {record.certificate ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '0.82rem', fontWeight: 600 }}>
                            <CheckCircle2 size={14} />
                            <span>Issued</span>
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>In Review</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {record.certificate ? (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setSelectedCert(record.certificate)}
                          >
                            <Award size={14} />
                            <span>Certificate</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigate(`/events/${record.event.id}`)}
                          >
                            <span>Details</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No Participation Records"
              description="No completed events found matching your search filter."
            />
          )}
        </div>
      )}

      {/* TAB 4: Cancelled Registrations */}
      {activeTab === 'cancelled' && (
        cancelledRegs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cancelledRegs.map(item => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '20px',
                  border: '1px solid var(--card-border)',
                  opacity: 0.75
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {item.event.category}
                    </span>
                    <StatusBadge status="Cancelled" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.event.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <span>{item.event.date} • {item.event.venue}</span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/events/${item.event.id}`)}
                  >
                    <span>Re-register</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Cancelled Registrations"
            description="You have no cancelled event registrations."
          />
        )
      )}

      {/* QR Attendance Pass Modal */}
      {selectedQrItem && (
        <Modal
          isOpen={!!selectedQrItem}
          onClose={() => setSelectedQrItem(null)}
          title="Attendance Check-In Pass"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Keep your college ID card handy for gate validation
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={attendanceQrImage}
                  download={`Attendance_Pass_${selectedQrItem.event?.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.jpg`}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={14} />
                  <span>Download Pass</span>
                </a>
                <button className="btn btn-primary btn-sm" onClick={() => setSelectedQrItem(null)}>
                  Done
                </button>
              </div>
            </div>
          }
          maxWidth="460px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', padding: '10px 0' }}>
            <div style={{ border: '2px dashed var(--primary)', borderRadius: '12px', padding: '12px', background: '#FFFFFF' }}>
              <img
                src={attendanceQrImage}
                alt="Event Check-in QR Pass"
                style={{ width: '220px', height: '220px', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {selectedQrItem.event?.title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Present this pass at the entrance desk of {selectedQrItem.event?.venue}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Dialog for Cancellation */}
      <ConfirmDialog
        isOpen={!!eventToCancel}
        onClose={() => setEventToCancel(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Event Registration?"
        message={`Are you sure you want to cancel your registration for "${eventToCancel?.title}"? Your allocated seat will be made available to other students.`}
        confirmText="Yes, Cancel Registration"
        cancelText="Keep Registration"
        isDestructive={true}
      />

      {/* Certificate Viewer Modal */}
      <CertificatePreview
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </div>
  );
}
