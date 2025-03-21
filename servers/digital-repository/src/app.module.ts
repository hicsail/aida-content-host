import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module';
import { DocumentService } from './document/document.service';
import * as path from 'path';
import * as fs from 'fs';
import { DocumentEntity } from './schemas/document.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    DocumentModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly documentService: DocumentService) {}

  async onModuleInit() {
    const filePath = path.join(__dirname, '..', 'data', 'documents.json');

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const documents: DocumentEntity[] = JSON.parse(fileContent);

      await this.documentService.clearAll();

      for (const document of documents) {
        await this.documentService.create(document);
      }

      console.log('Inital data loaded into MongoDB successfully');
    } else {
      console.warn('No initial data file found. Skipping data import.');
    }
  }
}
