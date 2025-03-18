import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getAllDocuments(): Promise<any[]> {
    return this.documentService.findDocuments({});
  }

  @Get('topics/:cluster')
  async getTopicsByCluster(
    @Param('cluster') cluster: string,
  ): Promise<string[]> {
    return this.documentService.findTopicsByCluster(
      cluster.toLocaleLowerCase(),
    );
  }

  @Get('keywords/:cluster')
  async getKeywordsByCluster(
    @Param('cluster') cluster: string,
  ): Promise<string[]> {
    return this.documentService.findKeywordsByCluster(
      cluster.toLocaleLowerCase(),
    );
  }

  @Post('query')
  async getDocumentsByQuery(
    @Body()
    query: {
      search: string;
      category: string;
      topics: string[];
      keywords: string[];
    },
  ): Promise<any[]> {
    return this.documentService.findDocuments({
      search: query.search.toLocaleLowerCase(),
      category: query.category.toLocaleLowerCase(),
      topic_label: query.topics,
      topic_keywords: query.keywords,
    });
  }
}
