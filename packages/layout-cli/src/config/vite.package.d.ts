import type { InlineConfig } from 'vite';
import type { BundleOption } from '../compiler/compile-bundles.js';
export declare function getViteConfigForPackage({
  minify,
  formats,
  external,
}: BundleOption): InlineConfig;
