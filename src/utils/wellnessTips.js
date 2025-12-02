export const wellnessTips = [
  // General wellness
  "Take a 5-minute breathing break every hour",
  "Drink water regularly throughout the day",
  "Step outside for some fresh air",
  "Practice gratitude - write 3 things you're thankful for",
  "Stretch your body for better circulation",
  "Connect with a friend or family member",
  "Listen to calming music",
  "Take a short walk to clear your mind",

  // Study-specific tips
  "Take regular study breaks using the Pomodoro technique",
  "Create a dedicated study space free from distractions",
  "Break large tasks into smaller, manageable chunks",
  "Reward yourself after completing study goals",
  "Study in natural light when possible",

  // Mental health
  "It's okay to ask for help when you need it",
  "Celebrate small victories and progress",
  "Practice self-compassion during difficult times",
  "Set healthy boundaries with work and study",
  "Limit social media use before bedtime",

  // Physical wellness
  "Get at least 7-9 hours of sleep each night",
  "Eat regular, balanced meals throughout the day",
  "Exercise for at least 20 minutes daily",
  "Limit caffeine intake, especially in the evening",
  "Practice good posture while studying or working",

  // Mindfulness
  "Focus on the present moment",
  "Notice five things around you right now",
  "Take three deep breaths before starting a task",
  "Practice body scan meditation before sleep",
  "Express your feelings through journaling",
];

export const getRandomTip = () => {
  const randomIndex = Math.floor(Math.random() * wellnessTips.length);
  return wellnessTips[randomIndex];
};

export const getTipOfTheDay = () => {
  const today = new Date().getDate();
  const tipIndex = today % wellnessTips.length;
  return wellnessTips[tipIndex];
};
