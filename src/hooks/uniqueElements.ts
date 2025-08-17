import { ElementType } from "../store/atomologyStore";
import { GET } from "../data/fetch";

export const fetchUniqueElements = async (
  count: number
): Promise<ElementType[]> => {
  // Fetch all elements in a single API call
  const response = await GET();
  // For local JSON, elements are under response.elements
  const allElements = response.elements;

  // // -- blocked out what I think is useless --
  // // Ensure we get at least the number of required unique elements
  // if (allElements.length < count) {
  //   throw new Error("Not enough elements available to select from.");
  // }

  // Randomly pick unique elements from the fetched data
  const uniqueElements: ElementType[] = [];
  const indices = new Set<number>();

  while (indices.size < count) {
    const randomIndex = Math.floor(Math.random() * allElements.length);
    if (!indices.has(randomIndex)) {
      const data = allElements[randomIndex];
      indices.add(randomIndex);

      const elementData: ElementType = {
        atomicMass: data.atomic_mass,
        category: data.category,
        density: data.density,
        discoveredBy: data.discovered_by,
        melt: data.melt,
        name: data.name,
        number: data.number,
        period: data.period,
        phase: data.phase || data.phase?.toLowerCase() || "",
        symbol: data.symbol,
      };

      uniqueElements.push(elementData);
    }
  }

  return uniqueElements;
};
