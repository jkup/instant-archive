# Archive Page Chrome Extension

## Overview

The Archive Page Chrome Extension allows you to easily archive the current page using [archive.ph](https://archive.ph/). With a single click, the extension submits the current page URL to archive.ph, retrieves the archive URL, and automatically redirects you to the archived version of the page.

## Features

- **One-click Archiving**: Click the extension icon to archive the current page.
- **Automatic Redirection**: After archiving, the extension redirects you to the newly created archive URL.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Open the webpage you want to archive.
2. Click the extension icon in the Chrome toolbar.
3. The extension will automatically submit the page to archive.ph and redirect you to the archived version.

## File Structure

- `manifest.json`: The manifest file that defines the extension.
- `background.js`: The background script that handles the extension icon click event.
- `content.js`: The content script that submits the URL to archive.ph and handles the redirection.
- `icons/`: Directory containing the extension icons.

## Notes

- Ensure you have a stable internet connection to allow the extension to communicate with archive.ph.
- The extension requires permissions to access your active tab and perform scripting operations.

## License

This project is licensed under the MIT License.
