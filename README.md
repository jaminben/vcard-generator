# Olark VCard Generator

A web application for generating vCards from Olark contact information.

## Features

- Generate vCards from contact information
- Preview vCard content before download
- Responsive design for all devices
- Easy deployment to GitHub Pages

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment process:

1. Builds the application
2. Deploys to GitHub Pages
3. Updates the site at `https://[username].github.io/olark-vcard-generator`

## Project Structure

```
.
├── public/          # Static files and build output
├── src/            # Source files
│   ├── css/        # Stylesheets
│   └── js/         # JavaScript files
├── .github/        # GitHub configuration
└── package.json    # Project configuration
```

## License

MIT 