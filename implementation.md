# Data Quality & Periodic Table Mapping

- DONE: Canonical elements verified and normalized — `elements.json` contains the canonical 118 elements, and entries include `period` and `group` properties for HUD mapping. (Tests added to guard this.)

# Expanded Implementation Plan & Tasks

## 2. Improve Feedback (Sounds & Visualizations)

- DONE: Add sound effects for correct and incorrect answers.
- DONE: Add visual feedback (animations, color flashes, confetti, etc.) for right/wrong answers.
- Consider haptic feedback for mobile.

- DONE: Incorrect sound plays for Open Answer mode (centralised via `message` watcher in `Answer.tsx`).
- DONE: Confetti/sparks celebration anchored to the `Element` component (moved from global/centered portal to anchored viewport coords).
- DONE: Celebration sound added for Hangman mode when correct (plays when `wordGuessResult === 'correct'`).
- DONE: Sound toggle exposed in the `Footer` for Hangman mode and duplicate per-page toggle removed (single source of truth in `Footer.tsx`).

## 3. More Fluid Stylings (Wordle-like) - DONE

- DONE: Refine UI/UX to be more fluid and interactive, inspired by Wordle.
- DONE: Add smooth transitions, responsive layouts, and engaging color schemes.
- DONE: Consider dark/light mode and accessibility improvements.

## 4. Hangman-Style Game Mode - DONE

- DONE: Implement a new mode where users guess the element name letter by letter (like Hangman).
- DONE: Show blanks for each letter, track incorrect guesses, and provide hints.
- DONE: Integrate with existing state management and scoring.

## 5. Localized Personal Hiscores

- Store personal best scores for each mode locally (e.g., localStorage).
- Display hiscores on the main menu or after each game.
- Optionally, allow resetting or exporting scores.

## 6. Prevent Repeating Elements in a Game - DONE

- DONE: Ensure that each element is only presented once per game session, in any mode.
- Consider shuffling the element list at the start of each game for randomness.

# MVP

- The basic game with a working API call for elements, buttons to toggle game mode, score count

# Component Breakdown:

# Navbar Component - DONE:

- DONE: A simple functional component that renders the navigation bar, e.g., game title or links to home/about pages.

## Top Section — Game-focused header

- When a player is "in a game" the top area of the app should switch from a generic navbar to a game-focused header.
- DONE: Layout (desktop / responsive):
  - Left: level/progress indicator (e.g., "1/10"). This should be fixed to the left edge and clearly readable.
  - Center: the game mode title (e.g., "Hangman") — visually prominent, centered horizontally.
  - Right: live counter (e.g., heart or numeric lives left) — fixed to the right edge and animated on change.
- Behaviour and accessibility:
  - The header should be fixed at the top (or reserved height) so the rest of the game content flows beneath it.
  - All three regions must be responsive: on small screens consider stacking or reducing font sizes, but keep the title centered.
  - Use semantic markup and ARIA where appropriate (e.g., `role="status"` for live count changes) so screen readers announce important changes.
  - Keep the header lightweight and avoid heavy animations that cause layout shifts; use transform/opacity for visual transitions.
- DONE: Implementation notes:
  - Create a small, reusable `GameHeader` component that reads from the game store: progress/index, difficulty/total, lives, and current mode.
  - For Hangman specifically, compute `current/total` from the difficulty pool and `hangmanIndex` stored in the store so progress is deterministic.
  - Animate the lives counter with a small scale/opacity animation on change (use `framer-motion` or CSS transitions).
  - Respect focus and keyboard navigation; the header should not trap focus but should be announced when important changes occur.

# GameMode Component:

- DONE: Manages switching between different game modes: typing or multiple choice.
- DONE: This could store the selected mode in a state and pass the mode down as props to other components.

# Element Component:

- DONE: Responsible for fetching and displaying a random element.
- DONE: Use this component to pull from an API (like the periodic table data) and display the element’s atomic number.

# Answer Component:

- DONE: Renders either an input field (for typing) or four buttons (for multiple-choice).
- DONE: This component can take props like the current game mode (from GameMode) and the correct answer (from Element) to handle user interaction.

# Score Component:

