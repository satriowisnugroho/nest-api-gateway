import { Component, Inject } from '@nestjs/common';

@Component()
export class UserService {
  constructor(@Inject('Broker') private readonly broker: any) {}

  async list(): Promise<any> {
    const res = await this.broker.call('user.list');

    return res;
  }
}
