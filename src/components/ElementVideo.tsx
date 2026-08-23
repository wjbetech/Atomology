import { elementVideos } from "../data/videos";

/**
 * Video section of the educational info page. Renders a curated entry
 * as a thumbnail card with a hover tooltip; elements without a curated
 * video fall back to a styled YouTube search link, so every element
 * has a path to "how is this used / where is it found".
 */
export default function ElementVideo({ name }: { name: string }) {
  const curated = elementVideos[name];
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${name} element uses and where it is found`
  )}`;

  if (curated) {
    return (
      <section className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-3">
          Watch · curated
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${curated.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full max-w-md rounded-md overflow-hidden border border-hairline bg-bench hover:border-sodium/60 transition-colors"
          title={curated.title}
        >
          <img
            src={`https://i.ytimg.com/vi/${curated.youtubeId}/hqdefault.jpg`}
            alt={curated.title}
            className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-9 rounded-lg bg-void/80 flex items-center justify-center group-hover:bg-strontium/80 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-specimen">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          {/* tooltip-style hover detail */}
          <span className="pointer-events-none absolute bottom-0 left-0 right-0 px-3 py-2 text-left text-xs text-specimen bg-gradient-to-t from-void/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            {curated.title}
          </span>
        </a>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-3">
        Watch · how it&apos;s used and where it&apos;s found
      </p>
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-pill border border-hairline hover:border-argon/60 bg-bench px-5 py-2 text-sm text-argon hover:bg-argon/10 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-argon" aria-hidden>
          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-3.19 0-5.3-.16-6.28-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L3.61 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c3.19 0 5.3.16 6.28.44.9.25 1.48.83 1.73 1.73z" />
        </svg>
        {name} on YouTube
      </a>
    </section>
  );
}
