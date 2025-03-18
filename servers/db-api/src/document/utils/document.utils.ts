import { DocumentEntity } from 'src/schemas/document.schema';
import { CombinedDocuments } from '../types/CombinedDocuments';

export const combineResults = (
  documents: DocumentEntity[],
): CombinedDocuments[] => {
  const combinedDocs: CombinedDocuments[] = [];
  documents.forEach((doc) => {
    const existingDoc = combinedDocs.find(
      (combinedDoc) => combinedDoc.pdf_id === doc.pdf_id,
    );
    if (existingDoc) {
      existingDoc.docs.push({
        id: doc._id as string,
        topic: doc.topic_label,
        description: doc.processed_text,
        keywords: doc.topic_keywords,
      });
    } else {
      combinedDocs.push({
        pdf_id: doc.pdf_id,
        category: doc.category,
        title: doc.title,
        link: doc.link,
        date: doc.date,
        docs: [
          {
            id: doc._id as string,
            topic: doc.topic_label,
            description: doc.processed_text,
            keywords: doc.topic_keywords,
          },
        ],
      });
    }
  });

  return combinedDocs;
};
