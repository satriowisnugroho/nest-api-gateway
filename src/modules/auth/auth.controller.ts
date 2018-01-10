import { Controller, Post, Get, HttpStatus, HttpCode, Body, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('Broker') private readonly broker: any,
  ) {}

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body) {
    return { data: { token: await this.authService.login(body) } };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async index() {
    const res = await this.broker.call("test.world");
    console.log(res);

    return;
  }
}
