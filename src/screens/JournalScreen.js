import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JournalScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [activeTab, setActiveTab] = useState('write');

  const moods = [
    { id: 1, emoji: '😊', label: 'Happy', color: '#10b981' },
    { id: 2, emoji: '😌', label: 'Calm', color: '#3b82f6' },
    { id: 3, emoji: '😐', label: 'Neutral', color: '#6b7280' },
    { id: 4, emoji: '😔', label: 'Sad', color: '#8b5cf6' },
    { id: 5, emoji: '😰', label: 'Anxious', color: '#f59e0b' },
  ];

  const journalEntries = [
    { id: 1, date: '2025-12-01', mood: '😊', preview: 'Had a great day today...', moodLabel: 'Happy' },
    { id: 2, date: '2025-11-30', mood: '😌', preview: 'Feeling peaceful after...', moodLabel: 'Calm' },
    { id: 3, date: '2025-11-29', mood: '😐', preview: 'Today was okay, nothing...', moodLabel: 'Neutral' },
  ];

  const renderWriteTab = () => (
    <ScrollView style={styles.content}>
      {/* Mood Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodButton,
                selectedMood === mood.id && {
                  borderColor: mood.color,
                  borderWidth: 3,
                  backgroundColor: mood.color + '20'
                },
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Journal Entry */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Journal</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write about your day, thoughts, and feelings..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={10}
          value={journalEntry}
          onChangeText={setJournalEntry}
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </View>

      {/* Tips */}
      <View style={styles.tipCard}>
        <Ionicons name="bulb" size={20} color="#fbbf24" />
        <Text style={styles.tipText}>
          Writing regularly can help you process emotions and track your mental health journey
        </Text>
      </View>
    </ScrollView>
  );

  const renderHistoryTab = () => (
    <ScrollView style={styles.content}>
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Past Entries</Text>
          <TouchableOpacity style={styles.analyticsButton}>
            <Ionicons name="bar-chart" size={18} color="#6366f1" />
            <Text style={styles.analyticsText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {journalEntries.map((entry) => (
          <TouchableOpacity key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryMood}>{entry.mood}</Text>
              <View style={styles.entryInfo}>
                <Text style={styles.entryDate}>{entry.date}</Text>
                <Text style={styles.entryMoodLabel}>{entry.moodLabel}</Text>
              </View>
            </View>
            <Text style={styles.entryPreview}>{entry.preview}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" style={styles.entryArrow} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Analytics Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Mood Summary</Text>
        <View style={styles.analyticsCard}>
          <View style={styles.analyticsRow}>
            <Text style={styles.analyticsLabel}>Most Common Mood:</Text>
            <View style={styles.analyticsBadge}>
              <Text style={styles.analyticsBadgeText}>😊 Happy</Text>
            </View>
          </View>
          <View style={styles.analyticsRow}>
            <Text style={styles.analyticsLabel}>Entries this week:</Text>
            <Text style={styles.analyticsValue}>5 entries</Text>
          </View>
          <TouchableOpacity style={styles.fullAnalyticsButton}>
            <Text style={styles.fullAnalyticsText}>View Full Analytics</Text>
            <Ionicons name="arrow-forward" size={16} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'write' && styles.activeTab]}
          onPress={() => setActiveTab('write')}
        >
          <Ionicons
            name="create"
            size={20}
            color={activeTab === 'write' ? '#fff' : '#6b7280'}
          />
          <Text style={[styles.tabText, activeTab === 'write' && styles.activeTabText]}>
            Write
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Ionicons
            name="time"
            size={20}
            color={activeTab === 'history' ? '#fff' : '#6b7280'}
          />
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'write' ? renderWriteTab() : renderHistoryTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#fbbf24',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  analyticsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
  },
  analyticsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  entryCard: {
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
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryMood: {
    fontSize: 32,
    marginRight: 12,
  },
  entryInfo: {
    flex: 1,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  entryMoodLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  entryPreview: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  entryArrow: {
    position: 'absolute',
    right: 16,
    top: '50%',
  },
  analyticsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  analyticsLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  analyticsBadge: {
    backgroundColor: '#dcfce7',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  analyticsBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
  },
  analyticsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  fullAnalyticsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
    paddingVertical: 12,
  },
  fullAnalyticsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
});

export default JournalScreen;
