import { MOCK_CONTENT, MOCK_TITLE, MOCK_DESCRIPTION, MOCK_LAST_SYNCHRONIZED_GIST_DATE } from 'utils/test/mockSnippets';

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

const updateResponse = MOCK_LAST_SYNCHRONIZED_GIST_DATE;

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
