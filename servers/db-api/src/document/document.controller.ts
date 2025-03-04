import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getAllDocuments(): Promise<any[]> {
    const documents = await this.documentService.findAll();
    return documents.map((doc) => ({
      document_id: doc.document_id,
      cluster: doc.category,
      title: doc.title,
      description: doc.text_snippet,
      topic: doc.topic_label,
      keywords: doc.topic_keywords,
      date: new Date(),
    }));
  }

  @Get('id/:id')
  async getDocumentById(@Param('id') id: string): Promise<any | null> {
    const doc = await this.documentService.findById(id);
    return doc
      ? {
          document_id: doc.document_id,
          cluster: doc.category,
          title: doc.title,
          description: doc.text_snippet,
          topic: doc.topic_label,
          keywords: doc.topic_keywords,
          date: new Date(),
        }
      : null;
  }

  @Get('title/:title')
  async getDocumentByTitle(@Param('title') title: string): Promise<any[]> {
    const documents = await this.documentService.findByTitle(title);
    return documents.map((doc) => ({
      document_id: doc.document_id,
      cluster: doc.category,
      title: doc.title,
      description: doc.text_snippet,
      topic: doc.topic_label,
      keywords: doc.topic_keywords,
      date: new Date(),
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
    @Body() query: { cluster: string; topics: string[]; keywords: string[] },
  ): Promise<any[]> {
    const documents = await this.documentService.findByCombinedQuery(
      query.cluster,
      query.topics,
      query.keywords,
    );

    return documents.map((doc) => ({
      document_id: doc.document_id,
      cluster: doc.category,
      title: doc.title,
      description: doc.text_snippet,
      topic: doc.topic_label,
      keywords: doc.topic_keywords,
      date: new Date(),
    }));
  }
}
