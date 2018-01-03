import { Controller, All } from '@nestjs/common';
import { NotFoundException } from '../common/index';

@Controller()
export class GlobalController {
  @All('*')
  public async pathNotFound() {
    throw new NotFoundException();
  }
}
