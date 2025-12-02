# Team Setup Guide - Quick Start

## For Team Members

### Step 1: Install Prerequisites

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose LTS version
   - Verify: `node --version` and `npm --version`

2. **Install Expo Go on your phone**
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

3. **Install Git** (if not already installed)
   - Download from: https://git-scm.com/

### Step 2: Clone the Project

```bash
# Clone from GitHub (once you push it)
git clone <YOUR_GITHUB_REPO_URL>
cd mental-wellness-app

# OR if already cloned
cd mental-wellness-app
git pull origin main
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native
- Expo
- React Navigation
- All other dependencies

### Step 4: Start Development Server

```bash
npm start
```

This will:
- Start the Metro bundler
- Show a QR code in terminal
- Open Expo DevTools in browser

### Step 5: Run on Your Phone

1. Make sure your phone and computer are on the **same WiFi network**
2. Open Expo Go app on your phone
3. Scan the QR code from the terminal
4. Wait for the app to load

## Working on Features

### Before Starting Work

```bash
# Make sure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Create your feature branch
git checkout -b feature/your-feature-name
```

### While Working

```bash
# Check what files changed
git status

# See your changes
git diff

# Add files to commit
git add .

# Commit your changes
git commit -m "Description of what you did"
```

### After Finishing

```bash
# Push your branch
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub!

## Feature Division Suggestions

### Person 1: Data & Analytics
- Implement AsyncStorage for data persistence
- Create chart components for mood/sleep analytics
- Build analytics calculation functions
- Test data flow

**Files to work on:**
- `src/utils/storage.js` (new)
- `src/components/common/Chart.js` (new)
- `src/context/AppContext.js` (enhance)
- `src/screens/JournalScreen.js` (add charts)

### Person 2: Exercises & Animations
- Build breathing exercise animations
- Create interactive mindfulness games
- Add meditation timer
- Sound/haptic feedback

**Files to work on:**
- `src/components/exercises/BreathingAnimation.js` (new)
- `src/components/exercises/MindfulnessGame.js` (new)
- `src/components/exercises/MeditationTimer.js` (new)
- `src/screens/ExercisesScreen.js` (enhance)

### Person 3: AI Chatbot Enhancement
- Improve chatbot responses
- Add context awareness from user data
- Implement suggestion system
- Add conversation history

**Files to work on:**
- `src/components/chatbot/ChatBot.js` (enhance)
- `src/services/chatbotService.js` (new)
- `src/utils/chatbotResponses.js` (new)

### Person 4: UI/UX Polish & Features
- Add notifications system
- Create onboarding screens
- Improve overall UI/UX
- Add settings screen
- Dark mode support

**Files to work on:**
- `src/screens/OnboardingScreen.js` (new)
- `src/screens/SettingsScreen.js` (new)
- `src/utils/notifications.js` (new)
- All screen files (polish)

## Common Issues & Solutions

### Issue: Metro bundler won't start
**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Changes not showing in app
**Solution:**
- Shake your phone
- Press "Reload" in Expo Go
- Or press `r` in terminal

### Issue: Dependencies missing
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: Can't connect to dev server
**Solution:**
- Make sure phone and computer are on same WiFi
- Try using tunnel mode: `npm start -- --tunnel`
- Check firewall settings

## Testing Checklist

Before pushing code:
- [ ] App starts without errors
- [ ] Your feature works as expected
- [ ] No console errors/warnings
- [ ] Navigation still works
- [ ] Existing features still work
- [ ] UI looks good on your device

## Communication

- Use GitHub Issues for tasks
- Use Pull Requests for code review
- Comment your code clearly
- Ask questions if stuck!

## File Structure Quick Reference

```
src/
├── screens/          # Main app screens
├── components/       # Reusable components
│   ├── common/      # Shared components
│   ├── chatbot/     # Chatbot components
│   ├── exercises/   # Exercise components
│   ├── journal/     # Journal components
│   └── sleep/       # Sleep components
├── navigation/      # App navigation
├── context/         # Global state
├── services/        # API & external services
├── utils/           # Helper functions
└── assets/          # Images, icons, fonts
```

## Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [React Hooks](https://react.dev/reference/react)

## Need Help?

1. Check this document
2. Look at existing code examples
3. Search GitHub Issues
4. Ask the team
5. Google the error message

Good luck and happy coding! 🚀
