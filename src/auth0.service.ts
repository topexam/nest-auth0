import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationClient, ManagementClient } from 'auth0';
import { AUTH0_CONFIG_OPTIONS } from './auth0.module-definition';
import { IAuth0ConfigOptions } from './auth0.types';

@Injectable()
export class Auth0Service {
  private _authClient: AuthenticationClient;
  private _managementClient: ManagementClient;
  private _options: IAuth0ConfigOptions;

  constructor(
    @Inject(AUTH0_CONFIG_OPTIONS)
    options: IAuth0ConfigOptions,
  ) {
    this._options = options;
    this._authClient = new AuthenticationClient({
      domain: options.domain,
      clientId: options.clientId,
      clientSecret: options.clientSecret,
    });
    this._managementClient = new ManagementClient({
      domain: options.domain,
      clientId: options.clientId,
      clientSecret: options.clientSecret,
    });
  }

  async getManagementClient() {
    return this._managementClient;
  }

  async getAuthClient() {
    return this._authClient;
  }

  async getAuthenticatedToken() {
    return this._authClient.clientCredentialsGrant({
      audience: this._options.audience,
    });
  }

  async setAppMetadata(auth0UserId: string, metadata: Record<string, any>) {
    return this._managementClient.updateAppMetadata(
      { id: auth0UserId },
      metadata,
    );
  }

  async setUserMetadata(auth0UserId: string, metadata: Record<string, any>) {
    return this._managementClient.updateUserMetadata(
      { id: auth0UserId },
      metadata,
    );
  }
}
