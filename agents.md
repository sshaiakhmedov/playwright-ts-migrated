# Agent Project Instructions

This file contains critical configuration and environment instructions for AI agents working on this project.

## Node.js Version Requirements

**IMPORTANT**: ALWAYS use Node.js v20+ for this project. The default environment node (v14) is incompatible with the modern Playwright and TypeScript features used here.

### How to use the correct Node version:

If the default `node -v` shows v14, use the full path to the Node 20 binary installed in the user's home directory:

- **Path**: `/Users/sshaiakhmedov/.nvm/versions/node/v20.20.1/bin/node`
- **NVM usage**: If `nvm` is available in your shell, run `nvm use 20`.
- **Direct Command**: 
  Instead of `npx playwright test`, use:
  ```bash
  env PATH="/Users/sshaiakhmedov/.nvm/versions/node/v20.20.1/bin:$PATH" npx playwright test
  ```

## Common Issues to Avoid
- **Unexpected token '{'**: This usually means you are running code with Node 14 that expects Node 18+. Check your version immediately.
- **ESM Modules**: This project uses `"type": "module"`. Ensure all scripts and commands respect this.
