import React from 'react';
import Modal from './Modal';
import { Download, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { downloadCertificatePDF } from '../../utils/generatePdf';

export default function CertificatePreview({ isOpen, onClose, certificate }) {
  if (!certificate) return null;

  const handleDownload = () => {
    downloadCertificatePDF(certificate);
  };

  const footer = (
    <>
      <button className="btn btn-secondary" onClick={onClose}>
        Close
      </button>
      <button className="btn btn-primary" onClick={handleDownload}>
        <Download size={16} />
        <span>Download PDF</span>
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Certificate Preview" footer={footer} maxWidth="780px">
      <div
        style={{
          background: '#FAFCFF',
          border: '4px double #2563EB',
          borderRadius: '12px',
          padding: '36px 32px',
          position: 'relative',
          boxShadow: 'inset 0 0 0 3px #F59E0B',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.04,
            pointerEvents: 'none'
          }}
        >
          <Award size={260} color="#2563EB" />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#2563EB', marginBottom: '6px' }}>
            <Award size={24} />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              EventFlow Official Academic Credential
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B1F3A', letterSpacing: '-0.01em' }}>
            EVENTFLOW COLLEGE OF ENGINEERING & TECHNOLOGY
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
            Accredited Grade A+ • ISO 9001:2015 Certified Institution
          </p>
        </div>

        <div style={{ margin: '20px 0 16px' }}>
          <span
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#2563EB',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderBottom: '2px solid #CBD5E1',
              paddingBottom: '6px',
              display: 'inline-block'
            }}
          >
            {certificate.title || 'Certificate of Participation'}
          </span>
        </div>

        <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '0.95rem', marginBottom: '12px' }}>
          This is proudly conferred upon
        </p>

        <div style={{ margin: '14px 0 18px' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            {certificate.studentName || 'Student Name'}
          </h1>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
            Roll No: <strong>{certificate.rollNo || 'N/A'}</strong> &nbsp;|&nbsp; Department: <strong>{certificate.department || 'N/A'}</strong>
          </div>
        </div>

        <p style={{ fontSize: '0.95rem', color: '#334155', maxWidth: '540px', margin: '0 auto 16px', lineHeight: 1.6 }}>
          for active, commendable participation and demonstrated practical excellence in the college event
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D4ED8', marginBottom: '24px' }}>
          "{certificate.eventName}"
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px dashed #E2E8F0'
          }}
        >
          <div style={{ textAlign: 'center', width: '180px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', borderBottom: '1px solid #94A3B8', paddingBottom: '4px' }}>
              {certificate.organizerName || 'Dr. Amit Kumar'}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
              Faculty Event Coordinator
            </div>
          </div>

          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: '#FEF3C7',
              border: '2px solid #D97706',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)'
            }}
          >
            <ShieldCheck size={24} color="#D97706" />
            <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#92400E', marginTop: '2px' }}>
              OFFICIAL
            </span>
          </div>

          <div style={{ textAlign: 'center', width: '180px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', borderBottom: '1px solid #94A3B8', paddingBottom: '4px' }}>
              {certificate.directorName || 'Dr. V. K. Verma'}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
              Dean / Principal
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', fontSize: '0.72rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Certificate ID: <strong>{certificate.certificateNo || 'EF-2026-GEN'}</strong></span>
          <span>Issued Date: {certificate.issueDate}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#059669' }}>
            <CheckCircle2 size={12} /> System Verified Record
          </span>
        </div>
      </div>
    </Modal>
  );
}
