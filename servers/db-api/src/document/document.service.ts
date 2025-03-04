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

  async findById(id: string): Promise<DocumentEntity | null> {
    return this.documentModel.findOne({ document_id: id }).exec();
  }

  async findByTitle(title: string): Promise<DocumentEntity[]> {
    return this.documentModel
      .find({
        title: { $regex: new RegExp(title, 'i') },
      })
      .exec();
  }

  async findAllTopics(): Promise<string[]> {
    return this.documentModel.distinct('topic_label').exec();
  }

  async findAllKeywords(): Promise<string[]> {
    return this.documentModel.distinct('topic_keywords').exec();
  }

  async findByCombinedQuery(
    category: string,
    topic_label: string[],
    topic_keywords: string[],
  ): Promise<DocumentEntity[]> {
    return this.documentModel
      .find({
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
}
