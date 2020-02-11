import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IpcRenderer } from "electron";

import { UIState } from "./ui/types";
import { AuthState } from "./auth/types";
import { SnippetsState } from "./snippets/types";
import { EditorState } from "./editor/types";
import { ModalState } from "./modal/types";

export interface RootState {
  ui: UIState;
  auth: AuthState;
  modal: ModalState;
  editor: EditorState;
  snippets: SnippetsState;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  IpcRenderer,
  Action<string>
>

export type AppDispatch = ThunkDispatch<
  RootState,
  IpcRenderer,
  Action<string>
>
