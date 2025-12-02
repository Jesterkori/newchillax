# Mental Wellness App - Student Mental Health & Wellness

A comprehensive mobile application designed to support student mental health and wellness through journaling, mindfulness exercises, sleep tracking, and an AI-powered chatbot companion.

## Features

### 1. Dashboard (Homepage)
- Daily wellness tips that rotate throughout the day
- Quick stats showing user streak and journal entries
- Quick access cards to all major features
- Weekly mood preview with analytics

### 2. Exercises Tab
- **Breathing Exercises**
  - 4-7-8 Breathing
  - Box Breathing
  - Deep Belly Breathing
- **Mindfulness Games**
  - Mindful Coloring
  - Memory Match
  - Calm Puzzle

### 3. Journal Tab
- Daily mood selector with 5 emotion options
- Rich text journaling interface
- Journal entry history with search
- Weekly and monthly analytics
- AI-powered mood pattern analysis (coming soon)

### 4. Sleep Monitor Tab
- Sleep duration tracking
- Sleep quality ratings
- Weekly sleep analytics
- Bedtime and wake-up schedule reminders
- Pre-sleep relaxation exercises
- Sleep improvement tips

### 5. AI Chatbot
- Constant floating button in bottom-right corner
- 24/7 wellness companion
- Context-aware responses
- Quick reply suggestions
- Supportive and empathetic conversations

## Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** React Navigation (Bottom Tabs)
- **State Management:** React Context API
- **Icons:** Expo Vector Icons (Ionicons)
- **UI:** Custom styled components with modern design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (installed globally)
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mental-wellness-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Scan the QR code with Expo Go (Android)
   - Scan the QR code with Camera app (iOS)

### Alternative Run Commands

```bash
# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web
npm run web
```

## Project Structure

```
mental-wellness-app/
├── src/
│   ├── screens/              # Main screen components
│   │   ├── DashboardScreen.js
│   │   ├── ExercisesScreen.js
│   │   ├── JournalScreen.js
│   │   └── SleepScreen.js
│   ├── components/           # Reusable components
│   │   ├── common/          # Common UI components
│   │   ├── chatbot/         # Chatbot component
│   │   │   └── ChatBot.js
│   │   ├── journal/         # Journal-specific components
│   │   ├── exercises/       # Exercise components
│   │   ├── dashboard/       # Dashboard components
│   │   └── sleep/           # Sleep tracking components
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js
│   ├── context/             # React Context for state
│   │   └── AppContext.js
│   ├── services/            # API services (future)
│   ├── utils/               # Utility functions
│   │   └── wellnessTips.js
│   └── assets/              # Images, icons, fonts
│       ├── images/
│       └── icons/
├── App.js                   # Main app entry point
├── package.json
└── README.md
```

## Team Collaboration

### Git Workflow

1. Clone the repository
2. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit:
```bash
git add .
git commit -m "Description of changes"
```

4. Push to GitHub:
```bash
git push origin feature/your-feature-name
```

5. Create a Pull Request on GitHub

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/mood-analytics`)
- `fix/` - Bug fixes (e.g., `fix/chatbot-crash`)
- `ui/` - UI improvements (e.g., `ui/dashboard-redesign`)
- `docs/` - Documentation updates

## Upcoming Features

- [ ] AI-powered mood analysis and insights
- [ ] Push notifications for reminders
- [ ] Data persistence with AsyncStorage
- [ ] Export journal entries as PDF
- [ ] Breathing exercise animations
- [ ] Meditation timer
- [ ] Community support groups
- [ ] Integration with fitness trackers
- [ ] Dark mode support
- [ ] Multi-language support

## Contributing

1. Pick a task from the Issues tab
2. Assign yourself to the issue
3. Create a feature branch
4. Implement the feature
5. Test thoroughly
6. Submit a pull request

## Testing

Before submitting a PR, please ensure:
- [ ] App runs without crashes
- [ ] All new features work as expected
- [ ] No console errors or warnings
- [ ] UI is responsive on different screen sizes
- [ ] Navigation works correctly

## Design System

### Colors
- Primary: `#6366f1` (Indigo)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Danger: `#ef4444` (Red)
- Gray: `#6b7280`
- Background: `#f9fafb`

### Typography
- Heading: Bold, 20-28px
- Body: Regular, 14-16px
- Small: Regular, 12-14px

## License

This project is created for educational purposes as part of a hackathon.

## Support

For any questions or issues, please contact the team or create an issue in the repository.

## Acknowledgments

- Built with React Native and Expo
- Icons by Expo Vector Icons
- Designed for student wellness and mental health support

---

**Made with care for student mental wellness**
