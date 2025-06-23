# Wedding Board Games Web App

A simple, elegant web app for displaying board games available at your wedding reception with real-time availability tracking.

## 🎯 Features

- **Real-Time Availability**: Mark games as "being played" so guests know what's available
- **Smart Filtering**: View all games, only available games, or games currently in progress
- **Game Details**: Title, type, player count, difficulty, and duration
- **Easy Instructions**: Direct links to YouTube how-to-play videos
- **Visual Indicators**: Games being played have a special glow effect and status banner
- **Responsive Design**: Works perfectly on phones, tablets, and desktops
- **Wedding Theme**: Beautiful gradient background with elegant styling
- **Azure Native**: Built for Azure Static Web Apps deployment

## 🎲 Game Information Displayed

For each board game:
- **Title**: The name of the game
- **Game Type**: Genre/category (e.g., "Party/Word", "Strategy")
- **Player Count**: How many people can play (e.g., "2-8 players")
- **Difficulty**: Easy, Medium, or Hard
- **Duration**: Estimated play time (e.g., "15-30 min")
- **How to Play**: Link to YouTube instructional video
- **Playing Status**: Visual indicator if currently being played

## 🚀 Interactive Features

- **Start Playing**: Click to mark a game as in progress
- **Mark as Available**: Click to mark a game as available again
- **Filter Views**: 
  - 🎲 All Games - See everything
  - ✅ Available - Only games ready to play
  - 🎮 In Progress - See what's currently being played

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

### Customizing Your Games

Edit the file `src/data/games.ts` to add your own board games:

```typescript
export const boardGames: BoardGame[] = [
  {
    id: '1',
    title: 'Your Game Name',
    gameType: 'Strategy', // or 'Party', 'Card Game', etc.
    playerCount: '2-4 players',
    difficulty: 'Medium', // 'Easy', 'Medium', or 'Hard'
    duration: '30-45 min',
    instructionsUrl: 'https://youtube.com/watch?v=...', // Optional
    isBeingPlayed: false // Will be managed by the app
  },
  // Add more games...
];
```

## Azure Deployment

### Deploy to Azure Static Web Apps

1. Build the project:
```bash
npm run build
```

2. Deploy using Azure CLI:
```bash
az staticwebapp create \
  --name wedding-board-games \
  --resource-group your-resource-group \
  --source . \
  --location "East US 2" \
  --build-preset React
```

Or deploy via GitHub Actions (recommended):

1. Push your code to GitHub
2. Go to Azure Portal > Static Web Apps
3. Create new Static Web App
4. Connect to your GitHub repository
5. Azure will automatically set up CI/CD

### Build Settings for Azure

- **App location**: `/`
- **Build location**: `dist`
- **Build command**: `npm run build`

## Project Structure

```
src/
├── components/
│   ├── GameCard.tsx      # Individual game card component
│   ├── GameCard.css      # Game card styling
│   ├── GameFilter.tsx    # Filter buttons component
│   └── GameFilter.css    # Filter styling
├── context/
│   └── GameContext.tsx   # React context for game state management
├── data/
│   └── games.ts          # Your board games data
├── types/
│   └── BoardGame.ts      # TypeScript types
├── App.tsx               # Main app component
├── App.css               # Global app styling
└── main.tsx              # App entry point
```

## 🎨 Wedding Reception Perfect Features

### Why This App is Great for Weddings:

1. **No Tech Complexity**: Simple one-click interactions
2. **Guest Coordination**: See what's available vs. in use
3. **All Skill Levels**: Difficulty ratings help guests choose
4. **Time Management**: Duration estimates for reception planning
5. **Instruction Access**: QR codes or links to YouTube tutorials
6. **Mobile Friendly**: Works on every guest's phone
7. **No Account Needed**: Just open and use

### Reception Tips:

- **Display the URL**: Put it on table cards or signs
- **QR Code**: Create a QR code linking to your app
- **Game Host**: Designate someone to help explain rules
- **Duration Planning**: Use time estimates for activity planning

## Customization

### Styling
- Edit `src/App.css` for overall layout and colors
- Edit `src/components/GameCard.css` for individual game card styling
- The current theme uses a purple gradient background with white cards
- Games in progress get a golden glow effect

### Adding More Game Information
You can extend the `BoardGame` type in `src/types/BoardGame.ts` to include additional fields like:
- Age recommendations
- Game description
- Setup complexity
- Number of game pieces

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: React Context API
- **Build Tool**: Vite
- **Hosting**: Azure Static Web Apps
- **Styling**: CSS (no framework dependencies for simplicity)

## Performance

- Optimized for fast loading
- Responsive images and layouts
- Minimal JavaScript bundle
- Works great on all devices and network speeds
- State persists during the session (resets on page refresh)

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- High contrast design
- Clear visual indicators
- Mobile touch targets
