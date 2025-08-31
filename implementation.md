# Expanded Implementation Plan & Tasks

## 1. Prevent Repeating Elements in a Game

- Ensure that each element is only presented once per game session, in any mode.
- Consider shuffling the element list at the start of each game for randomness.

## 2. Localized Personal Hiscores

- Store personal best scores for each mode locally (e.g., localStorage).
- Display hiscores on the main menu or after each game.
- Optionally, allow resetting or exporting scores.

## Top Section — Game-focused header

- Implement displaying the game mode title in the Open Answer page.

---

# Data Flow and State Management:

## Parent Component (App.tsx):

## Use App.tsx to hold the game state (e.g., element data, user input, game mode, and score). Pass down the relevant state and functions as props to child components.

## Custom Hook (useGameLogic): This hook could encapsulate logic such as fetching random elements, checking answers, and managing the score. It keeps your logic separate from UI code.

By splitting the components this way, you'll maintain cleaner code and separation of concerns. Each component will have a clear responsibility, and state/data can be easily shared via props or context if needed.

# Further Improvements for Shipping

# Ongoing Expansion: New Ideas, Styles, and Modalities

## Immersive & Next-Gen Experiences

- DONE: Cross-platform play: seamless experience on web, mobile, tablet, and desktop.

## Partnerships & Community

- Collaborate with science museums or educational organizations for exclusive content.
- Integrate with school systems for classroom leaderboards and assignments.

## Deeper Educational Content

- Add video or interactive lessons about atomic theory, chemistry history, and element uses.
- Include real-world applications and news about elements (e.g., "Element in the News").
- Provide links to external resources for further learning.

## Creative Game Modes

- "Speed Round": Answer as many as possible in 60 seconds.
- "Survival": One mistake ends the game—how far can you go?
- "Category Challenge": Only elements from a specific group (e.g., noble gases, transition metals).
- "Reverse Mode": Given the name, pick the correct symbol or atomic number.
- "Puzzle Mode": Drag-and-drop elements into the correct spot on a blank periodic table.
- "Story/Adventure Mode": Progress through levels or a narrative, unlocking new challenges and facts.

## Engagement & Retention Features

- Daily login rewards or streak bonuses.
- Seasonal events (e.g., "Elemental Winter Challenge").
- Integration with classroom/teacher dashboards for educational use.

## Accessibility & Inclusivity

- Dyslexia-friendly fonts and high-contrast modes.
- Adjustable font sizes and UI scaling.
- Voice-over or text-to-speech for questions and feedback.

## Multiplayer & Social Features

- Add a real-time or asynchronous multiplayer mode (compete with friends or random users).
- Implement leaderboards (local, friends, or global).
- Allow users to share scores or achievements on social media.

## Custom Game Modes & Settings

- Add a “timed mode” or “sudden death” mode for extra challenge.
- Allow users to toggle hints, sound, and visual effects in settings.

## In-Game Tutorials & Onboarding

- Add a guided tutorial for first-time users.
- Provide tooltips and contextual help throughout the app.

## Richer Element Data & Exploration

- Let users click on elements to see detailed info, history, and fun facts.
- Add a periodic table explorer or “encyclopedia” mode.

## Localization & Internationalization

- Support multiple languages for broader reach.
- Use i18n libraries to make text easily translatable.

## Advanced Analytics & Insights

- Show users their answer accuracy by element, category, or over time.
- Provide insights like “elements you struggle with most.”

## User Profiles & Authentication (Optional)

- Allow users to create profiles to save progress, achievements, and hiscores across devices.
- Use a simple auth provider (Firebase Auth, Auth0, or similar) if you want cloud sync.

## Daily/Weekly Challenges

- Implement a daily or weekly challenge mode with a unique set of elements or rules.
- Track streaks and compare with friends or global stats (if cloud features are added).

## Hints, Learning, and Explanations

- Offer hints (e.g., reveal atomic number, symbol, or category).
- After each answer, show a fun fact or explanation about the element.
- Add a “study mode” for learning before playing.

## Accessibility & Device Support

