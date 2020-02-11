import { GistsListResponseItem } from "@octokit/rest";

export const SET_GH_DATA = 'AUTH_SET_GH_DATA';
export const SET_GISTS = 'AUTH_SET_GISTS';
export const CLEAR_GH_DATA = 'AUTH_CLEAR_GH_DATA';

export interface AuthState {
  token: string;
  gists: Array<any>;
  backupGistId: string;
  lastSychronizedGistDate: string;
}

interface SetGitHubDataAction {
  type: typeof SET_GH_DATA;
  token: string;
  backupGistId: string;
  lastSychronizedGistDate: string;
}

interface SetGistsAction {
  type: typeof SET_GISTS;
  gists: Array<GistsListResponseItem>;
}

interface ClearAuthDataAction {
  type: typeof CLEAR_GH_DATA;
}

export type AuthActionTypes =
  SetGitHubDataAction | SetGistsAction |
  ClearAuthDataAction;