- DONE: Displays the user’s score.
- DONE: It could be responsible for tracking how many correct/incorrect answers the user has submitted.

# Data Flow and State Management:

## Parent Component (App.tsx):

## DONE: Use App.tsx to hold the game state (e.g., element data, user input, game mode, and score). Pass down the relevant state and functions as props to child components.

## DONE: Custom Hook (useGameLogic): This hook could encapsulate logic such as fetching random elements, checking answers, and managing the score. It keeps your logic separate from UI code.

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

## Advanced Styles & Visuals

- Animated backgrounds that change with progress or game mode.
- Element cards with flipping, glowing, or 3D effects.
- Customizable avatars or mascots for user profiles.
- Dynamic soundtracks that adapt to gameplay intensity.
- Micro-interactions: subtle animations for every button, input, or correct/incorrect answer.

## Engagement & Retention Features

- Daily login rewards or streak bonuses.
- Seasonal events (e.g., "Elemental Winter Challenge").
- In-app notifications for new challenges, achievements, or friend activity.
- Community features: user-generated quizzes, comment sections, or forums.
- Integration with classroom/teacher dashboards for educational use.

## Accessibility & Inclusivity

- Dyslexia-friendly fonts and high-contrast modes.
- Adjustable font sizes and UI scaling.
- Voice-over or text-to-speech for questions and feedback.

## Monetization (Optional)

- Cosmetic-only in-app purchases (themes, avatars, sound packs).
- Ad-free upgrade or supporter badge.

## Data & Privacy

- Clear privacy policy and data export options.
- Parental controls for younger users.

## Multiplayer & Social Features

- Add a real-time or asynchronous multiplayer mode (compete with friends or random users).
- Implement leaderboards (local, friends, or global).
- Allow users to share scores or achievements on social media.

## Custom Game Modes & Settings

- Let users create custom quizzes (choose categories, number of questions, difficulty).
- Add a “timed mode” or “sudden death” mode for extra challenge.
- Allow users to toggle hints, sound, and visual effects in settings.

## In-Game Tutorials & Onboarding

- Add a guided tutorial for first-time users.
- Provide tooltips and contextual help throughout the app.

## Richer Element Data & Exploration

- Let users click on elements to see detailed info, history, and fun facts.
- Add a periodic table explorer or “encyclopedia” mode.

## Save & Resume Games

- Allow users to pause and resume games, or save progress mid-session.

## Theming & Customization

- Let users pick color themes, backgrounds, or UI layouts.
- Offer unlockable themes as rewards for achievements.

### Theme toggle — current state & follow-ups

- Current state (code pointers):

  - `useGameStore` (src/store/atomologyStore.ts) exposes `theme` and `setTheme` and already writes `data-theme` on `document.documentElement` when called.
  - `index.html` contains `html data-theme="system"` so the app starts in a system-driven mode by default.
  - `tailwind.config.js` lists theme names (`night`, `winter`) and `themeRoot: ":root"` which the CSS theme system uses.

- Known gaps / fixes to complete:
  1. Persist user selection: `setTheme` should persist the chosen theme to `localStorage` (and read it on store init) so toggles survive refresh.

2.  UI wiring: add a visible toggle control (e.g., in `Navbar` or a Settings panel) that calls `setTheme("light"|"dark"|"system")` and reflects current state.
3.  System preference handling: when user selects `system`, the app should follow `window.matchMedia("(prefers-color-scheme: dark)")` and update on changes.
4.  Accessibility: the toggle needs an accessible label, role, and keyboard handling; announce changes where appropriate for assistive tech.
5.  SSR / hydration safety: guard `document`/`window` access (store init) to avoid runtime errors in SSR/frontend tests.
6.  Visual QA: verify all theme-dependent elements (Navbar badges, buttons, modal borders, text contrast) across themes; add a small visual test matrix in README or CI notes.

- Acceptance criteria:

  - Theme selection persists across reloads and is controllable from the UI.
  - `data-theme` attribute always matches the visible theme and updates when `system` preference changes.
  - Contrast and accessibility checks pass for each theme (manual/automated checklist).

- DONE: `setTheme` persistence and safer startup checks implemented — startup code removes stale/invalid stored session data (e.g., hangmanPool), and theme selection is wired to the store. JSON-LD is injected at runtime from `src/main.jsx` to avoid accidental rendering.

