# 🎲 Wedding Reception Board Games Web App

A beautiful, interactive web application for managing board games at your wedding reception. Built with React, TypeScript, and deployed on Azure Static Web Apps with automatic GitHub Actions deployment.

**🌐 Live Demo**: [https://wonderful-tree-023673a0f.6.azurestaticapps.net/](https://wonderful-tree-023673a0f.6.azurestaticapps.net/)

## 🚀 Deployment Status
- ✅ **GitHub Actions Integration**: Automatic deployment on every push
- ✅ **Production Ready**: No blank screen issues resolved  
- ✅ **Real-time Updates**: Shared state across all users

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

## ⚙️ Environment Variables

This application uses environment variables for configuration. Copy `.env.example` to `.env.local` for local development.

### Frontend Environment Variables

The frontend uses Vite's environment variable system (prefix with `VITE_`):

```bash
# Application Information
VITE_APP_NAME=Wedding Board Games
VITE_APP_VERSION=1.0.0

# API Configuration  
VITE_API_BASE_URL_LOCAL=http://localhost:7071/api
VITE_API_BASE_URL_PRODUCTION=/api

# Polling Configuration
VITE_POLLING_INTERVAL_MS=5000
```

### Azure Static Web Apps Environment Variables

These are automatically set by Azure Static Web Apps:

- `WEBSITE_SITE_NAME` - Name of the Static Web App
- `WEBSITE_RESOURCE_GROUP` - Resource group name
- `WEBSITE_DEPLOYMENT_ID` - Deployment identifier

### Azure Functions (API) Environment Variables

These are automatically configured by Azure Functions runtime:

- `AzureWebJobsStorage` - Storage account connection string
- `FUNCTIONS_EXTENSION_VERSION` - Functions runtime version (~4)
- `FUNCTIONS_WORKER_RUNTIME` - Runtime language (node)

### Custom Application Settings

Add these in the Azure portal under Static Web App Configuration:

```bash
# Optional: Application Insights
APPINSIGHTS_INSTRUMENTATIONKEY=your-app-insights-key
APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string

# Optional: Custom wedding settings
WEDDING_DATE=2025-06-21
WEDDING_LOCATION=Beautiful Venue
```

### Local Development Setup

1. Copy the environment example file:
   ```bash
   cp .env.example .env.local
   ```

2. Update values as needed for your local environment

3. The application automatically detects the environment:
   - Localhost → Uses local API endpoint
   - Production → Uses relative API paths

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

## 🏭 Production Deployment Guide

### Prerequisites
- Azure account with subscription
- GitHub repository with your code
- Node.js 18+ for local development

### Deployment Methods

#### Method 1: GitHub Actions (Recommended)
1. **Fork this repository** or create your own based on this template
2. **Create Azure Static Web App** in the Azure portal
3. **Connect to GitHub** during creation - Azure will automatically create the workflow
4. **Configure build settings**:
   - App location: `/`
   - API location: `api`
   - Output location: `dist`
5. **Set environment variables** in Azure portal under Configuration

#### Method 2: Azure CLI
```bash
# Create resource group
az group create --name rg-wedding-games --location eastus2

# Create static web app
az staticwebapp create \
  --name wedding-board-games \
  --resource-group rg-wedding-games \
  --source https://github.com/yourusername/BoardGameWebAppWedding2025 \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "dist"
```

### Production Configuration Checklist

#### Azure Static Web Apps Settings
- ✅ **Custom Domain**: Configure your wedding domain
- ✅ **SSL Certificate**: Automatic HTTPS (Azure manages this)
- ✅ **Environment Variables**: Set production API endpoints
- ✅ **Authentication**: Configure if you want to restrict access

#### Performance Optimization
- ✅ **CDN**: Azure Static Web Apps includes global CDN
- ✅ **Compression**: Enabled by default
- ✅ **Caching**: Static assets cached with appropriate headers
- ✅ **Bundle Optimization**: Vite automatically splits vendor chunks

#### Security Configuration
- ✅ **HTTPS Only**: Enforced by Azure Static Web Apps
- ✅ **Security Headers**: Configured in `staticwebapp.config.json`
- ✅ **CORS**: Properly configured for API endpoints
- ✅ **Content Security Policy**: Defined to prevent XSS attacks

### Troubleshooting Production Issues

#### Common Deployment Problems

**Blank/White Screen After Deployment**
```bash
# Check browser console for errors
# Verify build output in GitHub Actions
# Ensure staticwebapp.config.json has correct fallback routing
```

**API Functions Not Working**
```bash
# Verify functions build successfully
# Check Azure Functions logs in Azure portal
# Ensure CORS headers are properly set
# Verify API routes in staticwebapp.config.json
```

**Build Failures**
```bash
# Check GitHub Actions workflow logs
# Verify all dependencies are in package.json
# Test build locally: npm run build
# Check TypeScript compilation: npm run type-check
```

#### Performance Monitoring
- Use Azure Application Insights for monitoring
- Monitor Core Web Vitals in browser dev tools
- Check Azure Static Web Apps analytics

#### Backup and Recovery
- GitHub repository serves as backup
- Azure Static Web Apps supports deployment history
- Export game data if using persistent storage

## 🔧 Development Scripts

```bash
# Development
npm run dev                 # Start development server
npm run api:dev            # Start API functions locally
npm run full-dev          # Start both frontend and API

# Building
npm run build             # Build frontend
npm run api:build         # Build API functions
npm run build:all         # Build everything

# Quality Assurance
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues
npm run type-check        # TypeScript type checking

# Cleanup
npm run clean             # Remove build artifacts
```

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
