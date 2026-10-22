import React from 'react';
import Modal from './Modal';
import { AlertTriangle, Info } from 'lucide-react';

export default function ConfirmDialog({
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
