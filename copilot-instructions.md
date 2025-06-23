# Copilot Instructions - Wedding Board Games App

## Project Overview
A React + Vite board game web app for a wedding reception deployed to Azure Static Web Apps. Guests can view available games, mark games as "playing," filter by status, and access game info with shared state across all users.

## Naming Conventions

### File Naming
- **React Components**: `PascalCase.tsx` (e.g., `GameCard.tsx`, `AdminPanel.tsx`)
- **Hooks**: `use[Name].ts` (e.g., `useGameState.ts`, `usePolling.ts`)
- **Services**: `[name]Service.ts` (e.g., `gameStateService.ts`, `apiService.ts`)
- **Types/Interfaces**: `types.ts` or `[domain]Types.ts` (e.g., `gameTypes.ts`)
- **Utils**: `[name]Utils.ts` (e.g., `dateUtils.ts`, `validationUtils.ts`)
- **Constants**: `constants.ts` or `[domain]Constants.ts`
- **Config files**: `kebab-case` (e.g., `vite.config.ts`, `azure.yaml`)
- **CSS files**: Match component name (e.g., `GameCard.css` for `GameCard.tsx`)

### Variable Naming
- **Variables/Functions**: `camelCase` (e.g., `gameState`, `toggleGameStatus`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `API_BASE_URL`, `POLL_INTERVAL`)
- **React Components**: `PascalCase` (e.g., `GameCard`, `FilterButton`)
- **Interface/Types**: `PascalCase` with descriptive names (e.g., `Game`, `GameState`, `ApiResponse`)
- **Props interfaces**: `[ComponentName]Props` (e.g., `GameCardProps`, `FilterNavProps`)

### CSS Class Naming
- **BEM methodology**: `block__element--modifier`
- **Component root**: `component-name` (e.g., `.game-card`, `.filter-nav`)
- **States**: `--state` (e.g., `.game-card--playing`, `.button--disabled`)
- **Responsive**: `@media` queries with mobile-first approach

### Function Naming
- **Event handlers**: `handle[Action]` or `on[Action]` (e.g., `handleGameToggle`, `onFilterChange`)
- **API calls**: `[verb][Resource]` (e.g., `getGames`, `updateGameStatus`, `resetAllGames`)
- **Utilities**: Descriptive verbs (e.g., `formatDuration`, `validateGameId`)
- **Boolean functions**: `is[Condition]` or `has[Property]` (e.g., `isGamePlaying`, `hasHowToPlayUrl`)

## Code Structure Standards

### Component Structure
```tsx
// Imports (external libraries first, then internal)
import { useState, useEffect } from 'react';
import './ComponentName.css';
import { GameState } from '../types/gameTypes';

// Interfaces/Types (if not in separate file)
interface ComponentNameProps {
  // props here
}

// Component
function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // State hooks first
  const [state, setState] = useState();
  
  // Effect hooks
  useEffect(() => {
    // effect logic
  }, []);
  
  // Event handlers
  const handleAction = () => {
    // handler logic
  };
  
  // Render helpers (if needed)
  const renderSection = () => {
    // render logic
  };
  
  // Main render
  return (
    <div className="component-name">
      {/* JSX here */}
    </div>
  );
}

export default ComponentName;
```

### Service Structure
```typescript
// Interfaces first
interface ServiceConfig {
  baseUrl: string;
  timeout: number;
}

// Main service class
class ServiceName {
  private config: ServiceConfig;
  
  constructor(config: ServiceConfig) {
    this.config = config;
  }
  
  // Public methods
  async getData(): Promise<DataType[]> {
    // implementation
  }
  
  // Private methods
  private handleError(error: Error): void {
    // error handling
  }
}

// Export singleton instance
export const serviceName = new ServiceName(config);
```

## Azure & Deployment Conventions

### Environment Variables
- **Prefix**: `REACT_APP_` for client-side variables
- **Format**: `REACT_APP_[DOMAIN]_[PURPOSE]` (e.g., `REACT_APP_API_BASE_URL`)

### Azure Resource Naming
- **Resource Group**: `rg-[project-name]` (e.g., `rg-boardgamewebappwedding2025`)
- **Static Web App**: `swa-[project-name]` (e.g., `swa-wedding-board-games`)
- **Function App**: `func-[project-name]` (e.g., `func-wedding-board-games`)
- **Storage Account**: `st[projectname][env]` (e.g., `stweddingboardgames`)

### API Endpoints
- **REST conventions**: `/api/[resource]` (e.g., `/api/games`, `/api/games/{id}`)
- **Actions**: Use HTTP verbs appropriately (GET, POST, PUT, DELETE)

## Git Conventions

### Commit Messages
- **Format**: `type(scope): description`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Examples**: 
  - `feat(games): add game filtering functionality`
  - `fix(api): resolve game state sync issue`
  - `docs(readme): update deployment instructions`

### Branch Naming
- **Feature**: `feature/[feature-name]` (e.g., `feature/shared-game-state`)
- **Bug fix**: `fix/[bug-description]` (e.g., `fix/api-connection-error`)
- **Hotfix**: `hotfix/[issue]` (e.g., `hotfix/deployment-config`)

## Error Handling Standards

### API Error Handling
```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`API request failed (status: ${response.status}), falling back to local state`);
    return fallbackValue;
  }
  return await response.json();
} catch (error) {
  console.warn('API request failed, using local state:', error instanceof Error ? error.message : 'Unknown error');
  return fallbackValue;
}
```

### Component Error Boundaries
- Use React Error Boundaries for component-level error handling
- Always provide user-friendly fallback UI
- Log errors for debugging but don't expose technical details to users

## Performance Guidelines

### React Optimization
- Use `useMemo` and `useCallback` for expensive calculations
- Prefer functional updates for state that depends on previous state
- Use proper dependency arrays in `useEffect`

### Bundle Optimization
- Lazy load components when appropriate
- Optimize images and assets
- Use proper Vite build configuration

## Testing Conventions

### Test File Naming
- **Unit tests**: `[ComponentName].test.tsx`
- **Integration tests**: `[FeatureName].integration.test.tsx`
- **E2E tests**: `[FlowName].e2e.test.tsx`

### Test Structure
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // setup
  });
  
  it('should render correctly', () => {
    // test implementation
  });
  
  it('should handle user interaction', () => {
    // test implementation
  });
});
```

## Documentation Standards

### Code Comments
- Use JSDoc for public functions and complex logic
- Explain "why" not "what" in comments
- Keep comments up-to-date with code changes

### README Structure
- Project overview and purpose
- Setup and installation instructions
- Deployment instructions
- API documentation
- Contributing guidelines

## Security Guidelines

### Client-Side Security
- Never store sensitive data in localStorage
- Validate all user inputs
- Use HTTPS for all API calls
- Implement proper CORS policies

### Azure Security
- Use Managed Identity for Azure resource access
- Store secrets in Azure Key Vault
- Implement proper RBAC (Role-Based Access Control)
- Enable security monitoring and alerting

## Project-Specific Rules

### Game State Management
- Always provide optimistic UI updates
- Fall back gracefully when API is unavailable
- Maintain local state as single source of truth during API failures
- Use polling for real-time updates (5-second intervals)

### UI/UX Guidelines
- Mobile-first responsive design
- Accessible color contrast ratios
- Clear visual feedback for all user actions
- Loading states for async operations
- Error states with actionable messages

### Wedding Reception Context
- Keep the interface simple and intuitive
- Prioritize reliability over advanced features
- Ensure the app works well in various lighting conditions
- Consider guests may be using different devices and browsers

---

**Last Updated**: June 23, 2025
**Version**: 1.0.0
