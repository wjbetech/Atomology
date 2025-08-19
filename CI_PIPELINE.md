# CI/CD Pipeline Plan for Atomology

```mermaid
graph TD
    A[Push or PR to GitHub] --> B[Install Dependencies]
    B --> C[Run Lint]
    C --> D[Run Build]
    D --> E[Run Tests (optional)]
    E --> F[Deploy (optional)]
```

## Pipeline Steps

1. **Trigger**: On push or pull request to `master` or any branch.
2. **Install**: `npm ci` for clean, reproducible installs.
3. **Lint**: Run `npm run lint` to check code quality.
4. **Build**: Run `npm run build` to ensure the app builds successfully.
5. **Test** (optional): Add and run tests if/when available.
6. **Deploy** (optional): Deploy to production or preview environment after successful checks.

---

## Example Workflow (GitHub Actions)

```yaml
name: CI
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      # - run: npm test # Uncomment if tests are added
```

---

## Visual Overview

- **Source**: GitHub repository
- **CI**: GitHub Actions
- **Checks**: Install → Lint → Build → (Test) → (Deploy)
- **Artifacts**: Build output, test results, deploy preview (if configured)

---

_This file is a living document. Update as the pipeline evolves!_

## Testing Configuration

For projects using Jest and React Testing Library, add the following to your Jest configuration:

```json
{
  "setupFilesAfterEnv": ["@testing-library/jest-dom"]
}
```
