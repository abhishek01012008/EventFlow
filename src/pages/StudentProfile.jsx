import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/common/PageHeader';
import { Edit3, Save, X } from 'lucide-react';

export default function StudentProfile() {
  const { currentUser, updateProfile } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    rollNo: currentUser?.rollNo || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    department: currentUser?.department || '',
    year: currentUser?.year || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Student Roll Number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      rollNo: currentUser?.rollNo || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      department: currentUser?.department || '',
      year: currentUser?.year || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px', margin: '0 auto' }}>
      <PageHeader
        title="Student Profile"
        subtitle="Manage your personal information, college identification, and contact preferences"
        actions={
          !isEditing && (
            <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
              <Edit3 size={15} />
              <span>Edit Profile</span>
            </button>
          )
        }
      />

      <div className="card">
        {/* Profile Card Header with avatar */}
        <div
          style={{
            padding: '28px',
            borderBottom: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            backgroundColor: 'var(--bg-main)'
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #2563EB',
                boxShadow: 'var(--shadow-md)'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {currentUser?.name}
              </h2>
              <span className="status-badge status-success">
                <span className="dot" />
                {currentUser?.status || 'Active Student'}
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {currentUser?.department} • {currentUser?.year}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px', fontFamily: 'monospace' }}>
              Roll Number: {currentUser?.rollNo}
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} style={{ padding: '28px' }}>
          <div className="form-row">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">
                <span>Full Name</span>
                {isEditing && <span className="required">*</span>}
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <div className="form-error-msg">{errors.name}</div>}
            </div>

            {/* Student ID / Roll No */}
            <div className="form-group">
              <label className="form-label">
                <span>Student Roll Number</span>
                {isEditing && <span className="required">*</span>}
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.rollNo}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              />
              {errors.rollNo && <div className="form-error-msg">{errors.rollNo}</div>}
            </div>
          </div>

          <div className="form-row">
            {/* Email Address */}
            <div className="form-group">
              <label className="form-label">
                <span>College Email</span>
                {isEditing && <span className="required">*</span>}
              </label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="form-error-msg">{errors.email}</div>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                className="form-control"
                value={formData.phone}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Department */}
            <div className="form-group">
              <label className="form-label">
                <span>Department</span>
                {isEditing && <span className="required">*</span>}
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.department}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              {errors.department && <div className="form-error-msg">{errors.department}</div>}
            </div>

            {/* Academic Year */}
            <div className="form-group">
              <label className="form-label">
                <span>Academic Year</span>
              </label>
              <select
                className="form-control"
                value={formData.year}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          {isEditing && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '16px',
                paddingTop: '20px',
                borderTop: '1px solid var(--card-border)'
              }}
            >
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                <X size={16} />
                <span>Cancel</span>
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
