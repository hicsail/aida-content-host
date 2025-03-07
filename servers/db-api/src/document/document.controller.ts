import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getAllDocuments(): Promise<any[]> {
    const documents = await this.documentService.findAll();
    return documents.map((doc) => ({
      id: doc._id,
      pdf_id: doc.pdf_id,
      cluster: doc.category,
      title: doc.title,
      description: doc.processed_text,
      topic: doc.topic_label,
      keywords: doc.topic_keywords,
      date: doc.date,
      link: doc.link,
    }));
  }

  @Get('topics')
  async getAllTopics(): Promise<string[]> {
    return await this.documentService.findAllTopics();
  }

  @Get('keywords')
  async getAllKeywords(): Promise<string[]> {
    return this.documentService.findAllKeywords();
  }

  @Post('query')
  async getDocumentsByQuery(
    @Body()
    query: {
      title: string;
      cluster: string;
      topics: string[];
      keywords: string[];
    },
  ): Promise<any[]> {
    const documents = await this.documentService.findByCombinedQuery(
      query.title.toLocaleLowerCase(),
      query.cluster.toLocaleLowerCase(),
      query.topics,
      query.keywords,
    );

    return documents.map((doc) => ({
      id: doc._id,
      pdf_id: doc.pdf_id,
      cluster: doc.category,
      title: doc.title,
      description: doc.processed_text,
      topic: doc.topic_label,
      keywords: doc.topic_keywords,
      date: doc.date,
      link: doc.link,
    }));
  }
}
