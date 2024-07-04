import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloController {
  @Get('api')
  getHello(): string {
    return `
    <h1>Hello World</h1>
    <h2>Welcome to the Nest.js Hell World!! ^^7</h2>
    `;
  }
}
