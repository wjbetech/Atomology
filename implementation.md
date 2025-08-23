# Data Quality & Periodic Table Mapping

- Verify that `elements.json` contains all 118 elements.
- Ensure every element has both `period` and `group` properties for correct mapping in the HUD/grid.
- Add missing `period`/`group` values to any elements that lack them, so every element is represented by a box in the periodic table HUD.

# Expanded Implementation Plan & Tasks

## 2. Improve Feedback (Sounds & Visualizations)

- Add sound effects for correct and incorrect answers.
- Add visual feedback (animations, color flashes, confetti, etc.) for right/wrong answers.
- Consider haptic feedback for mobile.

## 3. More Fluid Stylings (Wordle-like)

- Refine UI/UX to be more fluid and interactive, inspired by Wordle.
- Add smooth transitions, responsive layouts, and engaging color schemes.
- Consider dark/light mode and accessibility improvements.

## 4. Hangman-Style Game Mode

- Implement a new mode where users guess the element name letter by letter (like Hangman).
- Show blanks for each letter, track incorrect guesses, and provide hints.
- Integrate with existing state management and scoring.

## 5. Localized Personal Hiscores

- Store personal best scores for each mode locally (e.g., localStorage).
- Display hiscores on the main menu or after each game.
- Optionally, allow resetting or exporting scores.

## 6. Prevent Repeating Elements in a Game

- Ensure that each element is only presented once per game session, in any mode.
- Track which elements have been used and only reset after all 150 have been played.
- Consider shuffling the element list at the start of each game for randomness.

# MVP

- The basic game with a working API call for elements, buttons to toggle game mode, score count

# Component Breakdown:

# Navbar Component:

- A simple functional component that renders the navigation bar, e.g., game title or links to home/about pages.

## Top Section — Game-focused header

- When a player is "in a game" the top area of the app should switch from a generic navbar to a game-focused header.
- Layout (desktop / responsive):
  - Left: level/progress indicator (e.g., "1/10"). This should be fixed to the left edge and clearly readable.
  - Center: the game mode title (e.g., "Hangman") — visually prominent, centered horizontally.
  - Right: live counter (e.g., heart or numeric lives left) — fixed to the right edge and animated on change.
- Behaviour and accessibility:
  - The header should be fixed at the top (or reserved height) so the rest of the game content flows beneath it.
  - All three regions must be responsive: on small screens consider stacking or reducing font sizes, but keep the title centered.
  - Use semantic markup and ARIA where appropriate (e.g., `role="status"` for live count changes) so screen readers announce important changes.
  - Keep the header lightweight and avoid heavy animations that cause layout shifts; use transform/opacity for visual transitions.
- Implementation notes:
  - Create a small, reusable `GameHeader` component that reads from the game store: progress/index, difficulty/total, lives, and current mode.
  - For Hangman specifically, compute `current/total` from the difficulty pool and `hangmanIndex` stored in the store so progress is deterministic.
  - Animate the lives counter with a small scale/opacity animation on change (use `framer-motion` or CSS transitions).
  - Respect focus and keyboard navigation; the header should not trap focus but should be announced when important changes occur.

# GameMode Component:

- Manages switching between different game modes: typing or multiple choice.
- This could store the selected mode in a state and pass the mode down as props to other components.

# Element Component:

- Responsible for fetching and displaying a random element.
- Use this component to pull from an API (like the periodic table data) and display the element’s atomic number.

# Answer Component:

- Renders either an input field (for typing) or four buttons (for multiple-choice).
- This component can take props like the current game mode (from GameMode) and the correct answer (from Element) to handle user interaction.

# Score Component:

- Displays the user’s score.
- It could be responsible for tracking how many correct/incorrect answers the user has submitted.

# Data Flow and State Management:

## Parent Component (App.tsx):

## Use App.tsx to hold the game state (e.g., element data, user input, game mode, and score). Pass down the relevant state and functions as props to child components.

## Custom Hook (useGameLogic): This hook could encapsulate logic such as fetching random elements, checking answers, and managing the score. It keeps your logic separate from UI code.

By splitting the components this way, you'll maintain cleaner code and separation of concerns. Each component will have a clear responsibility, and state/data can be easily shared via props or context if needed.

# Further Improvements for Shipping

# Ongoing Expansion: New Ideas, Styles, and Modalities

## Immersive & Next-Gen Experiences

- Augmented Reality (AR) mode: Scan real-world objects to unlock elements or play mini-games.
- Virtual Reality (VR) periodic table exploration and quizzes.
- Cross-platform play: seamless experience on web, mobile, tablet, and desktop.
- Smartwatch mini-games for quick learning bursts.

## AI-Powered Features

- Adaptive difficulty: AI adjusts question difficulty based on user performance.
- AI-generated custom quizzes based on user weaknesses.
- AI tutor: personalized hints, explanations, and encouragement.

## Partnerships & Community

- Collaborate with science museums or educational organizations for exclusive content.
- Host live events or tournaments with prizes.
- Integrate with school systems for classroom leaderboards and assignments.

## Deeper Educational Content

- Add video or interactive lessons about atomic theory, chemistry history, and element uses.
- Include real-world applications and news about elements (e.g., "Element in the News").
- Provide links to external resources for further learning.

## Gamification & Progression

- Season passes or progression tracks with unlockable content.
- Collectible badges, stickers, or digital trophies.
- Leveling system for users and/or avatars.

## User-Generated Content

- Allow users to create and share their own quizzes, puzzles, or stories.
- Voting and rating system for community content.

## Parental & Teacher Tools

- Progress dashboards for parents/teachers.
- Customizable assignments and homework tracking.

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
2. Reduce the size of the atom name text and the margin between the letters and the lines
3. Fix the placeholder element text to look better, italicize it too
4. Animate correct answers with confetti
5. Display what the correct answer was
6. Add a button to move to the next element
7. Display the guessed letters more visibly
8. Add the HUD and the HUD toggle to this game mode too
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

- `src/components/layout/Footer.tsx` (manual)

  - Footer refactor to a 3-column layout: HUD toggle (left), attribution (center), `ThemeToggle` (right).

- `src/components/sub-components/ThemeToggle.jsx` (manual & assistant)
  - (Manual) Restored a toggle control wired to `useUIStore`.
  - (Assistant) Restored icon + text label, fixed JSX syntax, and adjusted styling:
    - Sun icon shown for light themes (yellow).
    - Moon icon rendered white in dark themes.
    - Label color uses `text-gray-400` in dark theme.

Verification notes

- Quick static checks were run against the modified files; no syntax/type errors were reported for the edited files.
- Recommended next step: run the dev server and the test suite locally to confirm runtime behavior and visual correctness:

  - Run the dev server and manually verify the Multiple Choice page shows the `Score` and the Return to Main button and that `ThemeToggle` displays icon + label.
  - Run unit tests: `npm test` and a quick lint: `npm run lint`.

Follow-ups

- Consolidate duplicate `MultipleChoice` components into a single file to avoid future drift.
- Consider adding a tiny E2E smoke test that loads the Multiple Choice page and asserts the presence of Score and Return buttons.
