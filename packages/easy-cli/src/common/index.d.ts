import { getVantConfig } from './constant.js';
import { InlineConfig } from 'vite';
export declare const EXT_REGEXP: RegExp;
export declare const SFC_REGEXP: RegExp;
export declare const DEMO_REGEXP: RegExp;
export declare const TEST_REGEXP: RegExp;
export declare const ASSET_REGEXP: RegExp;
export declare const STYLE_REGEXP: RegExp;
export declare const SCRIPT_REGEXP: RegExp;
export declare const JSX_REGEXP: RegExp;
export declare const ENTRY_EXTS: string[];
export declare function removeExt(path: string): string;
export declare function replaceExt(path: string, ext: string): string;
export declare function hasDefaultExport(code: string): boolean;
export declare function getComponents(): string[];
export declare const isDir: (dir: string) => boolean;
export declare const isDemoDir: (dir: string) => boolean;
export declare const isTestDir: (dir: string) => boolean;
export declare const isAsset: (path: string) => boolean;
export declare const isSfc: (path: string) => boolean;
export declare const isStyle: (path: string) => boolean;
export declare const isScript: (path: string) => boolean;
export declare const isJsx: (path: string) => boolean;
export declare function camelize(str: string): string;
export declare function pascalize(str: string): string;
export declare function decamelize(str: string, sep?: string): string;
export declare function normalizePath(path: string): string;
export type ModuleEnv = 'esmodule' | 'commonjs';
export type NodeEnv = 'production' | 'development' | 'test';
export type BuildTarget = 'site' | 'package';
export declare function setModuleEnv(value: ModuleEnv): void;
export declare function setNodeEnv(value: NodeEnv): void;
export declare function setBuildTarget(value: BuildTarget): void;
export declare function isDev(): boolean;
export declare function smartOutputFile(
  filePath: string,
  content: string,
): void;
export declare function mergeCustomViteConfig(
  config: InlineConfig,
  mode: 'production' | 'development',
): Promise<InlineConfig>;
export { getVantConfig };
