import { global_environment } from './global';
import * as deepmerge from 'deepmerge';
import { AppConfig } from './types';

export const environment: AppConfig = deepmerge.all([{}, global_environment, {
  production: true,
}]) as AppConfig;
