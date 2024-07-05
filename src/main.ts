import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ENV } from './common/constants/env.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 프로젝트 초기 버전 및 start point 설정
  app.setGlobalPrefix('api/v1');

  await app.listen(ENV.SERVER_PORT, () => {
    console.log(`Server is running on port ${ENV.SERVER_PORT}. ~ ^_^ ~`);
  });
}

bootstrap();
