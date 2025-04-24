#!/bin/bash

# Install nvm if not already installed
if [ ! -d "$HOME/.nvm" ]; then
    echo "Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi

# Install and use Node.js 18
echo "Installing Node.js 18..."
nvm install 18
nvm use 18

# Verify installation
echo "Verifying Node.js version..."
node -v
npm -v

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Run tests
echo "Running tests..."
npm test 