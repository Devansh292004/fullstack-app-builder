"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
const fs = require("fs-extra");
const path = require("path");
const handlebars_1 = require("handlebars");
class Emitter {
    constructor(options) {
        this.options = options;
    }
    async emit() {
        const { outDir, spec } = this.options;
        await fs.ensureDir(outDir);
        const templateDir = path.join(__dirname, 'templates');
        if (!fs.existsSync(templateDir)) {
            const devTemplateDir = path.join(process.cwd(), 'packages/generator/src/templates');
            if (fs.existsSync(devTemplateDir)) {
                await this.emitDir(devTemplateDir, outDir, spec);
            }
            else {
                throw new Error(`Template directory not found: ${templateDir}`);
            }
        }
        else {
            await this.emitDir(templateDir, outDir, spec);
        }
        if (spec.entities) {
            for (const entity of spec.entities) {
                await this.emitEntity(entity);
            }
        }
        console.log(`Project ${spec.name} emitted to ${outDir}`);
    }
    async emitDir(src, dest, context) {
        const items = await fs.readdir(src);
        for (const item of items) {
            const srcPath = path.join(src, item);
            const stats = await fs.stat(srcPath);
            if (stats.isDirectory()) {
                const destPath = path.join(dest, item);
                await fs.ensureDir(destPath);
                await this.emitDir(srcPath, destPath, context);
            }
            else if (item.endsWith('.hbs')) {
                const targetName = item.slice(0, -4);
                const templateContent = await fs.readFile(srcPath, 'utf-8');
                const template = handlebars_1.default.compile(templateContent);
                const result = template(context);
                await fs.outputFile(path.join(dest, targetName), result);
            }
        }
    }
    async emitEntity(entity) {
        const { outDir } = this.options;
        const backendSrc = path.join(outDir, 'backend/src');
        await fs.ensureDir(backendSrc);
        const controllerTemplate = `
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('${entity.name.toLowerCase()}s')
export class ${entity.name}Controller {
  constructor(private prisma: PrismaService) {}

  @Post()
  create(@Body() data: any) {
    return this.prisma.${entity.name.toLowerCase()}.create({ data });
  }

  @Get()
  findAll() {
    return this.prisma.${entity.name.toLowerCase()}.findMany();
  }
}
    `;
        await fs.outputFile(path.join(backendSrc, `${entity.name}.controller.ts`), controllerTemplate.trim());
    }
}
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map