## Localization & Internationalization

- Support multiple languages for broader reach.
- Use i18n libraries to make text easily translatable.

## Advanced Analytics & Insights

- Show users their answer accuracy by element, category, or over time.
- Provide insights like “elements you struggle with most.”

## User Profiles & Authentication (Optional)

- Allow users to create profiles to save progress, achievements, and hiscores across devices.
- Use a simple auth provider (Firebase Auth, Auth0, or similar) if you want cloud sync.

## Achievements & Progression

- Add unlockable achievements (e.g., “10 in a row,” “All Alkali Metals Correct,” “Perfect Game”).
- Show progress bars or badges for collecting all elements, mastering categories, etc.

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

### UI Bug: transient scrollbar flicker on navigation/reload

- Symptom: when returning to or reloading the main page the page briefly displays vertical and/or horizontal scrollbars (flicker) until the layout stabilizes.
- Steps to reproduce: load or reload the app on mobile/desktop, or navigate back to the main route; observe transient scrollbars during initial render/resize.
- Suspected causes: 100vh vs viewport chrome behavior, fixed header/footer heights not reserved, `w-screen`/100vw usage, or initial animations/margins causing a temporary overflow.
- Proposed fixes to try (in priority order):
  1. Use dynamic viewport height (`100dvh`) for root containers instead of `100vh`.

2.  Replace `w-screen` with `w-full` and use `inset-x-0` for fixed elements to avoid 100vw scrollbar issues.
3.  Make header/footer heights explicit and set main min-height to `calc(100dvh - <header> - <footer>)` so content never exceeds viewport height.
4.  Add `overflow-x: hidden` at root and `overflow-y: auto` on the main content area so only content scrolls when necessary.
5.  Debounce/disable heavy animations during initial mount to avoid transient layout shifts.

- Acceptance criteria:
  - On reload and when navigating back to the main page, no vertical or horizontal scrollbar should appear briefly on common desktop and mobile browsers (Chrome, Safari, and mobile WebViews) in typical viewport sizes.
  - Any fix must preserve accessibility (no hidden content) and not break fixed header/footer controls.

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

# Hangman Mode Improvements & UI/UX Tasks

1. Make the input+guess buttons a bit wider

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

3. Add social clickables on the Contact page

- Add icons for GitHub, Twitter, LinkedIn, etc., with accessible labels and `rel="noopener noreferrer" target="_blank"`.
- Make them keyboard-focusable with visible focus styles.

4. Ensure About, FAQ and Contact pages are responsive at all resolutions

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

2. Reduce the size of the atom name text and the margin between the letters and the lines
3. Fix the placeholder element text to look better, italicize it too
4. Animate correct answers with confetti — DONE (confetti anchored to element and triggered on correct)
5. Display what the correct answer was
6. Add a button to move to the next element
7. Display the guessed letters more visibly
8. Add the HUD and the HUD toggle to this game mode too — DONE (HUD toggle available via the Footer in hangman mode)
9. Consider fixing the routing, and ensure that players can return to the same game spot if they accidentally refresh
10. Make the Return to Main button the same width across all pages (refactor to its own component)

## Theme System Refactor

- **Massive refactor of the dark/light theme system:**

  - All components must support theme-specific styling using DaisyUI’s theme tokens and Tailwind’s `dark:`/`light:`/`data-theme` selectors.
  - Avoid Tailwind utility class clashes by using DaisyUI theme tokens (e.g., `bg-base-200`, `text-base-content`) and DaisyUI’s recommended approach for theme switching.
  - Remove or refactor any global or component-level CSS that overrides DaisyUI’s theme tokens in a way that causes specificity or cascade issues.

- **Color contrast compliance:**

  - All custom and default themes must be checked for WCAG color contrast compliance.
  - The “cupcake” DaisyUI theme is the reference for light mode, and “night” is the reference for dark mode.
  - All customizations must match or exceed the color contrast and accessibility of these reference themes.

  - Check colors across the app for sufficient contrast using recommended contrast guidelines (WCAG AA/AAA as appropriate) and document any fixes required.

