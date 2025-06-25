# 🎲 Wedding Reception Games 2025

A real-time board game management app for Thor & Lina's wedding reception! Built with love, Azure Static Web Apps, and some serious collaborative coding between Thor and Claude.

## 🎯 What This Is

This is a minimal, wedding-appropriate web app that lets our guests:
- See which of our 20 board games are currently being played
- Mark games as "in progress" or "available" 
- Search and filter through games by type, duration, and difficulty
- View YouTube instructions for each game
- Experience real-time updates across all devices

## 🛠️ Tech Stack

- **Frontend**: Pure HTML, CSS, and vanilla JavaScript (keeping it simple!)
- **Backend**: Azure Functions for real-time game state management
- **Hosting**: Azure Static Web Apps with GitHub Actions CI/CD
- **Real-time Updates**: Polling-based state synchronization across devices

## 🎮 Features

- **⭐ Currently Playing**: Real-time display of active games with wedding-themed styling
- **🔍 Smart Search**: Filter by game type, duration, difficulty, or search by name
- **📱 Responsive Design**: Works perfectly on phones, tablets, and desktops
- **🔄 Auto-sync**: Updates every 5 seconds across all connected devices
- **📺 How-to-Play**: Direct links to YouTube tutorials for each game
- **💕 Personal Touch**: Custom thank you message from Thor & Lina

## 🚀 Deployment

The app automatically deploys via GitHub Actions to Azure Static Web Apps. Every push to main triggers a new deployment.

**Live URL**: https://blue-ocean-05fae780f.1.azurestaticapps.net/

## 🎲 Game Collection

We've got 20 amazing games ranging from quick 15-minute party games to strategic 60-minute adventures:

- **Party Games**: Codenames, Wavelength, Skull, Exploding Kittens
- **Strategy Games**: Azul, Splendor, Modern Art, Thrive
- **Family Games**: Kollide, Chakra, Fire Tower
- **Cooperative**: Pandemic
- **Abstract Strategy**: Quixo, Quoridor
- **And more!**

## ⚡ How Real-Time Sync Works

Ever wondered how everyone sees game updates instantly? Here's the magic behind the scenes:

### 🏠 **Shared State Management**
The Azure Functions API maintains an in-memory `allGameStates` object that tracks which games are currently being played:
```javascript
// Example state
{ 
  "codenames": { 
    isPlaying: true, 
    startedAt: "2025-06-25T15:30:00Z", 
    gameTitle: "Codenames" 
  } 
}
```

### 🎯 **When Someone Clicks "Start Playing"**
1. **Guest clicks** "Start Playing" on any game
2. **Frontend sends** `POST /api/games` with game details
3. **API updates** the shared state object
4. **All devices** see the change within 5 seconds

### 🔄 **Auto-Sync Magic**
Every device polls the API every 5 seconds:
```javascript
setInterval(fetchGameStates, 5000); // Check for updates every 5 seconds
```

This means when Person A starts Codenames, Persons B, C, and D automatically see "⭐ Currently Playing: Codenames" on their phones within 5 seconds - no refresh needed!

### 💡 **Why This Works Perfectly**
- **Simple & Reliable**: No complex websockets or real-time databases
- **Mobile Friendly**: Works on any device with a browser  
- **Wedding Appropriate**: 5-second updates are perfect for board game coordination
- **Self-Healing**: If someone's device disconnects, others can still manage games

## 🔧 Local Development

```bash
# Clone the repo
git clone [your-repo-url]
cd BoardGameWebAppWedding2025

# Install Azure Functions tools
npm install -g azure-functions-core-tools@4

# Start the API locally (from /api directory)
cd api
npm install
func start

# Serve the frontend (from root directory)
# Use any local server like Live Server extension in VS Code
# or python3 -m http.server 8080
```

## 💝 The Vibe

This project was pure joy to build. I had a clear vision for what I wanted for our wedding, and Claude helped bring those ideas to life quickly and elegantly. The collaborative process meant I could focus on the creative decisions while getting technical implementation help. The real-time aspect means guests can coordinate games naturally, and the clean design fits perfectly with our wedding aesthetic.

The best part? No complex frameworks, no over-engineering - just clean, working code that does exactly what Lina and I need for our special day.

## 🎉 For Future Weddings

Feel free to fork this for your own celebration! Just update:
- `games.json` with your board game collection
- The thank you message in `index.html`
- The wedding year in the title
- Deploy to your own Azure Static Web Apps instance

## 🏆 Special Thanks

- **Thor** for having the vision and driving this entire project from concept to deployment
- **Claude 4 (preview)** for being an incredible coding collaboration partner
- **Azure Static Web Apps** for making deployment effortless
- **Lina** for inspiring a wedding worth celebrating with epic board games
- **All our wedding guests** who will make these games come alive

---

*Built with ❤️ by Thor for Thor & Lina's wedding reception 2025**
*Collaboratively coded with Claude - because the best code comes from great ideas and good vibes!*
