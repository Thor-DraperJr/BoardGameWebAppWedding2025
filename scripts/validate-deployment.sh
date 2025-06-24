#!/bin/bash

# Production Deployment Validation Script
# Run this script before deploying to production

echo "🔍 Starting production deployment validation..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✅ $1 is installed${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 is not installed${NC}"
        return 1
    fi
}

run_check() {
    local description="$1"
    local command="$2"
    
    echo -e "\n${YELLOW}🔍 $description${NC}"
    
    if eval $command; then
        echo -e "${GREEN}✅ $description - PASSED${NC}"
        return 0
    else
        echo -e "${RED}❌ $description - FAILED${NC}"
        return 1
    fi
}

# Prerequisites check
echo -e "\n${YELLOW}📋 Checking Prerequisites...${NC}"
PREREQ_FAILED=0

check_command "node" || PREREQ_FAILED=1
check_command "npm" || PREREQ_FAILED=1

if [ $PREREQ_FAILED -eq 1 ]; then
    echo -e "\n${RED}❌ Prerequisites check failed. Please install missing tools.${NC}"
    exit 1
fi

# Project structure validation
echo -e "\n${YELLOW}📁 Validating Project Structure...${NC}"

REQUIRED_FILES=(
    "package.json"
    "vite.config.ts"
    "tsconfig.json"
    "staticwebapp.config.json"
    "azure.yaml"
    ".env.example"
    ".eslintrc.json"
    "api/package.json"
    "api/host.json"
    "api/tsconfig.json"
)

STRUCTURE_FAILED=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file exists${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        STRUCTURE_FAILED=1
    fi
done

if [ $STRUCTURE_FAILED -eq 1 ]; then
    echo -e "\n${RED}❌ Project structure validation failed.${NC}"
    exit 1
fi

# Dependencies check
run_check "Installing frontend dependencies" "npm install --silent" || exit 1
run_check "Installing API dependencies" "cd api && npm install --silent && cd .." || exit 1

# Build validation
run_check "TypeScript compilation check" "npm run type-check" || exit 1
run_check "ESLint validation" "npm run lint" || exit 1
run_check "Frontend build" "npm run build" || exit 1
run_check "API build" "npm run api:build" || exit 1

# Configuration validation
echo -e "\n${YELLOW}⚙️ Validating Configuration Files...${NC}"

# Check staticwebapp.config.json
if command -v jq &> /dev/null; then
    if jq empty staticwebapp.config.json 2>/dev/null; then
        echo -e "${GREEN}✅ staticwebapp.config.json is valid JSON${NC}"
    else
        echo -e "${RED}❌ staticwebapp.config.json is invalid JSON${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️ jq not installed, skipping JSON validation${NC}"
fi

# Security validation
echo -e "\n${YELLOW}🔒 Security Validation...${NC}"

# Check for secrets in code
if grep -r "password\|secret\|key\|token" src/ --exclude-dir=node_modules --exclude="*.md" | grep -v "example" | grep -v "placeholder" | grep -v "VITE_" > /dev/null 2>&1; then
    echo -e "${RED}❌ Potential secrets found in source code${NC}"
    exit 1
else
    echo -e "${GREEN}✅ No secrets found in source code${NC}"
fi

# Environment variables check
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example exists for documentation${NC}"
else
    echo -e "${YELLOW}⚠️ .env.example missing${NC}"
fi

# Final checks
echo -e "\n${YELLOW}🚀 Final Production Readiness Checks...${NC}"

# Check build output
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo -e "${GREEN}✅ Frontend build output exists${NC}"
else
    echo -e "${RED}❌ Frontend build output missing${NC}"
    exit 1
fi

# Check API build output
if [ -d "api/dist" ]; then
    echo -e "${GREEN}✅ API build output exists${NC}"
else
    echo -e "${RED}❌ API build output missing${NC}"
    exit 1
fi

# Success message
echo -e "\n${GREEN}🎉 Production deployment validation completed successfully!${NC}"
echo -e "${GREEN}✅ Your application is ready for Azure Static Web Apps deployment.${NC}"

echo -e "\n${YELLOW}📋 Next Steps:${NC}"
echo "1. Commit and push your changes to GitHub"
echo "2. Create or update your Azure Static Web App"
echo "3. Configure environment variables in Azure portal"
echo "4. Monitor the deployment via GitHub Actions"
echo "5. Test the production deployment thoroughly"

echo -e "\n${GREEN}🚀 Happy deploying!${NC}"