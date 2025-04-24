#!/bin/bash

# Function to check if nvm is loaded
check_nvm() {
    if ! command -v nvm &> /dev/null; then
        echo "nvm is not loaded. Loading nvm..."
        export NVM_DIR="$HOME/.nvm"
        [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"
        [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"
    fi
}

# Function to ensure Node.js 18 is used
ensure_node_version() {
    local desired_version="18"
    local current_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    
    if [ "$current_version" != "$desired_version" ]; then
        echo "Current Node.js version is v$current_version, switching to v$desired_version..."
        nvm use $desired_version
    else
        echo "Already using Node.js v$desired_version"
    fi
}

# Main execution
echo "Checking nvm setup..."
check_nvm

echo "Checking Node.js version..."
ensure_node_version

echo "Current Node.js version: $(node -v)"
echo "Current npm version: $(npm -v)" 