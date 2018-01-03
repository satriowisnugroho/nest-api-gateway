import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as msg from './../../../../messages.json';

export class UnauthorizedException extends HttpException {
  constructor() {
    super((msg as any).unauthorized, HttpStatus.UNAUTHORIZED);
  }
}