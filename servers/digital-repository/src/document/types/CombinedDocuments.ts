export type CombinedDocuments = {
  pdf_id: string;
  category: string;
  title: string;
  link: string;
  date: string;
  docs: {
    id: string;
    description: string;
    topic: string;
    keywords: string[];
  }[];
};
