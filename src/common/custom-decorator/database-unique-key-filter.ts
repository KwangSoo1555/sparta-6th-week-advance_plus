// userId 에 대해 외래키로 참조하고 있는 엔티티에서 중복된 값이 들어갈 경우 오류 발생에 따라
// 오류 메세지를 커스텀 하여 던지는 예외 필터 (전역에서 적용)

// import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
// import { BaseExceptionFilter } from '@nestjs/core';
// import { QueryFailedError } from 'typeorm';

// @Catch(QueryFailedError)
// export class QueryErrorFilter extends BaseExceptionFilter {
//   catch(exception: QueryFailedError, host: ArgumentsHost) {
//     const detail = exception.message;
//     if (detail.includes('Duplicate entry')) {
//       throw new BadRequestException('Duplicate entry found.');
//     }
//     super.catch(exception, host);
//   }
// }