# Contributing to Mental Wellness App

Thank you for contributing to our mental wellness app! This guide will help you get started.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Development Workflow

### 1. Setting Up Your Environment

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/mental-wellness-app.git
cd mental-wellness-app

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/mental-wellness-app.git

# Install dependencies
npm install

# Start development server
npm start
```

### 2. Creating a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `ui/` - UI improvements
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

### 3. Making Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Keep commits focused and atomic
- Write descriptive commit messages

### 4. Commit Messages

Use clear, descriptive commit messages:

```
Good examples:
- "Add mood analytics chart to journal screen"
- "Fix chatbot crash when sending empty message"
- "Update dashboard UI with better spacing"

Bad examples:
- "Fixed stuff"
- "Updates"
- "Changes"
```

### 5. Testing Your Changes

Before submitting:
- [ ] Run the app on both iOS and Android (if possible)
- [ ] Test all affected features
- [ ] Check for console errors
- [ ] Verify UI looks good on different screen sizes
- [ ] Make sure navigation still works

### 6. Submitting a Pull Request

```bash
# Make sure your branch is up to date
git fetch upstream
git rebase upstream/main

# Push your changes
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what was changed and why
- Screenshots (for UI changes)
- Any relevant issue numbers

## Code Style Guidelines

### JavaScript/React Native

```javascript
// Use functional components with hooks
import React, { useState } from 'react';

const MyComponent = () => {
  const [state, setState] = useState(initialValue);

  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

// Use meaningful variable names
const userMoodHistory = []; // Good
const arr = []; // Bad

// Use destructuring
const { name, age } = user; // Good
const name = user.name; // Less preferred

// Use arrow functions
const handlePress = () => {
  // Handle logic
};
```

### Styling

```javascript
// Keep styles at the bottom of the file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  // Use meaningful style names
  headerTitle: { // Good
    fontSize: 20,
    fontWeight: '600',
  },
  txt: { // Bad - unclear
    fontSize: 20,
  },
});
```

## Project Structure

When adding new files, follow this structure:

```
src/
├── screens/          # Full-screen components
├── components/       # Reusable components
│   ├── common/      # Shared across app
│   └── [feature]/   # Feature-specific
├── navigation/      # Navigation config
├── context/         # Global state
├── services/        # API calls, external services
├── utils/           # Helper functions
└── assets/          # Images, fonts, etc.
```

## Feature Areas for Contribution

### High Priority
- [ ] Implement data persistence (AsyncStorage)
- [ ] Add breathing exercise animations
- [ ] Create mood analytics charts
- [ ] Implement push notifications
- [ ] Add meditation timer

### Medium Priority
- [ ] Dark mode support
- [ ] Export journal entries
- [ ] Add more mindfulness games
- [ ] Improve chatbot responses
- [ ] Sleep tracking graphs

### Nice to Have
- [ ] Social features
- [ ] Community support
- [ ] Fitness tracker integration
- [ ] Multi-language support
- [ ] Accessibility improvements

## Questions?

If you have questions:
1. Check existing issues and PRs
2. Read the README.md
3. Ask in the discussions section
4. Reach out to team members

## Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Give constructive feedback
- Focus on the mental health mission
- Have fun and be creative!

Thank you for contributing to student mental wellness!
