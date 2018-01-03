import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as msg from './../../../../messages.json';

export class MultipleLoginException extends HttpException {
  constructor() {
    super((msg as any).multiple_login, HttpStatus.OK);
  }
}