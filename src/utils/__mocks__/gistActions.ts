import {
  MOCK_CONTENT,
  MOCK_TITLE,
  MOCK_DESCRIPTION,
  MOCK_LAST_SYNCHRONIZED_GIST_DATE,
  UPDATED_AT,
  GIST_ID,
  MOCK_INVALID_TOKEN,
} from 'utils/test/mockSnippets';

// Example octokit responses
// https://developer.github.com/v3/gists/

const listResponse = {
  data: [
    {
      id: GIST_ID,
    },
  ],
};

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

const createResponse = {
  data: {
    id: GIST_ID,
    // eslint-disable-next-line @typescript-eslint/camelcase
    updated_at: UPDATED_AT,
  },
};

const updateResponse = MOCK_LAST_SYNCHRONIZED_GIST_DATE;

const errorResponse = 'ERROR';

export const listGists = jest.fn((token) => {
  return new Promise((resolve, reject) => {
    if (token === MOCK_INVALID_TOKEN) {
      reject(errorResponse);
    }
    resolve(listResponse);
  });
});

export const getGist = jest.fn(() => {
  return new Promise((resolve) => {
    resolve(getResponse);
  });
});

export const updateGist = jest.fn(() => {
  return new Promise((resolve) => {
    resolve(updateResponse);
  });
});

export const createGist = jest.fn(() => {
  return new Promise((resolve) => {
    resolve(createResponse);
  });
});
