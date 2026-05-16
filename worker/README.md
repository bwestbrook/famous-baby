# famousBaby Q&A worker

Tiny Cloudflare Worker that proxies `{ person, question }` from the front-end
to Anthropic's Messages API and returns `{ answer }`. The API key lives on the
server (as a Worker secret) so it never ships to the browser.

## One-time setup

1. **Install deps**

    ```bash
    cd worker
    npm install
    ```

2. **Log into Cloudflare** (opens a browser tab)

    ```bash
    npx wrangler login
    ```

3. **Set the Anthropic API key as a secret** (prompted, paste then enter)

    ```bash
    npm run secret
    # equivalent to: npx wrangler secret put ANTHROPIC_API_KEY
    ```

    Get a key at <https://console.anthropic.com/settings/keys>.

## Deploy

```bash
npm run deploy
```

Wrangler prints the public URL — something like:
`https://famous-baby-qa.<your-subdomain>.workers.dev`. Copy it.

## Wire the front-end

Edit `index.html` and uncomment the config line near the top of `<body>`:

```html
<script>
  window.FAMOUS_BABY_QA_ENDPOINT = 'https://famous-baby-qa.<your-subdomain>.workers.dev';
</script>
```

Reload the page; click any person → **Ask a question about [Name]** → type a
question → **Ask**. The answer renders inline.

## Local dev

```bash
npm run dev
```

Runs the worker at `http://localhost:8787`. To test against it, set
`window.FAMOUS_BABY_QA_ENDPOINT = 'http://localhost:8787'` in `index.html`.

Tail production logs in another terminal: `npm run tail`.

## Tuning

Open `qa-worker.js`:

- **`MODEL`** — defaults to `claude-haiku-4-5-20251001` (fast, cheap, ample for
  1–3 sentence answers). Swap for `claude-sonnet-4-6` for noticeably better
  answers at higher cost.
- **`MAX_QUESTION_LENGTH`** — caps the user's question length (500 chars).
- **`MAX_TOKENS`** — caps the response length (350 tokens ≈ ~260 words).
- **`CORS_HEADERS`** — tighten `Access-Control-Allow-Origin` from `*` to your
  site origin once you know your production URL.
- **`buildSystemPrompt`** — the editorial system prompt that instructs Claude
  to stay on-topic, admit uncertainty, and avoid personal info.

## Costs

Cloudflare Workers free tier: 100,000 requests/day. Anthropic billing is per
token — at the default Haiku 4.5 model with ~400-token system prompts and
~350-token responses, expect well under a cent per question.
