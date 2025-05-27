export const fetchPageData = async (page) => {
  const response = await fetch(`https://test.create.diagnal.com/data/page${page}.json`);
  if (!response.ok) throw new Error('Failed to fetch');
  const json = await response.json();

  return {
    items: json.page['content-items'].content,
    total: parseInt(json.page['total-content-items'], 10),
  };
};