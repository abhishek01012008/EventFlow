import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUsers,
  initialEvents,
  initialRegistrations,
  initialCertificates,
  initialRecentActivity
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Safe localStorage helper
  const getStored = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [users, setUsers] = useState(() => getStored('eventflow_users', initialUsers));
  const [events, setEvents] = useState(() => getStored('eventflow_events', initialEvents));
  const [registrations, setRegistrations] = useState(() => getStored('eventflow_registrations', initialRegistrations));
  const [certificates, setCertificates] = useState(() => getStored('eventflow_certificates', initialCertificates));
  const [recentActivity, setRecentActivity] = useState(() => getStored('eventflow_activity', initialRecentActivity));

  const [settings, setSettings] = useState(() => getStored('eventflow_settings', {
    theme: 'light',
    defaultRole: 'student',
    emailAlerts: true,
    registrationNotifications: true,
    reminderAlerts: true
  }));

  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = ({ title, message, type = 'success' }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eventflow_role', JSON.stringify('student'));
      localStorage.setItem('eventflow_users', JSON.stringify(users));
      localStorage.setItem('eventflow_events', JSON.stringify(events));
      localStorage.setItem('eventflow_registrations', JSON.stringify(registrations));
      localStorage.setItem('eventflow_certificates', JSON.stringify(certificates));
      localStorage.setItem('eventflow_activity', JSON.stringify(recentActivity));
      localStorage.setItem('eventflow_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to sync state to localStorage', e);
    }
  }, [users, events, registrations, certificates, recentActivity, settings]);

  // Apply theme attribute to root
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [settings.theme]);

  // Derive Current Student User
  const currentUser = React.useMemo(() => {
    return users.find(u => u.role === 'student' && u.id === 'usr-stu-1') || users[0];
  }, [users]);

  // Event Registration for current student
  const registerForEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;

    // Check existing
    const existing = registrations.find(r => r.studentId === currentUser.id && r.eventId === eventId);
    if (existing && existing.status === 'Registered') {
      addToast({
        title: 'Already Registered',
        message: `You are already registered for ${event.title}`,
        type: 'warning'
      });
      return false;
    }

    if (existing && existing.status === 'Cancelled') {
      // Re-activate registration
      setRegistrations(prev => prev.map(r => r.id === existing.id ? { ...r, status: 'Registered', registrationDate: new Date().toISOString().slice(0, 10) } : r));
    } else {
      const newReg = {
        id: `reg-${Date.now()}`,
        studentId: currentUser.id,
        eventId: event.id,
        registrationDate: new Date().toISOString().slice(0, 10),
        status: 'Registered',
        certificateId: null
      };
      setRegistrations(prev => [newReg, ...prev]);
    }

    // Update event registeredCount
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: (e.registeredCount || 0) + 1 } : e));

    // Add activity
    const activityItem = {
      id: `act-${Date.now()}`,
      type: 'registration',
      user: currentUser.name,
      text: `Registered for ${event.title}`,
      time: 'Just now',
      icon: 'CheckCircle2'
    };
    setRecentActivity(prev => [activityItem, ...prev]);

    addToast({
      title: 'Registration Successful!',
      message: `You have successfully registered for ${event.title}`,
      type: 'success'
    });

    return true;
  };

  // Cancel Registration
  const cancelRegistration = (eventId) => {
    const event = events.find(e => e.id === eventId);
    const reg = registrations.find(r => r.studentId === currentUser.id && r.eventId === eventId && r.status === 'Registered');
    if (!reg) return false;

    setRegistrations(prev => prev.map(r => r.id === reg.id ? { ...r, status: 'Cancelled' } : r));
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: Math.max(0, (e.registeredCount || 1) - 1) } : e));

    const activityItem = {
      id: `act-${Date.now()}`,
      type: 'cancellation',
      user: currentUser.name,
      text: `Cancelled registration for ${event?.title || 'event'}`,
      time: 'Just now',
      icon: 'XCircle'
    };
    setRecentActivity(prev => [activityItem, ...prev]);

    addToast({
      title: 'Registration Cancelled',
      message: `Registration for ${event?.title || 'event'} was cancelled`,
      type: 'info'
    });

    return true;
  };

  // Update Profile
  const updateProfile = (profileData) => {
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...profileData } : u));
    addToast({
      title: 'Profile Updated',
      message: 'Your profile changes have been saved',
      type: 'success'
    });
  };

  // Update Settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast({
      title: 'Settings Saved',
      message: 'Application preferences updated',
      type: 'success'
    });
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem('eventflow_users');
    localStorage.removeItem('eventflow_events');
    localStorage.removeItem('eventflow_registrations');
    localStorage.removeItem('eventflow_certificates');
    localStorage.removeItem('eventflow_activity');
    localStorage.removeItem('eventflow_settings');

    setUsers(initialUsers);
    setEvents(initialEvents);
    setRegistrations(initialRegistrations);
    setCertificates(initialCertificates);
    setRecentActivity(initialRecentActivity);
    setSettings({
      theme: 'light',
      defaultRole: 'student',
      emailAlerts: true,
      registrationNotifications: true,
      reminderAlerts: true
    });

    addToast({
      title: 'Data Reset',
      message: 'All demo data has been restored to factory defaults',
      type: 'info'
    });
  };

  const value = {
    currentRole: 'student',
    currentUser,
    users,
    events,
    registrations,
    certificates,
    recentActivity,
    settings,
    toasts,
    registerForEvent,
    cancelRegistration,
    updateProfile,
    updateSettings,
    resetDemoData,
    addToast,
    removeToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
