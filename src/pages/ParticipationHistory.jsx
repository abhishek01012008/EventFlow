import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import CertificatePreview from '../components/common/CertificatePreview';
import { Award, Search } from 'lucide-react';

export default function ParticipationHistory() {
  const { registrations, events, certificates, currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [previewCert, setPreviewCert] = useState(null);

  const historyRecords = registrations
    .filter(r => r.studentId === currentUser.id && (r.status === 'Completed' || r.attendance === 'Present' || r.certificateId))
    .map(r => {
      const evt = events.find(e => e.id === r.eventId);
      const cert = certificates.find(c => c.studentId === currentUser.id && c.eventId === r.eventId);
      return {
        ...r,
        event: evt,
        certificate: cert
      };
    })
    .filter(r => r.event);

  const filteredRecords = historyRecords.filter(r => {
    return (
      r.event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title="Participation History"
        subtitle="Historical transcript of your completed college events and verified credentials"
      />

      <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '38px', height: '38px' }}
            placeholder="Search past events by name, category, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Category</th>
                <th>Date Conducted</th>
                <th>Organizer</th>
                <th>Participation Status</th>
                <th>Certificate</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
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
                  <td>
                    <div style={{ fontSize: '0.84rem' }}>{record.event.date}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {record.event.organizerName}
                    </div>
                  </td>
                  <td>
                    <StatusBadge status="Completed" />
                  </td>
                  <td>
                    {record.certificate ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#059669', fontSize: '0.82rem', fontWeight: 600 }}>
                        <Award size={15} />
                        <span>Issued</span>
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        Pending Issue
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {record.certificate && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setPreviewCert(record.certificate)}
                      >
                        <Award size={14} />
                        <span>Show Certificate</span>
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
          title="No participation records found"
          description="Your completed event participation and credentials will appear here once events conclude."
        />
      )}

      <CertificatePreview
        isOpen={!!previewCert}
        onClose={() => setPreviewCert(null)}
        certificate={previewCert}
      />
    </div>
  );
}
