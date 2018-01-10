import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Get('/')
  public async index() {
    const data = await this.authService.list();

    return { data };
  }
}
