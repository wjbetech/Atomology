// export async function getRandomElement(num) {
//   const requestOptions = {
//     method: "GET",
//     redirect: "follow"
//   };

//   try {
//     const response = await fetch(
//       `https://periodic-table-elements-info.herokuapp.com/element/atomicNumber/${num}`,
//       requestOptions
//     );

//     // Check if the response is okay
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const singleElementData = await response.json();
//     return singleElementData;
//   } catch (err) {
//     console.error("Fetch error:", err);
//   }
// }
