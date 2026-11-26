import React, { useEffect } from 'react';
import { X, AlertTriangle, Info, Download, CheckCircle2, ExternalLink } from 'lucide-react';
import certificateSampleImage from '../../assets/certificate-sample.jpg';

/**
 * Base Modal Component
 */
export function Modal({ isOpen, onClose, title, children, footer, maxWidth = '580px' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

/**
 * ConfirmDialog - Confirmation popup for user actions
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const confirmBtnClass = isDestructive ? 'btn btn-danger' : 'btn btn-primary';
  const iconBg = isDestructive ? '#FEF2F2' : '#EFF6FF';
  const iconColor = isDestructive ? '#EF4444' : '#2563EB';

  const footer = (
    <>
      <button className="btn btn-secondary" onClick={onClose}>
        {cancelText}
      </button>
      <button className={confirmBtnClass} onClick={handleConfirm}>
        {confirmText}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      maxWidth="460px"
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: iconBg,
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {isDestructive ? <AlertTriangle size={22} /> : <Info size={22} />}
        </div>
        <div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5, marginTop: '2px' }}>
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}

/**
 * CertificatePreview - Preview & download certificate modal
 */
export function CertificatePreview({ isOpen, onClose, certificate }) {
  if (!certificate) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificateSampleImage;
    link.download = `${(certificate.eventName || 'Certificate').replace(/[^a-zA-Z0-9_-]/g, '_')}_Official_Certificate.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <a
        href={certificateSampleImage}
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
            src={certificateSampleImage}
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

