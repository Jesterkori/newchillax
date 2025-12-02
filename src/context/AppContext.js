import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // User mood tracking
  const [moodHistory, setMoodHistory] = useState([]);

  // Journal entries
  const [journalEntries, setJournalEntries] = useState([]);

  // Sleep tracking
  const [sleepData, setSleepData] = useState([]);

  // User streak
  const [userStreak, setUserStreak] = useState(0);

  // Add mood entry
  const addMoodEntry = (mood) => {
    const newEntry = {
      id: Date.now(),
      mood,
      timestamp: new Date(),
    };
    setMoodHistory([...moodHistory, newEntry]);
  };

  // Add journal entry
  const addJournalEntry = (mood, content) => {
    const newEntry = {
      id: Date.now(),
      mood,
      content,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date(),
    };
    setJournalEntries([...journalEntries, newEntry]);
    updateStreak();
  };

  // Add sleep data
  const addSleepData = (hours, quality, date) => {
    const newEntry = {
      id: Date.now(),
      hours,
      quality,
      date: date || new Date().toISOString().split('T')[0],
      timestamp: new Date(),
    };
    setSleepData([...sleepData, newEntry]);
  };

  // Update user streak
  const updateStreak = () => {
    // Simple streak logic - increment if user journals
    setUserStreak((prev) => prev + 1);
  };

  // Get mood analytics
  const getMoodAnalytics = (period = 'week') => {
    // Filter entries based on period
    const now = new Date();
    const filtered = moodHistory.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      const daysDiff = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));
      return period === 'week' ? daysDiff <= 7 : daysDiff <= 30;
    });

    // Count mood frequencies
    const moodCounts = {};
    filtered.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    return {
      total: filtered.length,
      moodCounts,
      mostCommon: Object.keys(moodCounts).reduce(
        (a, b) => (moodCounts[a] > moodCounts[b] ? a : b),
        null
      ),
    };
  };

  // Get sleep analytics
  const getSleepAnalytics = (period = 'week') => {
    const now = new Date();
    const filtered = sleepData.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      const daysDiff = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));
      return period === 'week' ? daysDiff <= 7 : daysDiff <= 30;
    });

    if (filtered.length === 0) {
      return { average: 0, best: 0, total: 0 };
    }

    const totalHours = filtered.reduce((sum, entry) => sum + entry.hours, 0);
    const average = totalHours / filtered.length;
    const best = Math.max(...filtered.map((entry) => entry.hours));

    return {
      average: average.toFixed(1),
      best: best.toFixed(1),
      total: filtered.length,
    };
  };

  const value = {
    // State
    moodHistory,
    journalEntries,
    sleepData,
    userStreak,

    // Actions
    addMoodEntry,
    addJournalEntry,
    addSleepData,
    getMoodAnalytics,
    getSleepAnalytics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
