import Octokit, { GistsGetResponse, GistsCreateResponse, GistsListResponse } from '@octokit/rest';
import Snippet from 'models/Snippet';

const listGists = (authToken: string): Promise<Octokit.Response<GistsListResponse>> => {
  const octokit = new Octokit({ auth: authToken });
  return octokit.gists.list({
    headers: { 'If-None-Match': '' },
  });
};

const getGist = (authToken: string, backupGistId: string): Promise<Octokit.Response<GistsGetResponse>> => {
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
    const fileName = new Date().toISOString();
    const request = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      gist_id: backupGistId,
      files: {
        [fileName]: {
          content: JSON.stringify(snippets),
        },
      },
    };

    octokit.gists
      .update(request)
      .then(() => {
        resolve(fileName);
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
): Promise<Octokit.Response<GistsCreateResponse>> => {
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
