import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DocumentEntity extends Document {
  @Prop({ required: true, unique: true })
  document_id: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text_snippet: string;

  @Prop({ required: true })
  topic_label: string;

  @Prop({ type: [String], required: true })
  topic_keywords: string[];
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
