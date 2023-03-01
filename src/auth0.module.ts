import { Module } from '@nestjs/common';
import { ConfigurableAuth0Module } from './auth0.module-definition';
import { Auth0Service } from './auth0.service';

@Module({
  providers: [Auth0Service],
  exports: [Auth0Service],
})
export class Auth0Module extends ConfigurableAuth0Module {}
