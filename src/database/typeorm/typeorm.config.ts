import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { ENV } from "src/common/constants/env.constant";

// MySQL TypeORM 설정
const options: DataSourceOptions = {
  type: "mysql", // 데이터베이스 유형
  url: ENV.MYSQL_URL,
  synchronize: true, // 개발 환경에서는 true로 설정, 프로덕션 환경에서는 false로 설정
  // logging: ["query", "error"], // 로그 출력 여부
  entities: [__dirname + "/../../**/*.entity{.ts,.js}"], // 엔티티 파일 경로
  migrations: [__dirname + "/../../**/*.migration{.ts,.js}"], // 마이그레이션 파일 경로
};

export const AppDataSource = new DataSource(options);

export class TypeOrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...AppDataSource.options,
      entities: AppDataSource.options.entities,
      synchronize: AppDataSource.options.synchronize,
    };
  }

  async initialize() {
    try {
      await AppDataSource.initialize();
      console.log("Success MySQL data source initialized!");
    } catch (error) {
      console.error(
        "Failed MySQL data source initialization. Please check your connection string and try again.",
        error,
      );
    }
  }
}

// TypeORM 초기화 호출
const typeOrmConfig = new TypeOrmConfig();
typeOrmConfig.initialize();

// mongoDB TypeORM 설정
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mongodb',
//   url: ENV.MONGODB_URL,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
// };