- **DaisyUI setup and config:**

  - Tailwind and DaisyUI must be configured according to the [official DaisyUI documentation](https://daisyui.com/docs/install/).
  - `tailwind.config.js` should include:
    - `plugins: [require("daisyui")]`
    - `daisyui: { themes: ["cupcake", "night", ...] }`
    - `darkMode: "class"` (or as recommended by DaisyUI)
  - Remove any deprecated or conflicting Tailwind/DaisyUI config or plugin usage.
  - Ensure all theme switching is handled via DaisyUI’s `data-theme` attribute or class, not by manual Tailwind class toggling.
  - All custom CSS should use DaisyUI theme tokens and avoid hardcoded colors.

- **Testing and verification:**
  - Test all components in both light and dark themes.
  - Verify that all interactive elements (buttons, selects, etc.) have proper color contrast and hover/focus states in both themes.
  - Document any theme-specific overrides or exceptions in this file.

---

## Completed changes — 2025-08-23

Below are the concrete edits made during the recent refactor and fixes (manual edits by maintainer + patches applied by assistant). This is a concise changelog so reviewers can quickly see what changed and why.

- `src/components/pages/MultipleChoice.tsx` (manual & assistant)

  - Ensured the page file that App renders initializes `gameStarted` on mount.
  - Restored `Element` + `Answer` rendering and added a persistent `Score` overlay placement.
  - (Assistant) Added a small `useEffect` to set `gameStarted` when entering the page.

- `src/components/MultipleChoice.tsx` (manual)

  - Kept an alternate `MultipleChoice` implementation (note: consider consolidating duplicates).

- `src/components/sub-components/ReturnToMainButton.tsx` (manual)

  - Button implemented as a portal-fixed element with a confirmation modal; preserved navigation and state-reset logic.

- `src/components/pages/OpenAnswer.tsx` (manual)

  - Page-level edits to match the refactor (imports/placement of sub-components).

## New high-priority tasks (requested 2025-08-23)

1. Overhead SEO and icon creation

- PARTIAL / DONE: Meta tags (title, description, Open Graph, Twitter) and JSON-LD are in place — JSON-LD is injected at runtime from `src/main.jsx` to avoid accidental rendering as page text. Theme-aware SVG favicons (`/favicon-light.svg`, `/favicon-dark.svg`, `/favicon.svg`) and media-aware link tags plus a JS fallback were added.
- TODO: Generate PNG fallbacks (16x16, 32x32, 192x192, 512x512), add them to `public/`, update `manifest.json` icon entries, and add `sitemap.xml`/`robots.txt` to `public/` if desired.

2. Update the README.md

- Add a short project summary, development setup (Node version, npm install, npm run dev), and brief list of available scripts (lint/test/build/dev).
- Document theme toggling, environment variables, and where to find main components (App, Navbar, HUD, Hangman, Answer components).
- Add basic contribution notes and license information.

3. Fix small style discrepancies

- Lives text color: standardize via `getLivesColor` in `src/components/layout/Navbar.tsx` or switch to CSS variables/theme tokens so colors are theme-aware.
- Navbar: ensure header padding and link visibility match design (About/FAQ hidden in game modes; hangman header shows LEVEL/TITLE/LIVES centered/aligned).
- Footer: confirm footer spacing/padding consistent across breakpoints; fix any theme token overrides.
- FAQ & About pages: ensure consistent page padding, heading styles, and link colors; add missing semantic markup and aria attributes where relevant.

If you'd like, I can start implementing these in order (suggested priority: README + SEO/icons, then README, then style fixes). Which item should I start on first?

- Recent assistant & manual fixes (chronological, small summary):

  - Hangman: moved confetti to letter squares, unbounded via portal, auto-advance when all letters revealed, removed "Next Element" button from result UI, updated placeholder to "the element is...", resized letter boxes for mobile, added mobile padding to letters/input/keyboard.
  - Hangman keyboard: improved dark-theme visibility for incorrect picked letters (semi-transparent error bg).
  - Answer component: clear `playerAnswer` in-store after correct-answer flow to avoid transient incorrect styling on next round.
  - Navbar: show hangman header (LEVEL/TITLE/LIVES) in hangman mode; hide About/FAQ while in multi/open/hangman modes; lives color computed by `getLivesColor` (palette logic in `Navbar.tsx`).
  - HUDWrapper: HUD hidden in hangman mode.
  - ConfirmModal / ReturnToMainButton: responsive modal with safe padding, stacked actions on mobile, and ~45% button widths on larger screens.
  - Hangman difficulty select: replaced native select with a styled dropdown so the options box is rounded and constrained to the select width; increased select width and added mobile padding.
  - Layout: MultipleChoice/OpenAnswer pages adjusted so element/answers/controls sit higher on mobile; Score and Return buttons preserved as overlays.

These are the changes that were applied during the recent interactive refactor/test cycle.

- `src/components/layout/Footer.tsx` (manual)

  - Footer refactor to a 3-column layout: HUD toggle (left), attribution (center), `ThemeToggle` (right).

- `src/components/sub-components/ThemeToggle.jsx` (manual & assistant)

  - (Manual) Restored a toggle control wired to `useUIStore`.
  - (Assistant) Restored icon + text label, fixed JSX syntax, and adjusted styling:

    - Sun icon shown for light themes (yellow).
    - Moon icon rendered white in dark themes.
    - Label color uses `text-gray-400` in dark theme.

  - `src/components/sub-components/PeriodicTableHUD.tsx` (assistant)

    - DONE: Fixed HUD placement bug — `PeriodicTableHUD` now prefers `xpos`/`ypos` coordinates (falling back to `group`/`period`) when building the table so lanthanides/actinides (e.g., Erbium) occupy their intended HUD squares and guessed elements fill correctly.

Verification notes

- Quick static checks were run against the modified files; no syntax/type errors were reported for the edited files.
- Recommended next step: run the dev server and the test suite locally to confirm runtime behavior and visual correctness:

  - Run the dev server and manually verify the Multiple Choice page shows the `Score` and the Return to Main button and that `ThemeToggle` displays icon + label.
  - Run unit tests: `npm test` and a quick lint: `npm run lint`.

Follow-ups

- Consolidate duplicate `MultipleChoice` components into a single file to avoid future drift.
- Consider adding a tiny E2E smoke test that loads the Multiple Choice page and asserts the presence of Score and Return buttons.

## Additional requested tasks (2025-08-23)

The following items were requested to be added to the implementation backlog. Each item includes a short plan and acceptance criteria so we can pick them up and track progress.

1. Ensure that buttons look good on an entire range of mobile devices

   - What to do:
     - Audit all button components (`btn` usages, `AnswerButton`, `ReturnToMainButton`, modal buttons, keyboard buttons) for touch target size, padding, and spacing across breakpoints.
     - Standardize a small set of responsive utility classes (e.g., `px-6 py-2 sm:px-4 sm:py-1`, `w-full sm:w-auto`) and ensure text doesn't truncate.
     - Ensure accessible hit targets (minimum 44x44px) and focus outlines/icons are visible in all themes.
     - Add a small visual QA checklist and test screenshots for: iPhone SE, iPhone 12/13/14, Pixel 4/5/6, and a common Android mid-range device.
   - Acceptance criteria:
     - Buttons meet the 44x44 touch target rule on mobile.
     - No visual overlap with safe-area insets or fixed footer controls at common mobile widths.
     - Developer preview screenshots for at least 4 device sizes are saved under `docs/qa/screenshots/buttons/`.

2. Add a congratulations + confetti dialogue box when a user has completed a given game mode

   - What to do:
     - Reuse `ConfettiSparks` (portal-based) to show confetti anchored to the modal center.
     - Create a small `CompletionModal` component that displays summary stats (mode, score, correct answers) and action buttons (Replay, Return to Main, Share).
     - Trigger the modal from the existing end-of-mode logic (e.g., where `showGameOver` or session completion is detected) and ensure game state is paused while modal is visible.
   - Acceptance criteria:
     - Modal appears on completion for all game modes and is keyboard accessible (focus trap, Escape to close).
     - Confetti renders above UI (not clipped) and auto-stops after a short duration.
     - Modal includes actions to replay or return to main and correctly fires those handlers.

3. Fix the 119 counter for all elements (indexing issue)

- DONE: Off-by-one/119 counter fixed. `data/elements.json` contains 118 entries and a unit test asserts the canonical length; HUD/progress derive totals from the elements array.

4. Fix the JSON data which sometimes doesn't tick off a completed element in multiple choice/open answer mode
   - What to do:
     - Reproduce the failure path and identify whether it's data normalization (symbol/name mismatch), a store update race (state cleared before HUD update), or `addGuessedElement` being called with the wrong symbol.
     - Normalize all element symbol/name lookups to a canonical form (uppercase symbol, trimmed name) before adding to guessed set.
     - Ensure calls to `addGuessedElement` are executed within the same tick as score increment (or use a small microtask) and add defensive checks in the HUD component to reconcile guessed elements from persistent session storage.
     - Add unit/integration tests for the flow: correct answer → store updates → HUD shows element as guessed.
   - Acceptance criteria:
     - Elements are consistently marked guessed in HUD for Multi and Open modes immediately after correct answer.
     - Edge cases tested (duplicated answers, symbol case differences, timing/race conditions) are covered by tests.

Which of these would you like me to start on first? I suggest addressing (3) the 118 counter and (4) the JSON/HUD sync as high priority bugs.

## Suggested next tasks — prioritized (small, high-value)

Below are focused, actionable items I recommend adding to this implementation backlog. Each is small enough to implement and verify quickly.

1. PNG favicon fallbacks & manifest update (priority: High)

- What to do: create 16x16, 32x32, 192x192, and 512x512 PNGs from the existing SVG, add them to `public/`, and update `public/manifest.json` and `index.html` to reference them.
- Acceptance: browsers that don't support SVG favicons (older Android browsers, some crawlers) will show proper PNG icons; `manifest.json` includes PNG entries for installable PWA icons.

2. HUD rendering unit tests for lanthanides (priority: High)

- DONE: Added unit tests to verify lanthanide placement and guessed-state rendering. Tests added to `src/__tests__/PeriodicTableHUD.test.tsx` assert that Erbium (and Hydrogen) render in the HUD and toggle `bg-green-400` when present in the guessed set. All tests passed when added.

  - What was done: a Jest + React Testing Library test renders `PeriodicTableHUD` and checks `title` selectors and CSS classes to ensure correct placement and fill behavior.
  - Acceptance: test covers lanthanide placement and guards against regressions.

3. JSON/HUD sync integration test (priority: High)

- DONE: Added an integration test that uses the store action to update guessed elements and verifies the HUD updates. See `src/__tests__/PeriodicTableHUD.test.tsx` (integration block). The test renders `HUDWrapper`, toggles `gameStarted`, calls `useGameStore.getState().addGuessedElement('Er')` and asserts the Erbium cell is filled. All tests passed.

  - What was done: integration test simulates store flow and ensures HUD reflects store changes immediately.
  - Acceptance: deterministic test prevents race-condition regressions between scoring and HUD updates.

4. Small E2E smoke test (Playwright or Cypress) for Multiple Choice (priority: Medium)

- What to do: create a lightweight E2E that starts the app, navigates to Multiple Choice, answers one question correctly, and asserts Score, Return button, and HUD update.
- Acceptance: a single stable smoke test that runs fast in CI and surface regressions in core flows.

5. Accessibility quick audit & fixes (priority: Medium)

- What to do: run axe-core checks on key pages (Multiple Choice, Hangman, Open Answer), fix missing role/label issues, and ensure focus order for modals.
- Acceptance: no high-severity axe violations on core flows.

6. Consolidate duplicate `MultipleChoice` files (priority: Low)

- What to do: locate duplicate `MultipleChoice` implementations and consolidate into a single canonical component; add tests to cover its behavior.
- Acceptance: one source of truth for the page and preserved functionality.

7. CI: GitHub Actions workflow (priority: Medium)

- What to do: add `.github/workflows/ci.yml` to run install, lint, build, and tests on PRs. Optionally include a jobs matrix for Node versions.
- Acceptance: PRs show CI status; failing tests/blocking lint prevent merges.

8. Sitemap and robots (priority: Low)

- What to do: create `public/sitemap.xml` and `public/robots.txt` with basic entries and point to the canonical URL when available.
- Acceptance: files present in `public/` and reachable at `/<file>`.
