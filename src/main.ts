import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ENV } from './common/constants/env.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(ENV.SERVER_PORT, () => {
    console.log(`Server is running on port ${ENV.SERVER_PORT}. ~ ^_^ ~`);
  });
}

bootstrap();
