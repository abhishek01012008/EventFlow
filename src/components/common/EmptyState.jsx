import React from 'react';
import { FolderSearch } from 'lucide-react';

export default function EmptyState({
  icon: Icon = FolderSearch,
  title = 'No records found',
  description = 'There is nothing to display here right now.',
  actionText,
  onAction
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={32} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {actionText && onAction && (
        <button className="btn btn-primary btn-sm" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}
