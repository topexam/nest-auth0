import { Controller, Get } from '@nestjs/common';
import { TokenResponse } from 'auth0';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getToken(): Promise<TokenResponse> {
    return this.appService.getToken();
  }

  @Get('/metadata')
  setAppMetadata(): Promise<void> {
    return this.appService.setAppMetadata('auth0|1', '2');
  }
}
