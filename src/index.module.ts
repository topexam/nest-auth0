import { Module } from '@nestjs/common';
import { Auth0Service } from './index.service';

@Module({
  imports: [],
  providers: [Auth0Service],
})
export class Auth0Module {}
