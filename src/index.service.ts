import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationClient, ManagementClient } from 'auth0';
import {
  AUTH0_CLIENT_TOKEN,
  AUTH0_MANAGEMENT_TOKEN,
  AUTH0_OPTIONS,
} from './constants';
import { IAuth0Options } from './types';

@Injectable()
export class Auth0Service {
  constructor(
    @Inject(AUTH0_OPTIONS)
    private readonly auth0Options: IAuth0Options,
    @Inject(AUTH0_MANAGEMENT_TOKEN)
    private readonly managementClient: ManagementClient,
    @Inject(AUTH0_CLIENT_TOKEN)
    private readonly authClient: AuthenticationClient,
  ) {}

  async getManagementClient() {
    return this.managementClient;
  }

  async getAuthClient() {
    return this.authClient;
  }

  async getAuthenticatedToken() {
    return this.authClient.clientCredentialsGrant({
      audience: this.auth0Options.audience,
    });
  }

  async setAppMetadata(auth0UserId: string, metadata: Record<string, any>) {
    return this.managementClient.updateAppMetadata(
      { id: auth0UserId },
      metadata,
    );
  }

  async setUserMetadata(auth0UserId: string, metadata: Record<string, any>) {
    return this.managementClient.updateUserMetadata(
      { id: auth0UserId },
      metadata,
    );
  }
}
