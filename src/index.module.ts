import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ManagementClient, AuthenticationClient } from 'auth0';

import {
  AUTH0_CLIENT_TOKEN,
  AUTH0_MANAGEMENT_TOKEN,
  AUTH0_OPTIONS,
} from './constants';
import { Auth0Service } from './index.service';
import {
  IAuth0AsyncOptions,
  IAuth0Options,
  IAuth0OptionsFactory,
} from './types';

@Module({
  imports: [],
  providers: [Auth0Service],
  exports: [Auth0Service],
})
export class Auth0Module {
  static register(options: IAuth0Options): DynamicModule {
    return {
      module: Auth0Module,
      providers: [
        {
          provide: AUTH0_MANAGEMENT_TOKEN,
          useValue: new ManagementClient({
            domain: options.issuer,
            clientId: options.clientId,
            clientSecret: options.clientSecret,
          }),
        },
        {
          provide: AUTH0_CLIENT_TOKEN,
          useValue: new AuthenticationClient({
            domain: options.issuer,
            clientId: options.clientId,
            clientSecret: options.clientSecret,
          }),
        },
      ],
    };
  }

  static registerAsync(options: IAuth0AsyncOptions): DynamicModule {
    return {
      module: Auth0Module,
      imports: options.imports || [],
      providers: [
        this.createAsyncOptionsProvider(options),
        {
          provide: AUTH0_MANAGEMENT_TOKEN,
          useFactory: (options: IAuth0Options) =>
            new ManagementClient({
              domain: options.issuer,
              clientId: options.clientId,
              clientSecret: options.clientSecret,
            }),
          inject: [AUTH0_OPTIONS],
        },
        {
          provide: AUTH0_CLIENT_TOKEN,
          useFactory: (options: IAuth0Options) =>
            new AuthenticationClient({
              domain: options.issuer,
              clientId: options.clientId,
              clientSecret: options.clientSecret,
            }),
          inject: [AUTH0_OPTIONS],
        },
      ],
    };
  }

  private static createAsyncOptionsProvider(
    options: IAuth0AsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AUTH0_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: AUTH0_OPTIONS,
      useFactory: async (optionsFactory: IAuth0OptionsFactory) =>
        optionsFactory.createAuth0Options(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
