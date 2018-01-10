import { Component, Inject } from '@nestjs/common';

@Component()
export class UserService {
  constructor(@Inject('Broker') private readonly broker: any) {}

  list(): any {
    return this.broker.call('user.list');
  }
}
