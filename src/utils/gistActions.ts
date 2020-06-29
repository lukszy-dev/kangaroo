import { Octokit } from '@octokit/rest';
import { OctokitResponse, GistsListResponseData, GistsGetResponseData, GistsCreateResponseData } from '@octokit/types';
import Snippet from 'models/Snippet';

const listGists = (authToken: string): Promise<OctokitResponse<GistsListResponseData>> => {
  const octokit = new Octokit({ auth: authToken });
  return octokit.gists.list({
    headers: { 'If-None-Match': '' },
  });
};

const getGist = (authToken: string, backupGistId: string): Promise<OctokitResponse<GistsGetResponseData>> => {
  const octokit = new Octokit({ auth: authToken });
  return octokit.gists.get({
    // eslint-disable-next-line @typescript-eslint/camelcase
    gist_id: backupGistId,
    headers: { 'If-None-Match': '' },
  });
};

const updateGist = (authToken: string, backupGistId: string, snippets: Snippet[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const octokit = new Octokit({ auth: authToken });
    const filename = new Date().toISOString();
    const request = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      gist_id: backupGistId,
      files: {
        [filename]: {
          filename,
          content: JSON.stringify(snippets),
        },
      },
    };

    octokit.gists
      .update(request)
      .then(() => {
        resolve(filename);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createGist = (
  authToken: string,
  gistDescription: string,
  snippets: Snippet[],
): Promise<OctokitResponse<GistsCreateResponseData>> => {
  const octokit = new Octokit({ auth: authToken });
  const fileName = new Date().toISOString();
  const request = {
    description: gistDescription,
    public: false,
    files: {
      [fileName]: {
        content: JSON.stringify(snippets),
      },
    },
  };

  return octokit.gists.create(request);
};

export { listGists, getGist, updateGist, createGist };
