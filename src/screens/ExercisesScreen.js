import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExercisesScreen = () => {
  const [activeTab, setActiveTab] = useState('breathing');

  const breathingExercises = [
    { id: 1, name: '4-7-8 Breathing', duration: '5 min', icon: 'time', color: '#3b82f6' },
    { id: 2, name: 'Box Breathing', duration: '4 min', icon: 'square', color: '#8b5cf6' },
    { id: 3, name: 'Deep Belly Breathing', duration: '6 min', icon: 'water', color: '#06b6d4' },
  ];

  const games = [
    { id: 1, name: 'Mindful Coloring', duration: '10 min', icon: 'color-palette', color: '#f59e0b' },
    { id: 2, name: 'Memory Match', duration: '5 min', icon: 'grid', color: '#ec4899' },
    { id: 3, name: 'Calm Puzzle', duration: '8 min', icon: 'extension-puzzle', color: '#10b981' },
  ];

  const renderExerciseCard = (exercise) => (
    <TouchableOpacity key={exercise.id} style={styles.exerciseCard}>
      <View style={[styles.iconContainer, { backgroundColor: exercise.color + '20' }]}>
        <Ionicons name={exercise.icon} size={32} color={exercise.color} />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.durationContainer}>
          <Ionicons name="time-outline" size={16} color="#6b7280" />
          <Text style={styles.duration}>{exercise.duration}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'breathing' && styles.activeTab]}
          onPress={() => setActiveTab('breathing')}
        >
          <Ionicons
            name="water"
            size={20}
            color={activeTab === 'breathing' ? '#fff' : '#6b7280'}
          />
          <Text style={[styles.tabText, activeTab === 'breathing' && styles.activeTabText]}>
            Breathing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'games' && styles.activeTab]}
          onPress={() => setActiveTab('games')}
        >
          <Ionicons
            name="game-controller"
            size={20}
            color={activeTab === 'games' ? '#fff' : '#6b7280'}
          />
          <Text style={[styles.tabText, activeTab === 'games' && styles.activeTabText]}>
            Games
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'breathing' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Breathing Exercises</Text>
              <Text style={styles.subtitle}>
                Take a moment to relax and focus on your breathing
              </Text>
            </View>

            {breathingExercises.map(renderExerciseCard)}

            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={24} color="#6366f1" />
              <Text style={styles.infoText}>
                Regular breathing exercises can reduce stress and improve focus
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'games' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Mindfulness Games</Text>
              <Text style={styles.subtitle}>
                Fun activities to improve your mental wellness
              </Text>
            </View>

            {games.map(renderExerciseCard)}

            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={24} color="#6366f1" />
              <Text style={styles.infoText}>
                Play mindfulness games to boost your mood and reduce anxiety
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
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

export default ExercisesScreen;
