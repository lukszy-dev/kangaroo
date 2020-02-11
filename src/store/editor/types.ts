export const SHOW_GUTTER = 'EDITOR_SHOW_GUTTER';

export interface EditorState {
  gutter: boolean;
}

interface ShowGutterAction {
  type: typeof SHOW_GUTTER;
}

export type EditorActionTypes = ShowGutterAction;
