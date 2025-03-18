import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentEntity } from '../schemas/document.schema';
import { combineResults } from './utils/document.utils';
import { CombinedDocuments } from './types/CombinedDocuments';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentEntity.name)
    private documentModel: Model<DocumentEntity>,
  ) {}

  async findDocuments(filters: {
    search?: string;
    category?: string;
    topic_label?: string[];
    topic_keywords?: string[];
  }): Promise<CombinedDocuments[]> {
    const query: any = {};
    const andConditions: any[] = [];

    if (filters.search) {
      const words = filters.search.split(/\s+/).filter(Boolean);

      andConditions.push(
        ...words.map((word) => ({
          $or: [
            { title: { $regex: new RegExp(`\\b${word}`, 'i') } },
            { description: { $regex: new RegExp(`\\b${word}`, 'i') } },
          ],
        })),
      );
    }

    if (filters.category) {
      andConditions.push({ category: filters.category });
    }

    if (filters.topic_label && filters.topic_label.length > 0) {
      andConditions.push({ topic_label: { $in: filters.topic_label } });
    } else {
      andConditions.push({
        $or: [{ topic_label: { $exists: false } }, { topic_label: '' }],
      });
    }

    if (filters.topic_keywords && filters.topic_keywords.length > 0) {
      andConditions.push({ topic_keywords: { $in: filters.topic_keywords } });
    } else {
      andConditions.push({
        $or: [
          { topic_keywords: { $exists: false } },
          { topic_keywords: { $size: 0 } },
        ],
      });
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    return combineResults(await this.documentModel.find(query).exec());
  }

  async findTopicsByCluster(category: string): Promise<string[]> {
    return this.documentModel.distinct('topic_label', {
      category,
    });
  }

  async findKeywordsByCluster(category: string): Promise<string[]> {
    return this.documentModel.distinct('topic_keywords', {
      category,
    });
  }

  async create(document: DocumentEntity): Promise<DocumentEntity> {
    const newDocument = new this.documentModel(document);
    return newDocument.save();
  }

  async clearAll(): Promise<void> {
    await this.documentModel.deleteMany({}).exec();
  }
}
