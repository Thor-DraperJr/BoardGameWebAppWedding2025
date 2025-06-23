targetScope = 'resourceGroup'

@description('Name of the static web app')
param staticWebAppName string = 'wedding-board-games'

@description('Location for the static web app')
param location string = resourceGroup().location

@description('SKU for the static web app')
param sku string = 'Free'

resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: ''
    branch: 'main'
    buildProperties: {
      appLocation: '/'
      outputLocation: 'dist'
      appBuildCommand: 'npm run build'
    }
  }
  tags: {
    'azd-service-name': 'web'
    'azd-env-name': resourceGroup().tags['azd-env-name']
  }
}

output staticWebAppUrl string = staticWebApp.properties.defaultHostname
output staticWebAppName string = staticWebApp.name
