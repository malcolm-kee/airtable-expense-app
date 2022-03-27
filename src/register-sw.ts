import {
  registerSW as oriRegisterSw,
  RegisterSWOptions,
} from 'virtual:pwa-register';

export const registerSw = (options?: RegisterSWOptions) =>
  oriRegisterSw(options);
