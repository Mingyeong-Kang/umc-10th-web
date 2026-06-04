export const fetchSearchLP = async (
  keyword: string,
  cursor: number
) => {
  const response = await fetch(
    `/api/search?q=${keyword}&cursor=${cursor}`
  );

  return response.json();
};