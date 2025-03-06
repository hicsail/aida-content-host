export const fetchDocuments = async () => {
  const response = await fetch(import.meta.env.VITE_DB_API_URL);
  return response.json();
};

export const queryDocuments = async (filters: {
  cluster: string;
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

export const fetchTopics = async () => {
  const response = await fetch(`${import.meta.env.VITE_DB_API_URL}/documents/topics`);
  return response.json();
};

export const fetchKeywords = async () => {
  const response = await fetch(`${import.meta.env.VITE_DB_API_URL}/documents/keywords`);
  return response.json();
};
