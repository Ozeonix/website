# User Constraints & Working Rules

> **CRITICAL**: These constraints MUST be adhered to across every interaction without exception.

## 1. Execution Constraints
- **NEVER RUN THE DEV SERVER**: Do not execute `npm run dev`, `vite`, `node`, or any local server command under any circumstances.
- **NEVER RUN GIT PUSH**: Never run `git push` or push commits via automated tools. Always print the exact push command in chat for the user:
  ```bash
  git push origin main
  ```

## 2. Git Commit Rules
Commit messages must strictly adhere to:
```
<type>: <short description>
```
- **Allowed Types**: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `style`, `chore`, `build`, `ci`, `revert`.
- **Formatting**:
  - Short, specific, professional, and imperative wording.
  - Start description with lowercase letter.
  - No ending period.
  - No emojis.
  - No mention of AI, agents, or generated code.
  - Exactly one logical change per commit.
  - Only stage intended files (review with `git diff --cached --stat`).

## 3. Verification Protocol
Before finalizing any implementation:
1. `npm run build` must compile cleanly.
2. `npm run lint` must pass with 0 errors.
3. Code formatting must pass via `npx prettier --write <files>`.

