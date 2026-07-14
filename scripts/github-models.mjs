const ENDPOINT = 'https://models.github.ai/inference/chat/completions';

export async function callGitHubModel({ token, model, messages, temperature = 0.75, maxTokens = 500 }) {
  if (!token) throw new Error('GITHUB_TOKEN is missing.');
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens })
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub Models returned ${response.status}: ${body.slice(0, 1200)}`);
  }
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('GitHub Models returned no message content.');
  return content;
}
