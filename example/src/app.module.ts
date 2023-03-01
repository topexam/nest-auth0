import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth0Module } from '../../dist';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Auth0Module.forFeatureAsync({
      imports: [ConfigModule],
      useFactory: (configSrv: ConfigService) => {
        return {
          domain: configSrv.get('AUTH0_ISSUER'),
          audience: configSrv.get('AUTH0_AUDIENCE_API'),
          clientId: configSrv.get('AUTH0_CLIENT_ID'),
          clientSecret: configSrv.get('AUTH0_CLIENT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
