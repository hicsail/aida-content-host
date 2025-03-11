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

  async findAll(): Promise<DocumentEntity[]> {
    return this.documentModel.find().exec();
  }

  async findByTitle(title: string): Promise<DocumentEntity[]> {
    return this.documentModel
      .find({
        title: { $regex: new RegExp(title, 'i') },
      })
      .exec();
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

  async findByCombinedQuery(
    title: string,
    category: string,
    topic_label: string[],
    topic_keywords: string[],
  ): Promise<DocumentEntity[]> {
    return this.documentModel
      .find({
        $and: title.split(' ').map((word) => ({
          title: { $regex: new RegExp(word, 'i') },
        })),
        category,
        topic_label: { $in: topic_label },
        topic_keywords: { $in: topic_keywords },
      })
      .exec();
  }

  async create(document: DocumentEntity): Promise<DocumentEntity> {
    const newDocument = new this.documentModel(document);
    return newDocument.save();
  }

  async clearAll(): Promise<void> {
    await this.documentModel.deleteMany({}).exec();
  }
}
