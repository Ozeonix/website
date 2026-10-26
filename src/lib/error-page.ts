export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #F4F7FA; color: #06294B; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: 0 4px 12px rgba(6, 41, 75, 0.08); }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; color: #06294B; }
      p { color: #4B5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 6px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; font-weight: 600; }
      .primary { background: #FF6900; color: #FFFFFF; }
      .primary:hover { background: #E85F00; }
      .secondary { background: #FFFFFF; color: #06294B; border-color: #E5E7EB; }
      .secondary:hover { background: #F8FAFC; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
