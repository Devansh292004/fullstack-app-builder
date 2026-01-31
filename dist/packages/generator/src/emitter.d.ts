export interface GeneratorOptions {
    outDir: string;
    spec: any;
}
export declare class Emitter {
    private options;
    constructor(options: GeneratorOptions);
    emit(): Promise<void>;
    private emitDir;
    private emitEntity;
}