- Ensure keyboard navigation, screen reader support, and colorblind-friendly palettes.
- Optimize for mobile and tablet play.

## Polish & Bug Fixes

- Add loading skeletons, error boundaries, and robust input validation.
- Fix any UI/UX bugs, edge cases, or performance bottlenecks.

## Responsiveness & Layout (all resolutions)

Goal: Ensure the app layout and components behave and look correct across common device widths (mobile, tablet, laptop, desktop, and ultra-wide) and orientations, removing layout pain points and preventing transient visual glitches (scrollbar flicker, overflow shifts, clipped portals, etc.).

High-level tasks:

- Audit: capture screenshots and device sizes to reproduce layout issues (320px, 375px, 412px, 768px, 1024px, 1366px, 1440px, 1920px+).
- Replace fragile `100vh`/`100vw` usage with `100dvh` or JS-driven `--vh` where necessary. Prefer `w-full` over `w-screen` and explicit header/footer reserved heights.
- Ensure fixed headers/footers reserve space (use `calc(100dvh - <header> - <footer>)`) and avoid content jumps when theme or fonts load.
- Prevent horizontal overflow: audit `w-screen`/absolute positioned elements and add `overflow-x: hidden` at root where appropriate.
- Portals & modals: verify `createPortal` targets and ensure no clipping on small viewports; make modal content scrollable when necessary.
- Small-size tuning: optically adjust HUD, buttons, and label sizes for 16/32px favicons and low-density displays.
- Accessibility/responsiveness: ensure touch targets >= 44px, keyboard focus states visible, and no overlap of interactive elements on small screens.

Acceptance criteria:

- No transient vertical/horizontal scrollbar flicker in common viewports during initial load or navigation.
- Fixed header/footer never overlap or push critical controls in normal usage; main content fits within `calc(100dvh - header - footer)`.
- No horizontal scroll at standard breakpoints; `overflow-x` remains hidden or controlled.
- Modals and portal elements are fully visible and scrollable when viewport is too small to show them entirely.
- Visual regression tests (spot screenshots at key breakpoints) pass where configured.

Quick fixes to try (prioritized):

1. Replace global/static `height:100vh` uses with `height:calc(var(--vh, 1vh) * 100)` and set `--vh` on resize (already seeded in `index.html`).
2. Swap `w-screen` → `w-full` and ensure fixed elements use `inset-x-0` where needed.
3. Add `overflow-x: hidden` to `html, body` and set main content to `overflow-y: auto`.
4. Reserve explicit space for header/footer and compute main min-height using CSS `calc()`.
5. Add a small visual/acceptance test matrix in the README and include a CI job that captures screenshot diffs at a few breakpoints.

Who should own this: front-end/UI developer + QA. This work can be split into an audit ticket, a quick fixes PR (low risk), and a follow-up visual regression job.

## Analytics & Feedback

- Add basic analytics to understand user behavior (page views, game completions, etc.).
- Provide a feedback form or link for users to report bugs or suggest features.

# CI/CD, Code Quality & Automation

## Continuous Integration (CI)

- Set up GitHub Actions (or another CI provider) to run on every pull request and push to main:
  - Install dependencies
  - Run `npm run lint` to enforce code style and catch errors
  - Run `npm run build` to ensure the app builds successfully
  - (When available) Run automated tests (e.g., `npm test`)
- Add status badges to the README for build/lint/test status

## Continuous Deployment (CD)

- Automate deployment to Vercel, Netlify, or GitHub Pages on successful build of the main branch
- Optionally, set up preview deployments for pull requests

## Code Quality & Security

- Add static analysis tools (e.g., ESLint, Prettier, TypeScript strict mode)
- (Optional) Add code coverage reporting and enforce minimum thresholds
- (Optional) Add security scanning for dependencies

## Example Workflow Steps

- Checkout code
- Set up Node.js
- Install dependencies
- Run lint, build, and test scripts
- Deploy if on main branch

# Deployment & PWA

- Make the app installable as a Progressive Web App (PWA) for offline play.
- Set up automated deployment (e.g., Vercel, Netlify, or GitHub Pages).

