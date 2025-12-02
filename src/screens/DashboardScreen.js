import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = () => {
  const [tip, setTip] = useState('');

  const wellnessTips = [
    "Take a 5-minute breathing break every hour",
    "Drink water regularly throughout the day",
    "Step outside for some fresh air",
    "Practice gratitude - write 3 things you're thankful for",
    "Stretch your body for better circulation",
    "Connect with a friend or family member",
    "Listen to calming music",
    "Take a short walk to clear your mind"
  ];

  useEffect(() => {
    const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student!</Text>
        <Text style={styles.subtitle}>How are you feeling today?</Text>
      </View>

      {/* Wellness Tip Card */}
      <View style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <Ionicons name="bulb" size={24} color="#fbbf24" />
          <Text style={styles.tipTitle}>Daily Wellness Tip</Text>
        </View>
        <Text style={styles.tipText}>{tip}</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="heart" size={32} color="#ef4444" />
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="create" size={32} color="#8b5cf6" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Journal Entries</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="water" size={28} color="#3b82f6" />
          <Text style={styles.actionText}>Breathing Exercise</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="game-controller" size={28} color="#10b981" />
          <Text style={styles.actionText}>Mindfulness Games</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="book" size={28} color="#f59e0b" />
          <Text style={styles.actionText}>Today's Journal</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Mood Tracker Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week's Mood</Text>
        <View style={styles.moodPreview}>
          <Text style={styles.moodText}>Track your mood patterns over time</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  tipCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#fbbf24',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#78350f',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  moodPreview: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  moodText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  viewButton: {
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default DashboardScreen;
