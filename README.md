# Agents Kit 🚀

**Agents Kit** is a high-performance, data-driven Progressive Web App (PWA) designed for Ingress Agents. It provides a comprehensive toolkit for planning, tracking, and celebrating seasonal achievements.

🔗 **Live Site:** [AgentsKit.org](https://agentskit.org)

[![Cross-Site Migration Test](https://github.com/cyblocker/agents-kit/actions/workflows/migration-test.yml/badge.svg)](https://github.com/cyblocker/agents-kit/actions/workflows/migration-test.yml)

## Key Features

- **📊 Dynamic Season Planning**: Plan your season tokens across various activities (IFS, Dispatches, Anomalies) and get real-time projections for your final badge level.
- **📈 Progress Tracking**: Simply enter your current in-game total, and the tool calculates your daily bounty progress and remaining potential automatically.
- **📱 PWA Ready**: Fully installable on iOS and Android. Works **offline** (perfect for remote Anomaly sites) thanks to a Service Worker using Stale-While-Revalidate caching.
- **🖼️ Commemorative Card Generation**: Generate and share beautiful, customized achievement cards at the end of the season.
- **🌍 Multi-language Support**: Full support for English, Chinese (Simplified), and Japanese.
- **🔒 Privacy First**: All user data is stored locally in your browser's `localStorage`. No personal data is ever sent to a server.

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, and JavaScript.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a sleek, modern, and responsive UI.
- **Data Compression**: [LZ-String](http://pieroxy.net/blog/pages/lz-string/index.html) for efficient data sharing and migration strings.
- **Rendering**: [html2canvas](https://html2canvas.hertzen.com/) for generating commemorative cards.
- **Testing**: [Playwright](https://playwright.dev/) for cross-origin migration and regression testing.

## Project Structure

- `index.html`: The main entry point and single-page application logic.
- `data.js`: Centralized season configuration and I18N dictionary. Update this for new seasons.
- `sw.js`: Service Worker for offline accessibility and background updates.
- `manifest.json`: PWA configuration for mobile installation.
- `migration_test.spec.js`: Automated E2E tests for the migration infrastructure.

## Legacy Migration

Agents Kit was originally hosted as the "Ingress Season Planner." We provide a robust migration path for returning users:
- **Automatic**: One-click migration via URL hash transit.
- **Manual**: Secure string-based export/import using compressed JSON.

## Local Development

1. Clone the repository.
2. Serve the directory using any local web server (e.g., `python -m http.server` or VS Code Live Server).
3. Access the tool at `http://localhost:8000`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Created by [cyblocker](https://cyblocker.com). Not an official Niantic/Ingress product.*
