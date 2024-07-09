import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { ValidationPipe } from "@nestjs/common";
// import { QueryErrorFilter } from "src/common/custom-decorator/database-unique-key-filter";

import { ENV } from "src/common/constants/env.constant";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  // 프로젝트 초기 버전 및 start point 설정
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new QueryErrorFilter());

  // 포트로 서버 실행
  try {
    await app.listen(ENV.SERVER_PORT);
    console.log(`Server is running on: ${ENV.SERVER_PORT}, Great to see you! 😊`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
