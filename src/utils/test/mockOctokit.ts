import Octokit from '@octokit/rest';
import { MOCK_CONTENT, MOCK_TITLE, MOCK_DESCRIPTION } from './mockSnippets';

const getResponse = {
  data: {
    files: {
      '2020-02-01T18:00:00.000Z': {
        filename: '2020-02-01T18:00:00.000Z',
        content: `[{
          "id":0,
          "title":"${MOCK_TITLE}",
          "content":"${MOCK_CONTENT}",
          "description":"${MOCK_DESCRIPTION}",
          "uuid":"4ec2c830-0678-4f64-8ea4-49d3160272c3"
        }]`,
      },
    },
  },
};

const updateResponse = {
  data: {},
};

const mockOctokit = (Octokit as unknown) as jest.Mock;
export default mockOctokit.mockImplementation(() => {
  return {
    gists: {
      get: jest.fn(
        () =>
          new Promise(resolve => {
            resolve(getResponse);
          }),
      ),
      update: jest.fn(
        () =>
          new Promise(resolve => {
            resolve(updateResponse);
          }),
      ),
    },
  };
});
