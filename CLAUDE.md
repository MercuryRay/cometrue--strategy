# CLAUDE.md

## Project Overview

**cometrue--strategy** is a strategy application project.

- **Repository owner**: MercuryRay
- **Created**: October 2025

## Repository Structure

```
cometrue--strategy/
├── CLAUDE.md          # AI assistant guide (this file)
├── READ.md            # Project documentation
├── index.html         # Main landing page
├── style.css          # Stylesheet
├── script.js          # Frontend logic
└── .vscode/           # VS Code workspace settings
    └── settings.json
```

## Development Workflow

### Git

- **Primary branch**: `main`
- **Remote**: origin

### Branching Convention

- Feature branches use the pattern: `claude/<description>-<id>`

### Commits

- Write clear, descriptive commit messages
- Reference issues or context where applicable

## Commands

This is a static HTML/CSS/JS project. No build step is required.

To preview locally:
```
python3 -m http.server 8000
```

## Claude Code (VS Code Extension)

To use Claude Code in this project via VS Code:

1. Install the **Claude Code** extension from the VS Code Marketplace.
2. Authenticate with your Anthropic API key when prompted.
3. Open this repository folder in VS Code — Claude Code will automatically read this `CLAUDE.md` for project context.

### Troubleshooting

If Claude Code is not responding in VS Code:

- Ensure the extension is enabled for this workspace (`Extensions` panel → verify Claude Code is not disabled).
- Check that the API key is set: open VS Code settings (`Ctrl+,`) and search for `claude` to verify the key is present.
- Reload the VS Code window: `Ctrl+Shift+P` → `Developer: Reload Window`.
- Confirm you are connected to the internet (the extension requires network access to the Anthropic API).

## Conventions for AI Assistants

- Read existing code before making modifications
- Keep changes minimal and focused on the task at hand
- Do not introduce unnecessary dependencies or abstractions
- Update this CLAUDE.md when adding new tooling, commands, or project structure changes
