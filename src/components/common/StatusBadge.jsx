import React from 'react';

export default function StatusBadge({ status }) {
  // Determine badge color based on status
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
