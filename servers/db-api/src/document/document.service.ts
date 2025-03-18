import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentEntity } from '../schemas/document.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentEntity.name)
    private documentModel: Model<DocumentEntity>,
  ) {}

  async findDocuments(filters: {
    title?: string;
    category?: string;
    topic_label?: string[];
    topic_keywords?: string[];
  }): Promise<DocumentEntity[]> {
    const query: any = {};

    if (filters.title) {
      query.$and = filters.title.split(' ').map((word) => ({
        title: { $regex: new RegExp(word, 'i') },
      }));
    }

    const andConditions: any[] = [];

    if (query.$and) {
      andConditions.push(...query.$and);
    }

    if (filters.category) {
      andConditions.push({ category: filters.category });
    }

    if (filters.topic_label && filters.topic_label.length > 0) {
      andConditions.push({ topic_label: { $in: filters.topic_label } });
    } else {
      andConditions.push({ topic_label: { $eq: null } });
    }
    if (filters.topic_keywords && filters.topic_keywords.length > 0) {
      andConditions.push({ topic_keywords: { $in: filters.topic_keywords } });
    } else {
      andConditions.push({ topic_keywords: { $eq: null } });
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    return this.documentModel.find(query).exec();
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
