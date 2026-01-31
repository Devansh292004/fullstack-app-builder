import * as fs from 'fs-extra';
import * as path from 'path';
import Handlebars from 'handlebars';

export interface GeneratorOptions {
  outDir: string;
  spec: any;
}

export class Emitter {
  constructor(private options: GeneratorOptions) {}

  async emit() {
    const { outDir, spec } = this.options;
    await fs.ensureDir(outDir);

    const templateDir = path.join(__dirname, 'templates');

    // Recursive emission helper
    await this.emitDir(templateDir, outDir, spec);

    console.log(`Project ${spec.name} emitted to ${outDir}`);
  }

  private async emitDir(src: string, dest: string, context: any) {
    const items = await fs.readdir(src);
    for (const item of items) {
      const srcPath = path.join(src, item);
      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        const destPath = path.join(dest, item);
        await fs.ensureDir(destPath);
        await this.emitDir(srcPath, destPath, context);
      } else if (item.endsWith('.hbs')) {
        const targetName = item.slice(0, -4);
        const templateContent = await fs.readFile(srcPath, 'utf-8');
        const template = Handlebars.compile(templateContent);
        const result = template(context);
        await fs.outputFile(path.join(dest, targetName), result);
      }
    }
  }
}
