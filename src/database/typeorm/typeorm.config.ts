import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from 'src/common/constants/env.constant';

// mongoDB TypeORM 설정
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mongodb',
//   url: ENV.MONGODB_URL,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
// };

// mysql TypeORM 설정
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: ENV.MYSQL_URL,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,
};