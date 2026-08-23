/**
 * Curated YouTube videos for the educational-mode info page, keyed by
 * exact element name.
 *
 * Shape: { [elementName]: { title, youtubeId } }
 *   - youtubeId is the video's ID only (the part after ?v=)
 *   - When an element has no entry here, the info page automatically
 *     falls back to a YouTube search link for that element.
 *
 * To add a video for an element, add an entry and open a PR — no other
 * change needed.
 */
export const elementVideos: Record<
  string,
  { title: string; youtubeId: string }
> = {};
