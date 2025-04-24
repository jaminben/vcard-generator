#!/bin/bash

# Function to check if nvm is installed and working
check_nvm() {
    if command -v nvm &> /dev/null; then
        return 0
    fi
    
    # Check if nvm is in the PATH but not loaded
    if [ -s "$HOME/.nvm/nvm.sh" ]; then
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
        if command -v nvm &> /dev/null; then
            return 0
        fi
    fi
    
    return 1
}

# Main script
echo "Checking nvm installation..."

if ! check_nvm; then
    echo "nvm not found. Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    
    if ! check_nvm; then
        echo "Failed to install nvm. Please try installing manually."
        exit 1
    fi
fi

echo "nvm is installed and working correctly."
echo "Current nvm version: $(nvm --version)"

# Check if Node.js 18 is installed
if ! nvm ls 18 &> /dev/null; then
    echo "Installing Node.js 18..."
    nvm install 18
fi

# Use Node.js 18
echo "Using Node.js 18..."
nvm use 18

# Verify Node.js and npm versions
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Run tests
echo "Running tests..."
npm test 