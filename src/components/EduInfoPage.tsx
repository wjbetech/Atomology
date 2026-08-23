import { useEffect, useMemo, useState } from "react";
import { useGameStore, useUIStore } from "../store/atomologyStore";
import { getRawElementByName } from "../data/elements";
import { accentForCategory } from "../utils/spectral";

/**
 * Full-page element dossier shown when educational mode is on and an
 * element has been answered correctly. Manual exit continues the game.
 */

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-hairline bg-bench px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-annotation mb-1">
        {label}
      </p>
      <div className="text-specimen text-sm leading-snug">{children}</div>
    </div>
  );
}

function Dash({ v }: { v: unknown }) {
  return <>{v === null || v === undefined || v === "" ? "—" : v}</>;
}

export default function EduInfoPage() {
  const name = useUIStore((s) => s.eduInfoName);
  const closeEduInfo = useUIStore((s) => s.closeEduInfo);
  const mode = useGameStore((s) => s.gameMode);
  const [nearBottom, setNearBottom] = useState(false);

  const raw = useMemo(
    () => (name ? getRawElementByName(name) : undefined),
    [name]
  );

  // Enter / Space continue from anywhere on the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeEduInfo();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeEduInfo]);

  if (!name || !raw) {
    return (
      <div className="fixed inset-0 z-[4500] bg-void text-specimen flex items-center justify-center">
        <button
          type="button"
          className="btn rounded-pill px-8 bg-sodium text-void border-0 font-semibold"
          onClick={closeEduInfo}
        >
          Continue
        </button>
      </div>
    );
  }

  const accent = accentForCategory(raw.category);
  const densityText =
    typeof raw.density === "number" ? `${raw.density} g/cm³` : "—";

  return (
    <div
      className="fixed inset-0 z-[4500] bg-void text-specimen overflow-y-auto"
      onScroll={(e) => {
        const el = e.currentTarget;
        const remaining =
          el.scrollHeight - el.scrollTop - el.clientHeight;
        setNearBottom(remaining < 120);
      }}
    >
      {/* category emission strip */}
      <div aria-hidden className="h-[3px] w-full sticky top-0 z-10" style={{ backgroundColor: accent }} />

      <div className="max-w-3xl mx-auto px-6 pb-32 pt-10">
        {/* specimen header */}
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-annotation mb-6">
          Educational mode{mode ? ` · ${mode === "multi" ? "Multiple Choice" : mode === "open" ? "Open Answer" : "Hangman"}` : ""}
        </p>

        <div className="flex items-center gap-6 mb-8">
          <div
            className="relative w-24 h-24 shrink-0 rounded-md border border-hairline bg-bench flex flex-col items-center justify-center"
            style={{ borderTopColor: accent }}
          >
            <span className="font-mono text-[10px] text-annotation">{raw.number}</span>
            <span className="font-display text-3xl" style={{ color: accent }}>
              {raw.symbol}
            </span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-specimen">
              {raw.name}
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mt-1">
              {raw.category} · {raw.phase}
            </p>
          </div>
        </div>

        {/* photo + bohr model */}
        {(raw.image?.url || raw.bohr_model_image) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {raw.image?.url && (
              <figure className="rounded-md overflow-hidden border border-hairline bg-bench">
                <img
                  src={raw.image.url}
                  alt={raw.image.title ?? raw.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <figcaption className="px-3 py-2 font-mono text-[10px] text-annotation leading-snug">
                  {raw.image.title}
                  {raw.image.attribution ? ` — ${raw.image.attribution}` : ""}
                </figcaption>
              </figure>
            )}
            {raw.bohr_model_image && (
              <figure className="rounded-md overflow-hidden border border-hairline bg-bench">
                <img
                  src={raw.bohr_model_image}
                  alt={`Bohr model of ${raw.name}`}
                  className="w-full h-48 object-contain bg-slide"
                  loading="lazy"
                />
                <figcaption className="px-3 py-2 font-mono text-[10px] text-annotation">
                  Bohr model
                </figcaption>
              </figure>
            )}
          </div>
        )}

        {/* summary */}
        {raw.summary && (
          <p className="text-specimen/90 leading-relaxed mb-8 max-w-prose">
            {raw.summary}
          </p>
        )}

        {/* data blocks */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <Block label="Atomic mass">
            <Dash v={raw.atomic_mass !== null ? `${raw.atomic_mass} u` : null} />
          </Block>
          <Block label="Phase">
            <Dash v={raw.phase} />
          </Block>
          <Block label="Density">
            <Dash v={densityText} />
          </Block>
          <Block label="Melting point">
            <Dash v={raw.melt !== null ? `${raw.melt} K` : null} />
          </Block>
          <Block label="Discovered by">
            <Dash v={raw.discovered_by} />
          </Block>
          <Block label="Named by">
            <Dash v={raw.named_by} />
          </Block>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          <Block label="Electron configuration">
            <span className="font-mono break-words">
              <Dash v={raw.electron_configuration_semantic} />
            </span>
          </Block>
          <Block label="Electron shells">
            <span className="font-mono">
              <Dash v={raw.shells?.join(" · ")} />
            </span>
          </Block>
        </div>

        {raw.appearance && (
          <p className="text-annotation text-sm italic mb-8 max-w-prose">
            Appearance: {raw.appearance}
          </p>
        )}

        {raw.source && (
          <a
            href={raw.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-10 text-argon hover:underline font-mono text-sm"
          >
            Read more →
          </a>
        )}
      </div>

      {/* sticky manual exit */}
      <div className="sticky bottom-0 left-0 right-0 bg-void/90 backdrop-blur border-t border-hairline py-4 px-6 flex justify-center z-10">
        <button
          type="button"
          onClick={closeEduInfo}
          className={`btn border-0 rounded-pill px-12 font-semibold transition-all ${
            nearBottom
              ? "bg-sodium text-void hover:brightness-110"
              : "bg-sodium/20 text-sodium hover:bg-sodium hover:text-void"
          }`}
        >
          Next element {nearBottom ? "" : "(Enter)"}
        </button>
      </div>
    </div>
  );
}
