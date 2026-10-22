import React from 'react';

export default function StatCard({ label, value, icon: Icon, trend, color = '#2563EB', bg = '#EFF6FF' }) {
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
