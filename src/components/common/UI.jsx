import React from 'react';
import { FolderSearch } from 'lucide-react';

/**
 * PageHeader - Standard header block with title, optional subtitle, and actions
 */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
}

/**
 * StatCard - Dashboard KPI metric card with icon & trend indicator
 */
export function StatCard({ label, value, icon: Icon, trend, color = '#2563EB', bg = '#EFF6FF' }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {trend && (
          <span className="stat-trend positive">
            {trend}
          </span>
        )}
      </div>

      {Icon && (
        <div className="stat-icon-wrapper" style={{ backgroundColor: bg, color: color }}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}

/**
 * StatusBadge - Status pill with color-coded dot indicator
 */
export function StatusBadge({ status }) {
  let badgeColor = 'status-info';

  if (status === 'Registered' || status === 'Completed' || status === 'Active') {
    badgeColor = 'status-success';
  } else if (status === 'Ongoing' || status === 'Pending') {
    badgeColor = 'status-warning';
  } else if (status === 'Cancelled' || status === 'Past') {
    badgeColor = 'status-danger';
  } else if (status === 'Upcoming') {
    badgeColor = 'status-info';
  }

  return (
    <span className={'status-badge ' + badgeColor}>
      <span className="dot" />
      {status}
    </span>
  );
}

/**
 * EmptyState - Empty/no-records placeholder with icon, message, and action
 */
export function EmptyState({
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

