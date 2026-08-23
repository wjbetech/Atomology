/**
 * Maps an element's dataset category to its DESIGN.md spectral accent
 * (CSS variable form), so colour encodes meaning across the UI.
 */
export function accentForCategory(
  category: string | null | undefined
): string {
  const c = (category ?? "").toLowerCase();
  if (c.includes("actinide")) return "var(--at-strontium)";
  if (c.includes("lanthanide")) return "var(--at-calcium)";
  if (c.includes("alkaline")) return "var(--at-calcium)";
  if (c.includes("alkali")) return "var(--at-strontium)";
  if (c.includes("halogen")) return "var(--at-sodium)";
  if (c.includes("noble")) return "var(--at-argon)";
  if (
    c.includes("post-transition") ||
    c.includes("basic") ||
    c.includes("polyatomic")
  )
    return "var(--at-copper)";
  if (c.includes("transition")) return "var(--at-argon)";
  if (c.includes("metalloid")) return "var(--at-sodium)";
  if (c.includes("nonmetal")) return "var(--at-copper)";
  return "var(--at-annotation)";
}
