# Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Rules

- **Type**: Must be one of `feat`, `fix`, `chore`, `docs`, etc. (all lowercase, not empty).
- **Scope**: Optional. Use to clarify the area affected (e.g., `api`, `ui`).
- **Subject**:
  - Must not be empty.
  - Use lowercase (not sentence-case, start-case, PascalCase, or UPPERCASE).
  - Do not end with a period.
  - Reference code elements (functions, classes, files) in backticks.
  - Must be 80 characters or less.
- **Body** (optional):
  - Describe the change in detail.
  - Start with a blank line.
  - Each line must be 80 characters or less.
- **Footer** (optional):
  - Start with a blank line.
  - Each line must be 80 characters or less.

## Examples

```
feat(api): add `getUser` endpoint

Add a new endpoint to fetch user data by ID.
BREAKING CHANGE: The old `fetchUser` method has been removed.
```

```
fix(ui): correct button alignment

Fixes the alignment issue of the primary button in the header.
This was causing the button to overlap with the logo on smaller screens.
```

```
docs: update installation instructions
```

```
chore(deps): update dependency `lodash` to version 4.17.21

This update includes several bug fixes and performance improvements.
```
