import { Injectable } from '@nestjs/common';

@Injectable()
export class Auth0Service {
  getHello(): string {
    return 'Hello World!';
  }
}