## About, FAQ & Contact pages

Goal: Improve content quality, add a Contact page with a working message form and social links, and ensure About/FAQ/Contact are responsive across resolutions.

Tasks:

1. Fix the content of the About and FAQ pages

- Audit copy for clarity, tone, and accuracy.
- Improve headings, microcopy, and accessible semantics (use landmarks, aria labels where appropriate).
- Add small author bio and purpose statement on About page.

2. Add a Contact page with contact info + message form

- Create `src/components/pages/Contact.tsx` (or `pages/contact` folder) with a clear contact block (email, optional phone/location) and a message form (name, email, message, submit).
- Implement client-side validation (required fields, email format) and friendly success/error messages.
- For form delivery, recommend one of these non-breaking options:
  - Netlify Forms (static, no server required)
  - EmailJS or Formspree (third-party form forwarding)
  - Small serverless function (Lambda/Netlify function) that sends mail via SMTP/SendGrid
- Provide graceful fallback (mailto: link) if no form backend is configured.

3. Ensure About, FAQ and Contact pages are responsive at all resolutions

- Mobile-first layout, test at 320, 375, 412, 768, 1024, 1366, 1440, 1920px.
- Use responsive utility classes / CSS grid or flex to reflow content; ensure touch targets >=44px.
- Ensure forms don’t overflow; inputs should stretch to available width and stack on small screens.
- Verify footer/header don’t overlap content; reserve space as needed.

Acceptance criteria

- About, FAQ and Contact pages updated and deployed in the codebase.
- Contact page includes a working client-side validated form and either a configured backend option or mailto fallback.
- Social links present, accessible, and open in new tabs.
- Responsive behavior verified across the key breakpoints; no horizontal overflow or clipped content.

Implementation notes

- Prefer React functional components under `src/components/pages/` to keep folder consistent with existing pages.
- Reuse `Layout` and `Footer` components so the footer sound toggle and theme toggle remain consistent across pages.
- If you want me to implement the Contact form and wire it to a specific delivery method (Netlify/EmailJS/serverless), tell me which provider and I will implement it and add deployment notes.

1. Consider fixing the routing, and ensure that players can return to the same game spot if they accidentally refresh

## New high-priority tasks (requested 2025-08-23)

1. Update the README.md

- Add a short project summary, development setup (Node version, npm install, npm run dev), and brief list of available scripts (lint/test/build/dev).
- Document theme toggling, environment variables, and where to find main components (App, Navbar, HUD, Hangman, Answer components).
- Add basic contribution notes and license information.

2. Refactor Components to Stay DRY

- Consolidate duplicate `MultipleChoice` components into a single file to avoid future drift.
- Consider adding a tiny E2E smoke test that loads the Multiple Choice page and asserts the presence of Score and Return buttons.

## Suggested next tasks — prioritized (small, high-value)

Below are focused, actionable items I recommend adding to this implementation backlog. Each is small enough to implement and verify quickly.

1. Small E2E smoke test (Playwright or Cypress) for Multiple Choice (priority: Medium)

- What to do: create a lightweight E2E that starts the app, navigates to Multiple Choice, answers one question correctly, and asserts Score, Return button, and HUD update.
- Acceptance: a single stable smoke test that runs fast in CI and surface regressions in core flows.

2. Accessibility quick audit & fixes (priority: Medium)

- What to do: run axe-core checks on key pages (Multiple Choice, Hangman, Open Answer), fix missing role/label issues, and ensure focus order for modals.
- Acceptance: no high-severity axe violations on core flows.

3. CI: GitHub Actions workflow (priority: Medium)

- What to do: add `.github/workflows/ci.yml` to run install, lint, build, and tests on PRs. Optionally include a jobs matrix for Node versions.
- Acceptance: PRs show CI status; failing tests/blocking lint prevent merges.

4. Sitemap and robots (priority: Low)

- What to do: create `public/sitemap.xml` and `public/robots.txt` with basic entries and point to the canonical URL when available.
- Acceptance: files present in `public/` and reachable at `/<file>`.
