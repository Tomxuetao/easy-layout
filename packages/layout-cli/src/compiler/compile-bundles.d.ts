import type { LibraryFormats } from 'vite';
export type BundleOption = {
  minify?: boolean;
  formats: LibraryFormats[];
  external?: string[];
};
export declare function compileBundles(): Promise<void>;
