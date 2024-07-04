import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from 'src/common/constants/env.constant';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: ENV.MONGODB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
