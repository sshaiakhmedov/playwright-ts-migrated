/**
 * Exit 0 when Playwright's bundled Chromium exists on disk, else exit 1.
 * Used by Husky to decide whether to run the full Chrome project locally.
 */
import fs from 'node:fs';
import { chromium } from 'playwright';

const exe = chromium.executablePath();
const ok = typeof exe === 'string' && exe.length > 0 && fs.existsSync(exe);
process.exit(ok ? 0 : 1);
