import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: process.env.LOCAL_URI,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
