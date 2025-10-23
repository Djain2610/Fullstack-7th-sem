# 🔓 Code Breaker – The Array Heist

An interactive educational game that teaches array operations through an engaging hacking-themed interface. Players manipulate a digital code array to find hidden password patterns while learning fundamental computer science concepts.

## 🎮 Game Overview

You are a hacker in training, trying to break into a secure system by manipulating a digital code array. The vault's password is hidden in a pattern within the array.

### Mission Objectives:
- ✅ Insert digits to build potential codes
- ✅ Delete wrong digits to fix mistakes  
- ✅ Search for secret patterns to unlock clues
- ✅ Crack the code before time runs out!

## 🚀 Features

### Core Gameplay
- **Visual Array Display**: Interactive 10-cell array with hover effects
- **Insert Operation**: Add numbers at specific indices with right-shift animation
- **Delete Operation**: Remove numbers with left-shift animation
- **Pattern Search**: Find subarrays with visual highlighting
- **Quick Insert**: Click empty cells for instant random number insertion

### Educational Elements
- **Array Bounds Validation**: Learn proper index handling
- **Linear Search Algorithm**: Visual pattern matching demonstration
- **Array Shifting Logic**: Understand insertion/deletion mechanics
- **Progressive Difficulty**: Increasing pattern complexity

### Interactive Features
- **Real-time Timer**: 60-second countdown with visual urgency
- **Scoring System**: Points for operations and time bonuses
- **Level Progression**: 2-digit → 4-digit patterns
- **Sound Effects**: Audio feedback for all operations
- **Visual Animations**: Smooth transitions and effects

## 🎯 How to Play

### Basic Operations

1. **Insert a Number**:
   - Enter index (0-9) and value (0-9)
   - Click "Insert" or press Enter
   - Elements shift right to make space

2. **Delete a Number**:
   - Enter index (0-9) 
   - Click "Delete"
   - Elements shift left to fill gap

3. **Search for Pattern**:
   - Enter pattern like "2,1,4"
   - Click "Search"
   - Watch visual highlighting as it searches

4. **Quick Insert**:
   - Click any empty cell
   - Random number inserted instantly
   - Lower score reward (5 points)

### Scoring System
- **Manual Insert**: 10 points
- **Delete/Quick Insert**: 5 points  
- **Successful Search**: 20 points
- **Time Bonus**: Remaining time × 2 points
- **Level Completion**: Pattern found bonus

### Level Progression
- **Level 1**: 2-digit patterns
- **Level 2**: 3-digit patterns
- **Level 3+**: 4-digit patterns

## 🛠️ Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+**: Object-oriented game logic with async/await

### Key Features
- **Responsive Design**: Works on desktop and mobile
- **Audio Context API**: Web-based sound effects
- **CSS Animations**: Smooth transitions and visual feedback
- **Event Handling**: Keyboard shortcuts and click interactions
- **Timer Management**: Precise countdown with visual indicators

### File Structure
```
code-breaker-game/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Game logic and interactions
└── README.md           # This documentation
```

## 🎨 Design Philosophy

### Visual Design
- **Hacker Aesthetic**: Dark theme with Matrix green accents
- **Subtle Animations**: Professional feel without being distracting
- **Clean Typography**: Courier New for terminal authenticity
- **Minimal UI**: Focus on functionality over flashy effects

### User Experience
- **Intuitive Controls**: Clear labels and helpful tooltips
- **Visual Feedback**: Immediate response to all actions
- **Progressive Disclosure**: Features revealed as needed
- **Accessibility**: Keyboard navigation and clear contrast

## 🚀 Getting Started

### Local Development
1. Clone the repository
2. Navigate to the `code-breaker-game` folder
3. Open `index.html` in your browser
4. Or run a local server: `python -m http.server 8000`

### Browser Compatibility
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🎓 Educational Value

This game teaches fundamental computer science concepts:

- **Array Data Structures**: Understanding indices and elements
- **Algorithm Complexity**: Linear search time complexity
- **Memory Management**: Array shifting operations
- **Problem Solving**: Pattern recognition and matching
- **Time Management**: Working under pressure

## 🔧 Customization

### Easy Modifications
- **Pattern Length**: Adjust `patternLength` in `generateSecretPattern()`
- **Time Limit**: Change `maxTime` in constructor
- **Scoring**: Modify point values in operation methods
- **Visual Theme**: Update CSS color variables
- **Sound Effects**: Adjust frequencies in `playSound()`

## 📱 Responsive Design

The game adapts to different screen sizes:
- **Desktop**: Full layout with side-by-side panels
- **Tablet**: Stacked layout with adjusted spacing
- **Mobile**: Compact design with touch-friendly controls

## 🎵 Audio Features

- **Insert Sound**: High-frequency beep (800Hz)
- **Delete Sound**: Low-frequency tone (400Hz)
- **Search Sound**: Medium-frequency pulse (600Hz)
- **Success Sound**: Rising tone (1000Hz)
- **Victory Fanfare**: Musical chord progression
- **Error Sound**: Low buzz (200Hz)

## 🏆 Achievements

Track your progress:
- Complete levels quickly for time bonuses
- Master pattern recognition
- Achieve high scores through efficient operations
- Progress through increasing difficulty levels

## 🤝 Contributing

Feel free to enhance the game:
- Add new game modes
- Implement additional animations
- Create new sound effects
- Improve accessibility features
- Add multiplayer functionality

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Hacking!** 🔓✨

*Break the code, learn the concepts, and master the array!*
