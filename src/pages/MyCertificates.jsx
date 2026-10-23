import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import CertificatePreview from '../components/common/CertificatePreview';
import { Award, Download, Eye } from 'lucide-react';

export default function MyCertificates() {
  const { certificates, currentUser } = useApp();
  const [selectedCert, setSelectedCert] = useState(null);

  const studentCertificates = certificates.filter(c => c.studentId === currentUser.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title="My Official Certificates"
        subtitle="Download and verify official certificates of achievement and participation"
      />

      {studentCertificates.length > 0 ? (
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

                <div
                  style={{
                    position: 'absolute',
                    right: '-20px',
                    bottom: '-20px',
                    opacity: 0.1,
                    pointerEvents: 'none'
                  }}
                >
                  <Award size={120} />
                </div>
              </div>

              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Certificate ID:</span>
                    <strong style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{cert.certificateNo}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Recipient:</span>
                    <span style={{ fontWeight: 600 }}>{cert.studentName} ({cert.rollNo})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Issued On:</span>
                    <span style={{ fontWeight: 600 }}>{cert.issueDate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Authorized By:</span>
                    <span style={{ fontWeight: 600 }}>{cert.directorName}</span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--card-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <Eye size={15} />
                    <span>Show Certificate</span>
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <Download size={15} />
                    <span>Download Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No certificates earned yet"
          description="Attend registered events to have your attendance marked by coordinators and receive verified certificates here."
        />
      )}

      <CertificatePreview
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </div>
  );
}
