import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const moodConfig = {
  happy: { emoji: '😊', color: '#fbbf24', label: 'Happy' },
  calm: { emoji: '😌', color: '#60a5fa', label: 'Calm' },
  sad: { emoji: '😢', color: '#818cf8', label: 'Sad' },
  anxious: { emoji: '😰', color: '#f87171', label: 'Anxious' },
  energetic: { emoji: '⚡', color: '#fb923c', label: 'Energetic' }
};

const MoodButton = ({ mood, selected, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true })
      ]).start();
    }
  }, [selected]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.moodBtn}>
      <Animated.View style={[
        styles.moodBtnInner,
        selected && styles.moodBtnSelected,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <Text style={styles.moodEmoji}>{moodConfig[mood].emoji}</Text>
        <Text style={styles.moodLabel}>{moodConfig[mood].label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const ProgressBar = ({ percentage, color }) => (
  <View style={styles.progressBar}>
    <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
  </View>
);

const StatItem = ({ mood, count, total }) => {
  const percentage = total > 0 ? (count / total * 100) : 0;
  return (
    <View style={styles.statItem}>
      <View style={styles.statHeader}>
        <View style={styles.statLabel}>
          <Text style={styles.statEmoji}>{moodConfig[mood].emoji}</Text>
          <Text style={styles.statText}>{moodConfig[mood].label}</Text>
        </View>
        <Text style={styles.statValue}>{count} ({percentage.toFixed(1)}%)</Text>
      </View>
      <ProgressBar percentage={percentage} color={moodConfig[mood].color} />
    </View>
  );
};

const EntryItem = ({ entry, onPlayAudio }) => {
  const date = new Date(entry.date);
  return (
    <View style={[styles.entryItem, { borderLeftColor: moodConfig[entry.mood].color }]}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryEmoji}>{moodConfig[entry.mood].emoji}</Text>
        <Text style={styles.entryMood}>{entry.mood}</Text>
        <Text style={styles.entryDate}>
          {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <Text style={styles.entryText}>
        {entry.text || 'Voice note only'}
      </Text>
      {entry.hasAudio && (
        <TouchableOpacity 
          style={styles.audioBtn}
          onPress={() => onPlayAudio(entry.id)}
        >
          <Text style={styles.audioBtnText}>🔊 Play Audio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('journal');
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState([]);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);

  useEffect(() => {
    loadEntries();
    setupAudio();
    
    return () => {
      if (recording) recording.stopAndUnloadAsync();
      if (sound) sound.unloadAsync();
    };
  }, []);

  const setupAudio = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (err) {
      console.log('Audio setup error:', err);
    }
  };

  const loadEntries = async () => {
    try {
      const stored = await AsyncStorage.getItem('journalEntries');
      if (stored) setEntries(JSON.parse(stored));
    } catch (err) {
      console.log('Error loading entries:', err);
    }
  };

  const saveEntries = async (newEntries) => {
    try {
      await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
      setEntries(newEntries);
    } catch (err) {
      console.log('Error saving entries:', err);
    }
  };

  const toggleRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri);
      setRecording(null);
    } else {
      try {
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
      } catch (err) {
        Alert.alert('Error', 'Failed to start recording');
      }
    }
  };

  const playRecording = async () => {
    if (!recordingUri) return;
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(newSound);
      await newSound.playAsync();
    } catch (err) {
      Alert.alert('Error', 'Failed to play recording');
    }
  };

  const clearAudio = () => {
    setRecordingUri(null);
    if (sound) sound.unloadAsync();
    setSound(null);
  };

  const saveEntry = async () => {
    if (!selectedMood) {
      Alert.alert('Select Mood', 'Please select your mood');
      return;
    }
    
    if (!journalText.trim() && !recordingUri) {
      Alert.alert('Add Content', 'Please write something or record a voice note');
      return;
    }

    const entry = {
      id: Date.now(),
      mood: selectedMood,
      text: journalText.trim(),
      date: new Date().toISOString(),
      hasAudio: !!recordingUri
    };

    if (recordingUri) {
      await AsyncStorage.setItem(`audio_${entry.id}`, recordingUri);
    }

    const newEntries = [...entries, entry];
    await saveEntries(newEntries);

    Alert.alert('Success', 'Entry saved successfully!');
    setJournalText('');
    setSelectedMood(null);
    clearAudio();
  };

  const playEntryAudio = async (entryId) => {
    try {
      const uri = await AsyncStorage.getItem(`audio_${entryId}`);
      if (uri) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        await newSound.playAsync();
      }
    } catch (err) {
      Alert.alert('Error', 'Audio not found');
    }
  };

  const getMoodStats = () => {
    const stats = {};
    Object.keys(moodConfig).forEach(mood => stats[mood] = 0);
    entries.forEach(entry => stats[entry.mood]++);
    return stats;
  };

  const getInsights = () => {
    const insights = [];
    const recent = entries.slice(-7);
    
    if (entries.length === 0) {
      return ['Start journaling to see AI-powered insights!'];
    }

    const anxiousCount = recent.filter(e => e.mood === 'anxious').length;
    const sadCount = recent.filter(e => e.mood === 'sad').length;
    const happyCount = recent.filter(e => e.mood === 'happy').length;
    const calmCount = recent.filter(e => e.mood === 'calm').length;

    if (happyCount >= 4) {
      insights.push('🌟 You\'ve been feeling happy frequently this week!');
    }
    if (calmCount >= 3) {
      insights.push('🧘 You\'re experiencing a lot of calm lately.');
    }
    if (anxiousCount >= 3) {
      insights.push('⚠️ You\'ve reported feeling anxious frequently. Consider relaxation techniques.');
    }
    if (sadCount >= 4) {
      insights.push('💙 You\'ve been feeling sad often. Reach out for support if needed.');
    }
    if (entries.length >= 7) {
      insights.push(`🎉 Milestone: You've logged ${entries.length} entries!`);
    }

    return insights.length > 0 ? insights : ['Keep journaling to see insights!'];
  };

  const renderJournal = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How are you feeling?</Text>
        <View style={styles.moodGrid}>
          {Object.keys(moodConfig).map(mood => (
            <MoodButton
              key={mood}
              mood={mood}
              selected={selectedMood === mood}
              onPress={() => setSelectedMood(mood)}
            />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Write your thoughts</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="What's on your mind today?"
          value={journalText}
          onChangeText={setJournalText}
        />
        
        <View style={styles.voiceControls}>
          <TouchableOpacity 
            style={[styles.voiceBtn, recording && styles.voiceBtnRecording]}
            onPress={toggleRecording}
          >
            <Text style={styles.voiceBtnText}>
              {recording ? '⏹️ Stop' : '🎤 Record'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.voiceBtn, !recordingUri && styles.voiceBtnDisabled]}
            onPress={playRecording}
            disabled={!recordingUri}
          >
            <Text style={styles.voiceBtnText}>▶️ Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.voiceBtn, !recordingUri && styles.voiceBtnDisabled]}
            onPress={clearAudio}
            disabled={!recordingUri}
          >
            <Text style={styles.voiceBtnText}>🗑️ Clear</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.saveBtn} onPress={saveEntry}>
          <Text style={styles.saveBtnText}>Save Entry</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAnalytics = () => {
    const stats = getMoodStats();
    const insights = getInsights();
    
    return (
      <ScrollView style={styles.tabContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Mood Statistics</Text>
          {Object.entries(stats).map(([mood, count]) => (
            <StatItem key={mood} mood={mood} count={count} total={entries.length} />
          ))}
          <View style={styles.totalEntries}>
            <Text style={styles.totalLabel}>Total Entries</Text>
            <Text style={styles.totalCount}>{entries.length}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🧠 AI-Powered Insights</Text>
          {insights.map((insight, idx) => (
            <View key={idx} style={styles.insightCard}>
              <Text style={styles.insightText}>{insight}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderHistory = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Journal History</Text>
        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No entries yet</Text>
            <Text style={styles.emptySubtext}>Start journaling to see your history</Text>
          </View>
        ) : (
          [...entries].reverse().map(entry => (
            <EntryItem 
              key={entry.id} 
              entry={entry} 
              onPlayAudio={playEntryAudio}
            />
          ))
        )}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧠 Mental Wellness Journal</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'journal' && styles.tabActive]}
          onPress={() => setActiveTab('journal')}
        >
          <Text style={[styles.tabText, activeTab === 'journal' && styles.tabTextActive]}>
            📝 Journal
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'analytics' && styles.tabActive]}
          onPress={() => setActiveTab('analytics')}
        >
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.tabTextActive]}>
            📊 Analytics
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            📅 History
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'journal' && renderJournal()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'history' && renderHistory()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 12,
    padding: 5,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  tabTextActive: {
    color: 'white',
  },
  tabContent: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  moodBtn: {
    width: (width - 80) / 3,
  },
  moodBtnInner: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  moodBtnSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  voiceControls: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  voiceBtn: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  voiceBtnRecording: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },
  voiceBtnDisabled: {
    opacity: 0.5,
  },
  voiceBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  saveBtn: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statItem: {
    marginBottom: 20,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statEmoji: {
    fontSize: 24,
  },
  statText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  totalEntries: {
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  totalCount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#3b82f6',
  },
  insightCard: {
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  insightText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  entryItem: {
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  entryEmoji: {
    fontSize: 24,
  },
  entryMood: {
    fontWeight: '600',
    color: '#334155',
    textTransform: 'capitalize',
    flex: 1,
  },
  entryDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  entryText: {
    color: '#475569',
    lineHeight: 22,
    marginBottom: 10,
  },
  audioBtn: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  audioBtnText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
  },
});