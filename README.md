# Olark VCard Generator

A simple web application to generate VCard files from Olark contact information.

## Features

- Generate VCard files from Olark contact data
- Support for multiple contact fields
- QR code generation for easy contact sharing
- Responsive design for mobile and desktop

## Development

### Prerequisites

- Node.js (version specified in .nvmrc)
- npm

### Shell Script Helpers

The project includes two shell scripts to help manage Node.js versions:

1. `ensure-nvm.sh`: Ensures nvm (Node Version Manager) is loaded and the correct Node.js version is being used
   ```bash
   source ./ensure-nvm.sh
   ```

2. `use-nvm`: A wrapper script for easier usage of nvm
   ```bash
   ./use-nvm
   ```

### Basic Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the project
npm run build

# Start development server
npm run dev
```

## Project Structure

- `src/`: Source code
  - `js/`: JavaScript modules
  - `css/`: Stylesheets
  - `html/`: HTML templates
- `public/`: Built files
- `tests/`: Test files
- `scripts/`: Build and utility scripts

## Testing

The project uses Vitest for testing. Tests are located in the `tests/` directory.

## License

MIT License - see LICENSE file for details 