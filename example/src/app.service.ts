import { Injectable } from '@nestjs/common';
import { TokenResponse } from 'auth0';
import { Auth0Service } from '../../dist';

@Injectable()
export class AppService {
  constructor(private readonly auth0Srv: Auth0Service) {}

  getToken(): Promise<TokenResponse> {
    return this.auth0Srv.getAuthenticatedToken();
  }

  async setAppMetadata(auth0Id: string, userId: string): Promise<void> {
    await this.auth0Srv.setAppMetadata(auth0Id, { api_user_id: userId });
  }
}
