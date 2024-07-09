import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { ENV } from "src/common/constants/env.constant";

// MySQL TypeORM 설정
const options: DataSourceOptions = {
  type: "mysql", // 데이터베이스 유형
  url: ENV.MYSQL_URI,
  synchronize: true, // 개발 환경에서는 true로 설정, 프로덕션 환경에서는 false로 설정
  // logging: ["query", "error"], // 로그 출력 여부
  entities: [__dirname + "/../../**/*.entity{.ts,.js}"], // 엔티티 파일 경로
  migrations: [__dirname + "/../../**/*.migration{.ts,.js}"], // 마이그레이션 파일 경로
};

export class TypeOrmConfig implements TypeOrmOptionsFactory {
  private readonly typeOrm: DataSource;

  constructor() {
    this.typeOrm = new DataSource(options);
    this.initialize();
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.typeOrm.options,
      entities: this.typeOrm.options.entities,
      synchronize: this.typeOrm.options.synchronize,
    };
  }

  async initialize() {
    try {
      await this.typeOrm.initialize();
      console.log(
        "Success MySQL data source initialized!"
      );
    } catch (error) {
      console.error(
        "Failed MySQL data source initialization. Please check your connection string and try again.",
        error,
      );
    }
  }
}

// mongoDB TypeORM 설정
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mongodb',
//   url: ENV.MONGODB_URL,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
// };
