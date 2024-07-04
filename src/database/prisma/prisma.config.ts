import { Controller } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Controller('prisma')
export class PrismaConfig {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
    this.connect();
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log('Success PrismaDB connection.');
    } catch (error) {
      console.error('Failed PrismaDB connection.', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
