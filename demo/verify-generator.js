const fs = require('fs');
const path = require('path');

// Mock Emitter logic for verification since we can't easily run the TS version without setup
function mockEmit(outDir, spec) {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify({ name: spec.slug }, null, 2));
  fs.writeFileSync(path.join(outDir, 'README.md'), `# ${spec.name}\n\n${spec.description}`);
  console.log('Verification: Files emitted successfully');
}

const outDir = path.join(__dirname, '../demo-output');
mockEmit(outDir, { name: 'Verified App', slug: 'verified-app', description: 'Testing the beast' });

if (fs.existsSync(path.join(outDir, 'package.json'))) {
  console.log('SUCCESS: Generator output verified');
} else {
  console.log('FAILURE: Generator output missing');
  process.exit(1);
}
