import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import JournalScreen from '../screens/JournalScreen';
import SleepScreen from '../screens/SleepScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Exercises') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            } else if (route.name === 'Journal') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Sleep') {
              iconName = focused ? 'moon' : 'moon-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="Exercises"
          component={ExercisesScreen}
          options={{ title: 'Exercises' }}
        />
        <Tab.Screen
          name="Journal"
          component={JournalScreen}
          options={{ title: 'Journal' }}
        />
        <Tab.Screen
          name="Sleep"
          component={SleepScreen}
          options={{ title: 'Sleep' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
