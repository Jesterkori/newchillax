import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SleepScreen = () => {
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState('Good');

  const sleepTips = [
    'Maintain a consistent sleep schedule',
    'Avoid screens 1 hour before bed',
    'Keep your bedroom cool and dark',
    'Limit caffeine after 2 PM',
    'Try relaxation exercises before sleep',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Sleep Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="moon" size={32} color="#6366f1" />
          <Text style={styles.summaryTitle}>Last Night's Sleep</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{sleepHours}</Text>
            <Text style={styles.statLabel}>hours</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{sleepQuality}</Text>
            <Text style={styles.statLabel}>quality</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logButton}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.logButtonText}>Log Sleep</Text>
        </TouchableOpacity>
      </View>

      {/* Weekly Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.weekCard}>
          <View style={styles.weekRow}>
            <Text style={styles.weekLabel}>Average Sleep:</Text>
            <Text style={styles.weekValue}>7.2 hours</Text>
          </View>
          <View style={styles.weekRow}>
            <Text style={styles.weekLabel}>Best Night:</Text>
            <Text style={styles.weekValue}>8.5 hours</Text>
          </View>
          <View style={styles.weekRow}>
            <Text style={styles.weekLabel}>Sleep Goal:</Text>
            <Text style={styles.weekValue}>8 hours</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '90%' }]} />
          </View>
          <Text style={styles.progressText}>90% of your goal</Text>
        </View>
      </View>

      {/* Sleep Schedule */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sleep Schedule</Text>
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleIcon}>
              <Ionicons name="bed" size={24} color="#8b5cf6" />
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleLabel}>Bedtime</Text>
              <Text style={styles.scheduleTime}>11:00 PM</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create" size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>

          <View style={styles.scheduleItem}>
            <View style={styles.scheduleIcon}>
              <Ionicons name="alarm" size={24} color="#f59e0b" />
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleLabel}>Wake up</Text>
              <Text style={styles.scheduleTime}>7:00 AM</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create" size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sleep Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sleep Better Tips</Text>
        {sleepTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Relaxation Exercises */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pre-Sleep Relaxation</Text>

        <TouchableOpacity style={styles.exerciseCard}>
          <View style={styles.exerciseIcon}>
            <Ionicons name="headset" size={28} color="#3b82f6" />
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>Sleep Meditation</Text>
            <Text style={styles.exerciseDuration}>15 min guided session</Text>
          </View>
          <Ionicons name="play-circle" size={32} color="#6366f1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.exerciseCard}>
          <View style={styles.exerciseIcon}>
            <Ionicons name="musical-notes" size={28} color="#8b5cf6" />
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>Sleep Sounds</Text>
            <Text style={styles.exerciseDuration}>Ambient nature sounds</Text>
          </View>
          <Ionicons name="play-circle" size={32} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color="#6366f1" />
        <Text style={styles.infoText}>
          Getting 7-9 hours of quality sleep is essential for mental health and overall wellness
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  summaryCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: '#e5e7eb',
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  logButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  weekCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  weekValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  scheduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  scheduleTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  exerciseCard: {
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
  exerciseIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});

export default SleepScreen;
