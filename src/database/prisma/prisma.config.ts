import { PrismaClient } from "@prisma/client";

export class PrismaConfig {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      errorFormat: "pretty",
    });
    this.connect();
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log("Success Prisma client connection!");
    } catch (error) {
      console.error(
        "Failed Prisma client connection. Please check your connection string and try again.",
        error,
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
