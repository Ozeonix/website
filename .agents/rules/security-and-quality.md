
---
trigger: always_on
description: Security, reliability, code review and testing requirements.
---

# Security and Quality Standards

## Security
- Never hardcode API keys, tokens or passwords.
- Never expose private environment variables.
- Validate and sanitize user input.
- Use secure authentication and authorization.
- Protect sensitive API endpoints.
- Follow secure dependency management practices.

## File Safety
- Inspect files before modifying them.
- Never delete important files without approval.
- Never overwrite existing configurations without reviewing them.
- Preserve working features.
- Ask before major architectural changes.

## Code Quality
- Write readable and maintainable code.
- Handle errors properly.
- Avoid unnecessary dependencies.
- Follow existing project conventions.
- Avoid fake implementations and placeholder functionality.

## Testing
- Run relevant tests after changes.
- Check for regressions.
- Review browser console and build errors.
- Verify important user journeys.

## Completion
Before declaring a task complete:
- Summarize files changed.
- Explain what was implemented.
- Report tests performed.
- Clearly mention unresolved issues.
