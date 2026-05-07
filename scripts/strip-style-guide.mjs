import { rm } from 'node:fs/promises';
import path from 'node:path';

const target = path.join(process.cwd(), 'out', 'style-guide');

try {
  await rm(target, { recursive: true, force: true });
  console.log(`[strip-style-guide] removed ${target}`);
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}
