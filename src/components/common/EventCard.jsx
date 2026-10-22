import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useApp } from '../../context/AppContext';

export default function EventCard({ event, onRegister, showQuickActions = true }) {
  const navigate = useNavigate();
  const { currentUser, registrations } = useApp();
  const myReg = registrations.find(r => r.studentId === currentUser?.id && r.eventId === event.id);
  const isRegistered = myReg && myReg.status === 'Registered';
  const isPast = event.status === 'Past';

  const getCategoryColor = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'technical': return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' };
      case 'cultural': return { bg: '#FAF5FF', text: '#9333EA', border: '#E9D5FF' };
      case 'sports': return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' };
      case 'workshop': return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' };
      case 'hackathon': return { bg: '#EEF2FF', text: '#4F46E5', border: '#C7D2FE' };
      default: return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
    }
  };

  const catStyle = getCategoryColor(event.category);
  const seatsLeft = Math.max(0, (event.capacity || 100) - (event.registeredCount || 0));

  return (
    <div className="event-card">
      <div className="event-card-poster">
        <img
          src={event.poster}
          alt={event.title}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 50%, #2563EB 100%)';
          }}
        />
        <div
          className="event-card-badge"
          style={{
            backgroundColor: catStyle.bg,
            color: catStyle.text,
            border: `1px solid ${catStyle.border}`
          }}
        >
          {event.category}
        </div>
        <div className="event-card-status-badge">
          <StatusBadge status={event.status} />
        </div>
      </div>

      <div className="event-card-content">
        <h4 className="event-card-title" title={event.title}>{event.title}</h4>

        <div className="event-card-details">
          <div className="event-detail-item">
            <Calendar className="icon" />
            <span>{event.date} • {event.startTime}</span>
          </div>
          <div className="event-detail-item">
            <MapPin className="icon" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {event.venue}
            </span>
          </div>
          <div className="event-detail-item">
            <Users className="icon" />
            <span>{event.registeredCount || 0} / {event.capacity} registered ({seatsLeft} seats left)</span>
          </div>
        </div>

        <div className="event-card-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </button>

          {showQuickActions && !isPast && (
            isRegistered ? (
              <span className="status-badge status-success">
                <span className="dot" />
                Registered
              </span>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onRegister && onRegister(event.id)}
                disabled={seatsLeft === 0}
              >
                {seatsLeft === 0 ? 'Full' : 'Register'}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
