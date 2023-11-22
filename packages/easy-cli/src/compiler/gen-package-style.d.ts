type Options = {
  outputPath?: string;
  pathResolver?: (path: string) => string;
};
export declare function genPackageStyle(options?: Options): string | undefined;
export {};
