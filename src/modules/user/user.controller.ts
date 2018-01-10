import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async index() {
    const data = await this.authService.list();

    return { data };
  }
}
