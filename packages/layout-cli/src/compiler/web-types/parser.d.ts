type TableContent = {
  head: string[];
  body: string[][];
};
export type Article = {
  type: string;
  content?: string;
  table?: TableContent;
  level?: number;
};
export type Articles = Article[];
export declare function mdParser(input: string): Articles;
export {};
