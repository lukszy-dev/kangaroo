export const TEXT = 'text';
export const JAVASCRIPT = 'javascript';
export const TYPESCRIPT = 'typescript';
export const JAVA = 'java';
export const XML = 'xml';
export const CSS = 'css';
export const SCSS = 'scss';
export const MARKDOWN = 'markdown';
export const SQL = 'sql';
export const JSON_MODE = 'json';
export const HTML = 'html';
export const CSHARP = 'csharp';

interface LanguageItem {
  [key: string]: { label: string; extension: string };
}

const languages: LanguageItem = {
  [TEXT]: {
    label: 'Text',
    extension: '',
  },
  [JAVASCRIPT]: {
    label: 'JavaScript',
    extension: 'js',
  },
  [TYPESCRIPT]: {
    label: 'TypeScript',
    extension: 'ts',
  },
  [JAVA]: {
    label: 'Java',
    extension: 'java',
  },
  [XML]: {
    label: 'XML',
    extension: 'xml',
  },
  [CSS]: {
    label: 'CSS',
    extension: 'css',
  },
  [SCSS]: {
    label: 'SCSS',
    extension: 'scss',
  },
  [MARKDOWN]: {
    label: 'Markdown',
    extension: 'md',
  },
  [SQL]: {
    label: 'SQL',
    extension: 'sql',
  },
  [JSON_MODE]: {
    label: 'JSON',
    extension: 'json',
  },
  [HTML]: {
    label: 'HTML',
    extension: 'html',
  },
  [CSHARP]: {
    label: 'C#',
    extension: 'cs',
  },
};

export { languages };
