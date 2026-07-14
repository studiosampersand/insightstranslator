const ENDPOINT = 'https://models.github.ai/inference/chat/completions';
const MIN_INTERVAL_MS = Math.max(0, Number(process.env.GITHUB_MODELS_MIN_INTERVAL_MS || 12000));

let lastRequestStartedAt = 0;

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function waitForRequestSlot() {
  const elapsed = Date.now() - lastRequestStartedAt;
  const remaining = MIN_INTERVAL_MS - elapsed;

  if (remaining > 0) {
    console.log(`Waiting ${Math.ceil(remaining / 1000)} seconds to respect the GitHub Models rate limit...`);
    await sleep(remaining);
  }

  lastRequestStartedAt = Date.now();
}

function retryDelayMs(response, attempt) {
  const retryAfterSeconds = Number(response.headers.get('retry-after'));
  if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
    return (retryAfterSeconds * 1000) + 1000;
  }

  const resetEpochSeconds = Number(response.headers.get('x-ratelimit-reset'));
  if (Number.isFinite(resetEpochSeconds) && resetEpochSeconds > 0) {
    return Math.max(2000, (resetEpochSeconds * 1000) - Date.now() + 1000);
  }

  // Fallback: 8s, 16s, 32s, then max 60s, plus a little jitter.
  return Math.min(60000, 8000 * (2 ** attempt)) + Math.floor(Math.random() * 1000);
}

export async function callGitHubModel({
  token,
  model,
  messages,
  temperature = 0.75,
  maxTokens = 500,
  maxAttempts = 5
}) {
  if (!token) throw new Error('GITHUB_TOKEN is missing.');

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await waitForRequestSlot();

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      })
    });

    if (response.ok) {
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error('GitHub Models returned no message content.');
      return content;
    }

    const body = await response.text();
    const retryable = response.status === 429 || response.status >= 500;

    if (retryable && attempt < maxAttempts - 1) {
      const delay = retryDelayMs(response, attempt);
      console.warn(
        `GitHub Models returned ${response.status}. ` +
        `Waiting ${Math.ceil(delay / 1000)} seconds before retry ${attempt + 2}/${maxAttempts}.`
      );
      await sleep(delay);
      continue;
    }

    throw new Error(`GitHub Models returned ${response.status}: ${body.slice(0, 1200)}`);
  }

  throw new Error('GitHub Models request failed after all retry attempts.');
}
