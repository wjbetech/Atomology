// grab our zustand store
import { ElementType, useGameStore } from "../store/atomologyStore";

// get our API func
import { GET } from "../data/fetch";

// fix count: any at some point
export const fetchUniqueElements = async (
  count: number
): Promise<ElementType[]> => {
  // ensure we have four unique ElementType shaped array
  const uniqueElements = new Set<ElementType>();

  while (uniqueElements.size < count) {
    const randomIndex = Math.floor(Math.random() * 119);
    const response = await GET();
    const data = response.data.data[randomIndex];

    const elementData: ElementType = {
      atomicMass: data.atomic_mass,
      category: data.category,
      density: data.density,
      discoveredBy: data.discovered_by,
      melt: data.melt,
      name: data.name,
      number: data.number,
      period: data.period,
      phase: data.phase,
      symbol: data.symbol,
    };

    // Add the element only if it's not already in the set
    uniqueElements.add(elementData);
  }
  return Array.from(uniqueElements);
};
