// Fetch elements from local JSON file in a way that works in dev and production builds
export const GET = async () => {
  // resolve the JSON file relative to this module so Vite can rewrite the path in production
  const url = new URL("../data/elements.json", import.meta.url).href;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load elements data");
  }
  return response.json();
};
