import { ModuleMetadata, Type } from '@nestjs/common';

export type IAuth0Options = {
  clientId: string;
  clientSecret: string;
  issuer: string;
  audience: string;
};

export type IAuth0OptionsFactory = {
  createAuth0Options(): Promise<IAuth0Options> | IAuth0Options;
};

export interface IAuth0AsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IAuth0OptionsFactory>;
  useClass?: Type<IAuth0OptionsFactory>;
  useFactory?: (...args: any[]) => Promise<IAuth0Options> | IAuth0Options;
  inject?: any[];
}
