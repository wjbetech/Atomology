// Fetch elements from local JSON file
export const GET = async () => {
  const response = await fetch("/src/data/elements.json");
  if (!response.ok) {
    throw new Error("Failed to load elements data");
  }
  return response.json();
};
