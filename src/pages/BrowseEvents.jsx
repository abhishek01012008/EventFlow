import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventCard from '../components/common/EventCard';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';
import { Search, X } from 'lucide-react';

export default function BrowseEvents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events, registerForEvent } = useApp();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date-asc');

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Workshop', 'Hackathon'];
  const statusFilters = ['All', 'Upcoming', 'Ongoing', 'Past'];

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evt.organizerName && evt.organizerName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || evt.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStatus = selectedStatus === 'All' || evt.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'popular') {
        return (b.registeredCount || 0) - (a.registeredCount || 0);
      }
      return 0;
    });
  }, [events, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSortBy('date-asc');
    setSearchParams({});
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All' || selectedStatus !== 'All';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title="Explore College Events"
        subtitle="Discover workshops, fests, hackathons, and sports tournaments across campus"
      />

      <div
        className="card"
        style={{
          padding: '18px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '42px' }}
              placeholder="Search by event name, venue, or coordinator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div style={{ minWidth: '160px' }}>
            <select
              className="form-control"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusFilters.map(st => (
                <option key={st} value={st}>Status: {st}</option>
              ))}
            </select>
          </div>

          <div style={{ minWidth: '180px' }}>
            <select
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-asc">Date: Upcoming First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
              <X size={14} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Showing <strong>{filteredEvents.length}</strong> events
        </span>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={registerForEvent}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events match your criteria"
          description="Try clearing your search filters or browse other categories to find exciting events."
          actionText="Reset All Filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
}
