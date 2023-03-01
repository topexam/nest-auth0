import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IAuth0ConfigOptions } from './auth0.types';

export const {
  ConfigurableModuleClass: ConfigurableAuth0Module,
  MODULE_OPTIONS_TOKEN: AUTH0_CONFIG_OPTIONS,
} = new ConfigurableModuleBuilder<IAuth0ConfigOptions>()
  .setExtras((definition, extras) => ({
    ...definition,
    global: extras.isGlobal,
  }))
  .setClassMethodName('forFeature')
  .build();
