# Quick Start - Mental Wellness App

## What You Have Now

A fully functional React Native mobile app with:
- 4 main screens (Dashboard, Exercises, Journal, Sleep)
- Floating AI chatbot
- Modern UI with bottom tab navigation
- Complete project structure for team collaboration
- Git repository ready to push

## Next Steps (Do This Now!)

### 1. Push to GitHub

```bash
# Create a new repository on GitHub first (don't initialize with README)
# Then run these commands:

cd mental-wellness-app

# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin master
```

### 2. Test the App

```bash
# Start the app
npm start

# Scan QR code with Expo Go app on your phone
```

### 3. Share with Team

Send your team members:
1. GitHub repository link
2. Link to [TEAM_SETUP.md](TEAM_SETUP.md) file
3. Assign features from [TEAM_SETUP.md](TEAM_SETUP.md)

## What's Included

### Screens
- **Dashboard** - Home page with tips, stats, and quick actions
- **Exercises** - Breathing exercises and mindfulness games
- **Journal** - Mood tracking and journal entries with history
- **Sleep** - Sleep tracking and analytics

### Components
- **ChatBot** - Floating AI companion in bottom-right corner
- **Navigation** - Bottom tab navigation
- **Context** - Global state management ready

### Documentation
- [README.md](README.md) - Full project documentation
- [TEAM_SETUP.md](TEAM_SETUP.md) - Team member setup guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
- [HACKATHON_FEATURES.md](HACKATHON_FEATURES.md) - What makes this special

## Testing Checklist

Try these features:
- [ ] Open app - see dashboard
- [ ] Check daily wellness tip
- [ ] Tap chatbot icon - chat interface opens
- [ ] Navigate to Exercises tab
- [ ] Switch between Breathing and Games
- [ ] Go to Journal tab
- [ ] Select a mood
- [ ] Switch to History tab
- [ ] Visit Sleep tab
- [ ] All navigation works smoothly

## Common First Commands

```bash
# Start development server
npm start

# Clear cache if needed
npm start -- --reset-cache

# Check what's in git
git log --oneline

# See project files
ls -la src/
```

## Project Features Highlight

1. **Mobile-First** - Built for React Native, not just a web port
2. **AI Chatbot** - Always accessible, context-aware
3. **Complete Analytics** - Track mood, sleep, journal patterns
4. **Gamification** - Streaks, progress tracking
5. **Student-Focused** - Tips and features designed for students

## Repository Structure

```
mental-wellness-app/
├── src/
│   ├── screens/        # 4 main screens
│   ├── components/     # Reusable components
│   ├── navigation/     # Tab navigation
│   ├── context/        # Global state
│   └── utils/          # Helpers
├── App.js             # Entry point
└── Documentation files
```

## For Hackathon Presentation

Key points to mention:
1. Mobile app (not web) - better for students
2. Floating chatbot - always accessible
3. Comprehensive tracking - mood + sleep + journal
4. Analytics ready for AI insights
5. Clean, scalable codebase

## If Something Goes Wrong

```bash
# Reset everything
rm -rf node_modules
npm install
npm start -- --reset-cache

# Check for errors
npm run lint  # if you add eslint later
```

## Next Features to Add

Priority order:
1. Data persistence (AsyncStorage)
2. Breathing exercise animations
3. Mood analytics charts
4. Improved AI chatbot
5. Push notifications

## Get Help

- Check [TEAM_SETUP.md](TEAM_SETUP.md) for common issues
- Look at existing code for examples
- React Native docs: https://reactnative.dev/
- Expo docs: https://docs.expo.dev/

---

You're all set! Push to GitHub and share with your team! 🚀
