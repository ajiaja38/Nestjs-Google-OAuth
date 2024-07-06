import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

(async (): Promise<void> => {
  const port: string | number = process.env.PORT || 3000;
  const globalPrefix: string = 'api/v1';

  initializeTransactionalContext();

  const app: NestApplication = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://0.0.0.0:${port}/${globalPrefix}`,
  );
})();
