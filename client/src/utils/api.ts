export const fetchDocuments = async () => {
  const response = await fetch(import.meta.env.VITE_DB_API_URL);
  return response.json();
};

export const queryDocuments = async (filters: {
  search: string;
  category: string;
  topics: string[];
  keywords: string[];
}) => {
  const response = await fetch(`${import.meta.env.VITE_DB_API_URL}/documents/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });
  return response.json();
};

export const fetchTopics = async (cluster: string) => {
  const response = await fetch(`${import.meta.env.VITE_DB_API_URL}/documents/topics/${cluster}`);
  return response.json();
};

export const fetchKeywords = async (cluster: string) => {
  const response = await fetch(`${import.meta.env.VITE_DB_API_URL}/documents/keywords/${cluster}`);
  return response.json();
};
