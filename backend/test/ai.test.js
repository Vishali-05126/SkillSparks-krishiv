const test = require('node:test');
const assert = require('node:assert/strict');

const { handleAiChat } = require('../server');

const originalFetch = global.fetch;

function mockFetch(responseBody, status = 200) {
  global.fetch = async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => responseBody,
  });
}

test.afterEach(() => {
  global.fetch = originalFetch;
});

test('AI chat returns a configuration error when no API key is configured', async () => {
  const response = await handleAiChat({
    method: 'POST',
    body: { prompt: 'Tell me about skill swapping' },
  }, {
    OPENAI_API_KEY: '',
    OPENAI_MODEL: 'gpt-4o-mini',
  });

  assert.equal(response.status, 500);
  assert.match(response.body.message, /API key/i);
});

test('AI chat accepts a prompt payload with a valid body', async () => {
  const payload = { prompt: 'Help me find a Python partner' };
  mockFetch({
    choices: [{ message: { content: 'Try a Python and design swap.' } }],
  });

  const response = await handleAiChat({
    method: 'POST',
    body: payload,
  }, {
    OPENAI_API_KEY: 'test-key',
    OPENAI_MODEL: 'gpt-4o-mini',
    OPENAI_BASE_URL: 'https://api.openai.com/v1',
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.prompt, payload.prompt);
  assert.match(response.body.answer, /Python/i);
});
