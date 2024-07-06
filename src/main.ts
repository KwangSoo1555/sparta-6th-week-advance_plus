import * as process from "process";
import find from "find-process";
import kill from "kill-port";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { ENV } from "src/common/constants/env.constant";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = ENV.SERVER_PORT;

  // 프로젝트 초기 버전 및 start point 설정
  app.setGlobalPrefix("api/v1");

  // 포트로 서버 실행
  try {
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    if ((error as any).code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use, killing the process...`);

      // 포트를 사용하는 프로세스를 찾고 종료
      const list = await find("port", port);
      for (const item of list) {
        process.kill(item.pid, "SIGKILL");
      }

      // 포트를 종료하고 다시 연결
      await kill(port, "tcp");
      console.log(`Port ${port} has been killed, retrying to connect...`);
      await app.listen(port);
      console.log(`Application is running on: ${await app.getUrl()}`);
    } else {
      console.error(error);
    }
  }
}

bootstrap();
