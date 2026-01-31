import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Emitter } from './emitter';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('Emitter', () => {
  const testDir = path.join(__dirname, '../test-output');

  beforeEach(async () => {
    await fs.remove(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('should emit a basic project', async () => {
    const spec = {
      name: 'Test App',
      slug: 'test-app',
      description: 'A test application',
      entities: []
    };

    const emitter = new Emitter({ outDir: testDir, spec });
    await emitter.emit();

    const pkgJson = await fs.readJson(path.join(testDir, 'package.json'));
    expect(pkgJson.name).toBe('test-app');

    const readme = await fs.readFile(path.join(testDir, 'README.md'), 'utf-8');
    expect(readme).toContain('Test App');
  });
});
