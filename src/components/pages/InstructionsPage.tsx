import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * How-to-play guide. Styled to DESIGN.md: each mode is a specimen card
 * with its category accent, separated by emission-line dividers, and
 * the visuals are live token-styled mockups (they can't go stale).
 */

function EmissionDivider() {
  return (
    <div aria-hidden className="flex justify-center gap-2 my-14">
      <span className="h-0.5 w-10 rounded-full bg-sodium/70" />
      <span className="h-0.5 w-4 rounded-full bg-copper/70" />
      <span className="h-0.5 w-16 rounded-full bg-argon/70" />
    </div>
  );
}

function ModeCard({
  eyebrow,
  accent,
  title,
  win,
  children,
  visual,
}: {
  eyebrow: string;
  accent: string;
  title: string;
  win: string;
  children: ReactNode;
  visual: ReactNode;
}) {
  return (
    <div className="relative rounded-md border border-hairline bg-bench overflow-hidden">
      <div
        aria-hidden
        className="h-[3px] w-full"
        style={{ backgroundColor: accent }}
      />
      <div className="p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-2">
            {eyebrow}
          </p>
          <h2 className="text-xl font-bold text-specimen mb-2">{title}</h2>
          <div className="text-annotation leading-relaxed max-w-prose">
            {children}
          </div>
          <p className="mt-3 text-sm">
            <span className="font-mono uppercase tracking-wider text-annotation">
              Win:{" "}
            </span>
            <span className="text-specimen/90">{win}</span>
          </p>
        </div>
        <div className="justify-self-center">{visual}</div>
      </div>
    </div>
  );
}

export default function InstructionsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-annotation mb-3">
        How to play
      </p>
      <h1 className="font-display text-specimen text-3xl md:text-4xl tracking-wide mb-6">
        INSTRUCTIONS
      </h1>
      <p className="text-annotation leading-relaxed max-w-prose">
        Atomology turns the periodic table into three quick games. Pick a mode
        on the Configure page, play a session, and watch your light fill up.
        No accounts — everything stays in your browser.
      </p>

      <EmissionDivider />

      {/* Multiple Choice */}
      <ModeCard
        eyebrow="Mode 01 · Multiple Choice"
        accent="#45C4FF"
        title="See the symbol, name the element"
        win="Finish your chosen session length"
        visual={
          <div className="rounded-md border border-hairline bg-slide p-4 w-56 space-y-2">
            <div className="text-center border border-hairline rounded-sm py-2 mb-3">
              <p className="font-mono text-[10px] text-annotation">11</p>
              <p className="font-display text-2xl text-sodium">Na</p>
            </div>
            <button
              type="button"
              tabIndex={-1}
              className="w-full rounded-pill border-2 border-copper bg-copper/15 text-copper px-3 py-1.5 text-sm"
            >
              Sodium
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="w-full rounded-pill border border-hairline text-annotation px-3 py-1.5 text-sm"
            >
              Potassium
            </button>
          </div>
        }
      >
        You get an element&apos;s number and symbol. Four names sit below it — tap
        the right one. Wrong picks dim out so you can narrow it down; a correct
        answer lights up in green and moves you along the queue.
      </ModeCard>

      <EmissionDivider />

      {/* Open Answer */}
      <ModeCard
        eyebrow="Mode 02 · Open Answer"
        accent="#35D99A"
        title="No hints. Just recall it."
        win="Finish your chosen session length"
        visual={
          <div className="rounded-md border border-hairline bg-slide p-4 w-56 space-y-3">
            <div className="text-center border border-hairline rounded-sm py-2 mb-3">
              <p className="font-mono text-[10px] text-annotation">79</p>
              <p className="font-display text-2xl text-copper">Au</p>
            </div>
            <div className="rounded-full border border-gray-500 px-3 py-1.5 text-sm text-annotation text-center italic">
              the element is...
            </div>
          </div>
        }
      >
        Same idea, harder: only the number and symbol appear, and you type the
        full element name yourself. Spelling is forgiving about capitals and
        stray spaces — but it has to be the real name.
      </ModeCard>

      <EmissionDivider />

      {/* Hangman */}
      <ModeCard
        eyebrow="Mode 03 · Hangman"
        accent="#FFCB47"
        title="Spell it out before the lives run out"
        win="Complete every word in the pool"
        visual={
          <div className="rounded-md border border-hairline bg-slide p-4 w-56">
            <div className="flex justify-center gap-1 mb-3">
              {["H", "E", "_", "_", "U", "M"].map((ch, i) => (
                <span
                  key={i}
                  className={`inline-flex w-6 h-7 items-center justify-center text-sm font-bold rounded-sm border ${
                    ch === "_"
                      ? "border-gray-500 text-transparent"
                      : "bg-green-700 border-green-700 text-white"
                  }`}
                >
                  {ch === "_" ? "\u00A0" : ch}
                </span>
              ))}
            </div>
            <p className="text-center font-mono text-[10px] text-annotation">
              LIVES: 7
            </p>
          </div>
        }
      >
        A hidden element name appears as blanks. Guess letters one at a time —
        or risk the whole word at once. Each wrong guess costs a life from ten.
        Choose a pool size first: the 10 easiest elements, 20, or all of them.
      </ModeCard>

      <EmissionDivider />

      {/* Configure */}
      <section className="mb-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-2">
          Setting up
        </p>
        <h2 className="text-xl font-bold text-specimen mb-3">
          Configure your session
        </h2>
        <p className="text-annotation leading-relaxed max-w-prose mb-4">
          Before playing you choose how long a session runs: a quick 10 or 25
          questions, the full 118-element cycle, or Endless. Your settings and
          progress survive a page refresh — leave mid-run and you&apos;ll pick up
          where you left off.
        </p>
        <Link
          to="/configure"
          className="btn border-0 rounded-pill px-8 bg-sodium text-void hover:brightness-110 font-semibold"
        >
          Go to Configure
        </Link>
      </section>

      <EmissionDivider />

      {/* Teachers */}
      <section className="rounded-md border border-argon/30 bg-slide p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-argon mb-2">
          For teachers &amp; classrooms
        </p>
        <h2 className="text-xl font-bold text-specimen mb-3">
          Safe to hand to a class
        </h2>
        <ul className="list-disc list-inside text-annotation leading-relaxed space-y-2 max-w-prose">
          <li>No accounts, no sign-ups, nothing to install.</li>
          <li>
            All progress lives in each student&apos;s own browser storage — no data
            ever leaves their device.
          </li>
          <li>Works on shared machines and Chromebooks straight from the browser.</li>
          <li>The periodic-table HUD shows which elements have been learned.</li>
        </ul>
        <p className="mt-4 text-annotation leading-relaxed max-w-prose">
          Playing for yourself? Even better — same rules, zero setup.
        </p>
      </section>
    </div>
  );
}
