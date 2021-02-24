import { GistsListResponseData } from '@octokit/types';

export const SHOW_MODAL = 'MODAL_SHOW_MODAL';
export const HIDE_MODAL = 'MODAL_HIDE_MODAL';

export interface ModalState {
  modalType: string;
  modalProps: ModalProps;
}

export type ModalProps = AccountModalProps | unknown;

type AccountModalProps = {
  onHideModal?: () => void;
  onSetAuthToken?: (token: string) => Promise<GistsListResponseData>;
  onSynchronizeGist?: (backupLocalSnippets: boolean, token: string, id: string) => Promise<string>;
  onCreateBackupGist?: (description: string, token: string) => Promise<string>;
  onDeleteAuthData?: () => void;
};

interface ShowModalAction {
  type: typeof SHOW_MODAL;
  modalType: string;
  modalProps: ModalProps;
}

interface HideModalAction {
  type: typeof HIDE_MODAL;
}

export type ModalActionTypes = ShowModalAction | HideModalAction;
