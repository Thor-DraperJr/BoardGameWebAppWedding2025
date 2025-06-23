# Azure Deployment Guide

## Quick Deploy with Azure Developer CLI (Recommended)

The easiest way to deploy your wedding board games app to Azure:

### 1. Install Azure Developer CLI
```bash
# Windows (PowerShell)
winget install microsoft.azd

# Or download from: https://aka.ms/azure-dev/install
```

### 2. Login to Azure
```bash
azd auth login
```

### 3. Deploy the App
```bash
# Initialize and deploy
azd up
```

This will:
- Create a resource group
- Provision Azure Static Web Apps
- Build and deploy your app
- Give you a live URL

## Manual Deployment via Azure Portal

### 1. Create Static Web App
1. Go to [Azure Portal](https://portal.azure.com)
2. Create Resource → Static Web Apps
3. Choose your subscription and resource group
4. Set these build details:
   - **App location**: `/`
   - **Build location**: `dist`
   - **Build command**: `npm run build`

### 2. Connect to GitHub (Optional)
- Connect your GitHub repository for automatic deployments
- Azure will create a GitHub Action workflow

## Update Your Games

Edit `src/data/games.ts` to customize your board games:

```typescript
export const boardGames: BoardGame[] = [
  {
    id: '1',
    title: 'Your Game',
    gameType: 'Strategy',
    playerCount: '2-4 players',
    instructionsUrl: 'https://youtube.com/watch?v=...',
    rulesUrl: 'https://example.com/rules.pdf'
  }
];
```

Then redeploy:
```bash
azd deploy
```

## Cost

- **Azure Static Web Apps Free Tier**: $0/month
- Includes: 100GB bandwidth, custom domains, SSL certificates
- Perfect for a wedding reception app!

## Custom Domain (Optional)

1. In Azure Portal → Static Web Apps → Custom domains
2. Add your domain (like `games.yourwedding.com`)
3. Azure provides free SSL certificates

## Support

The app works on all devices and browsers. Guests can easily:
- View all available games
- See player counts and game types
- Click to watch instruction videos
- Access official rule PDFs

Perfect for a wedding reception! 🎲💕
