# 🎲 Wedding Reception Board Games Web App

A beautiful, interactive web application for managing board games at your wedding reception. Built with React, TypeScript, and deployed on Azure Static Web Apps.

**🌐 Live Demo**: [https://wonderful-tree-023673a0f.6.azurestaticapps.net/](https://wonderful-tree-023673a0f.6.azurestaticapps.net/)

## 🎯 Features

- **Game Availability Tracking**: Mark games as "being played" so guests know what's available
- **Smart Filtering**: View all games, only available games, or games currently in progress  
- **Complete Game Information**: Title, type, player count, difficulty, duration, and instruction links
- **YouTube Integration**: Direct links to how-to-play videos for each game
- **Visual Status Indicators**: Games being played have a special golden glow effect
- **Responsive Design**: Perfect on phones, tablets, and desktop computers
- **Wedding-Ready Styling**: Elegant gradient background with modern card design
- **Admin Panel**: Hidden admin controls for game management (click the floating button)
- **Session-Based State**: Game status persists during the session, resets fresh for each new session

## 🎮 How It Works

### For Wedding Guests:
1. **Browse Games**: See all available board games with details
2. **Filter by Status**: Use the filter buttons to see all games, available only, or currently playing
3. **Start Playing**: Click "Start Playing" to mark a game as in use
4. **Watch Instructions**: Click "How to Play" for YouTube tutorial videos
5. **Mark Available**: Click "Mark as Available" when done playing

### For Game Management:
- **Admin Panel**: Click the floating purple button (bottom-right) for admin controls
- **Reset All Games**: Make all games available again with one click
- **Individual Control**: Toggle any game's status from the admin panel

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

## 🚀 Quick Start

### Option 1: Use the Live Version (Recommended)
Just share this URL with your wedding guests:
**[https://wonderful-tree-023673a0f.6.azurestaticapps.net/](https://wonderful-tree-023673a0f.6.azurestaticapps.net/)**

### Option 2: Deploy Your Own Version

#### Prerequisites
- Node.js 18+ 
- npm
- Azure account (for deployment)

#### Local Development
1. **Clone the repository:**
```bash
git clone https://github.com/Thor-DraperJr/BoardGameWebAppWedding2025.git
cd BoardGameWebAppWedding2025
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:** http://localhost:5173

#### Deploy to Azure Static Web Apps

**Method 1: Using Azure Developer CLI (azd)**
```bash
# Install Azure Developer CLI
npm install -g @azure/dev-cli

# Login to Azure
azd auth login

# Deploy (will create resources and deploy)
azd up
```

**Method 2: Using Static Web Apps CLI**
```bash
# Build the project
npm run build

# Install SWA CLI
npm install -g @azure/static-web-apps-cli

# Deploy (requires existing Azure Static Web App)
swa deploy --app-location . --output-location dist --deployment-token YOUR_TOKEN
```
## 🎲 Sample Game Data

The app comes with 26 carefully selected board games perfect for wedding receptions:

- **Strategy Games**: Kollide, Thrive, Carcassonne
- **Party Games**: Wavelength, Monikers, Telestrations  
- **Family Games**: Ticket to Ride, Azul, Splendor
- **Social Deduction**: The Resistance: Avalon, One Night Ultimate Werewolf
- **Quick Games**: Love Letter, Sushi Go!, King of Tokyo
- **And many more!** Each with difficulty ratings, player counts, and instruction videos

## 🛠 Customization

### Adding Your Own Games

Edit `src/data/games.json` to replace with your board game collection:

```json
[
  {
    "id": "1",
    "title": "Your Game Name",
    "gameType": "Strategy",
    "playerCount": "2-4 players", 
    "difficulty": "Medium",
    "duration": "30-45 min",
    "instructionsUrl": "https://youtube.com/watch?v=..."
  }
]
```

### Styling Customization

- **Colors & Theme**: Edit `src/App.css` for overall styling
- **Game Cards**: Modify `src/components/GameCard.css` 
- **Filters**: Update `src/components/GameFilter.css`
- **Background**: Change the gradient in the `.app` CSS class

### Configuration Files

- **`staticwebapp.config.json`**: Azure Static Web Apps routing configuration
- **`azure.yaml`**: Azure Developer CLI deployment settings
- **`vite.config.ts`**: Build configuration (base path set to `./` for static hosting)

## 📁 Project Structure

```
BoardGameWebAppWedding2025/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── GameCard.tsx          # Individual game card component
│   │   ├── GameCard.css          # Game card styling  
│   │   ├── GameFilter.tsx        # Filter buttons component
│   │   ├── GameFilter.css        # Filter styling
│   │   ├── AdminPanel.tsx        # Admin controls component
│   │   └── AdminPanel.css        # Admin panel styling
│   ├── 📂 context/
│   │   └── GameContext.tsx       # React context for state management
│   ├── 📂 data/
│   │   ├── games.json            # Board games database (JSON)
│   │   └── games.ts              # Game data processing
│   ├── 📂 types/
│   │   └── BoardGame.ts          # TypeScript type definitions
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Global application styles
│   └── main.tsx                  # Application entry point
├── 📂 public/
│   └── staticwebapp.config.json  # Azure SWA routing config
├── 📂 infra/
│   ├── main.bicep                # Azure infrastructure as code
│   └── main.parameters.json      # Bicep parameters
├── 📂 .github/workflows/
│   └── azure-static-web-apps-*.yml # GitHub Actions deployment
├── azure.yaml                   # Azure Developer CLI config
├── staticwebapp.config.json     # Root SWA configuration
├── vite.config.ts               # Vite build configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🛡 Technical Details

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite (fast builds and hot reload)
- **State Management**: React Context API (no external dependencies)
- **Styling**: Pure CSS (no framework bloat)
- **Hosting**: Azure Static Web Apps
- **Infrastructure**: Azure Bicep templates
- **CI/CD**: GitHub Actions integration

### Key Features
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast Performance**: Optimized bundle size and loading speeds  
- 🔄 **Real-time Updates**: Instant UI updates when game status changes
- 🎨 **Beautiful UI**: Modern card design with smooth animations
- 🔒 **No Database**: Simple file-based data, no complex backend
- 📊 **Admin Panel**: Built-in management tools for game coordination

### Performance Optimizations
- Minimal JavaScript bundle size
- Optimized CSS with no unused styles
- Fast Vite build process
- Azure Static Web Apps global CDN
- Responsive images and layouts

## 🎉 Wedding Reception Tips

### Setup Recommendations:
1. **Display the URL**: Add to table cards, signs, or wedding website
2. **Create QR Codes**: Easy phone access for guests
3. **Designate a Game Host**: Someone to help explain rules and coordinate
4. **Print Backup**: Have a physical list as backup
5. **Test Everything**: Try the app before your wedding day

### Guest Instructions:
> "Scan this QR code or visit [your-url] to see available board games! 
> Click 'Start Playing' when you begin a game, and 'Mark Available' when finished. 
> Happy gaming! 🎲"

## 🚀 Deployment History

This project successfully resolved several deployment challenges:

1. **Initial Setup**: Created React + TypeScript + Vite project structure
2. **Azure Integration**: Configured Azure Developer CLI and Static Web Apps  
3. **Build Issues**: Fixed TypeScript errors and Vite configuration for static hosting
4. **Deployment Pipeline**: Resolved Bicep template syntax and GitHub Actions workflow
5. **Asset Paths**: Corrected base path configuration for static web app hosting
6. **Production Deployment**: Used Azure Static Web Apps CLI for proper build deployment

**Final Result**: ✅ Fully functional web app deployed to Azure Static Web Apps

## 🤝 Contributing

This project was built for a specific wedding reception, but feel free to fork and adapt for your own events:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Board Game Community**: For inspiring great games to include
- **Azure Team**: For excellent Static Web Apps platform
- **React Team**: For the fantastic development experience
- **Vite Team**: For lightning-fast build tools
- **Wedding Planners**: For the idea to gamify reception entertainment

## 📞 Support

- **Live Demo**: [https://wonderful-tree-023673a0f.6.azurestaticapps.net/](https://wonderful-tree-023673a0f.6.azurestaticapps.net/)
- **GitHub Repository**: [https://github.com/Thor-DraperJr/BoardGameWebAppWedding2025](https://github.com/Thor-DraperJr/BoardGameWebAppWedding2025)
- **Issues**: Report bugs or request features via GitHub Issues

---

**Made with ❤️ for an amazing wedding reception! May your marriage be as fun and engaging as your board game collection! 🎲💍**
