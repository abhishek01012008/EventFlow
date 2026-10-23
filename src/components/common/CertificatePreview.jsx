import React from 'react';
import Modal from './Modal';
import { Download, Award, CheckCircle2, ExternalLink } from 'lucide-react';

export default function CertificatePreview({ isOpen, onClose, certificate }) {
  if (!certificate) return null;

  const certificateImageUrl = '/certificate-sample.jpg';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificateImageUrl;
    link.download = `${(certificate.eventName || 'Certificate').replace(/[^a-zA-Z0-9_-]/g, '_')}_Official_Certificate.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <a
        href={certificateImageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary btn-sm"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        <ExternalLink size={14} />
        <span>Open Full Image</span>
      </a>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={handleDownload}>
          <Download size={16} />
          <span>Download Image</span>
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Certificate: ${certificate.eventName || 'Official Credential'}`}
      footer={footer}
      maxWidth="860px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#0F172A',
            borderRadius: 'var(--radius-lg)',
            padding: '12px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          <img
            src={certificateImageUrl}
            alt={certificate.title || 'Official Certificate of Participation'}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '68vh',
              objectFit: 'contain',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
              display: 'block'
            }}
          />
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 18px',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--card-border)',
            fontSize: '0.84rem',
            gap: '12px'
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Certificate No: </span>
            <strong style={{ fontFamily: 'monospace', color: 'var(--text-main)' }}>
              {certificate.certificateNo || 'EF-2026-GEN'}
            </strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Issued To: </span>
            <strong style={{ color: 'var(--text-main)' }}>{certificate.studentName}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Date: </span>
            <strong style={{ color: 'var(--text-main)' }}>{certificate.issueDate}</strong>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 600 }}>
            <CheckCircle2 size={15} />
            <span>Verified Credential</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
