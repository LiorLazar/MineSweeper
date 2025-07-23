# MineSweeper Game

A classic MineSweeper game implemented in vanilla JavaScript, HTML, and CSS.

## 🎮 Game Overview

MineSweeper is a puzzle game where the objective is to clear a rectangular board containing hidden mines without detonating any of them. The player clicks on cells to reveal them, and numbers indicate how many mines are adjacent to that cell.

## 🎯 Features

### Core Gameplay
- **Three Difficulty Levels:**
  - **Beginner:** 4x4 grid with 2 mines (2 lives)
  - **Medium:** 8x8 grid with 14 mines (3 lives)
  - **Expert:** 12x12 grid with 32 mines (3 lives)

### Game Mechanics
- **Lives System:** Players get multiple lives before game over
- **Timer:** Tracks elapsed time during gameplay
- **First Click Protection:** First click is always safe (mines are placed after first click)
- **Auto-reveal:** Empty cells automatically reveal adjacent cells
- **Right-click Flagging:** Mark suspected mine locations with flags (🚩)

### Special Features
- **Hints System:** 3 hints per game that reveal a 3x3 area around clicked cell for 1 second
- **Safe Click:** 3 safe clicks per game that highlight a random safe cell
- **Best Scores Table:** Tracks best completion times for each difficulty level
- **Visual Feedback:** Smiley face indicator showing game state (😃/😎/🤯)

## 🎨 Visual Elements

- **Mines:** 💣
- **Flags:** 🚩
- **Lives:** ♥️
- **Hints:** 💡
- **Numbers:** Display count of adjacent mines (1-8)

## 🚀 How to Play

1. **Start the Game:** Choose a difficulty level (Beginner, Medium, or Expert)
2. **Click Cells:** Left-click to reveal cells
3. **Flag Mines:** Right-click to place/remove flags on suspected mines
4. **Use Hints:** Click a hint button (💡) then click any cell to reveal surrounding area
5. **Safe Clicks:** Use safe click button to highlight a random safe cell
6. **Win Condition:** Reveal all non-mine cells
7. **Lose Condition:** Run out of lives by clicking mines

## 🏗️ Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── app.css         # Styling and layout
├── js/
│   ├── game.js         # Main game logic and state management
│   ├── mine.js         # Mine placement functionality
│   └── utils.js        # Utility functions and rendering
└── README.md           # This file
```

## 🔧 Technical Details

### Key Functions
- **Game Management:** `onInit()`, `startGame()`, `resetGame()`, `checkGameOver()`
- **Board Logic:** `buildBoard()`, `placeMines()`, `setMinesNegsCount()`
- **User Interactions:** `onCellClicked()`, `onCellMarked()`, `onHintClicked()`
- **Difficulty Settings:** `setDifficulty()` with three preset configurations
- **Special Features:** `safeClick()`, `revealHint()`, `expandShown()`

### Game State
The game maintains state through the `gGame` object:
```javascript
gGame = {
    isOn: true,           // Game active status
    shownCount: 0,        // Revealed cells count
    markedCount: 0,       // Flagged cells count
    secsPassed: 0,        // Elapsed time
    lives: 2-3,           // Remaining lives
    hints: 3,             // Available hints
    isHintActive: false,  // Hint mode status
    isFirstClick: true,   // First click protection
    level: {...},         // Current difficulty settings
    difficulty: 'Beginner', // Current difficulty name
    safeClicks: 3         // Available safe clicks
}
```

## 🎲 Game Rules

1. **Objective:** Clear all cells that don't contain mines
2. **Numbers:** Indicate how many mines are in the 8 adjacent cells
3. **Flags:** Use right-click to mark suspected mine locations
4. **Lives:** You lose a life when clicking on a mine
5. **Hints:** Temporarily reveal a 3x3 area (limited to 3 per game)
6. **Safe Clicks:** Get a hint about a safe cell to click (limited to 3 per game)
7. **Timer:** Starts on first click and tracks your completion time

## 📱 Browser Compatibility

- Works in all modern web browsers
- Uses vanilla JavaScript (no external dependencies)
- Responsive design for different screen sizes

## 👨‍💻 Author

Made by **Lior Lazar**

## 🚀 Getting Started

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Select your preferred difficulty level
4. Start playing!

No installation or build process required - just open and play!
