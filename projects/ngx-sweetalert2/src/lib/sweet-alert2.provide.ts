import { makeEnvironmentProviders } from '@angular/core';
import { dismissOnDestroyToken, fireOnInitToken, ProvideSwalOptions, swalProviderFnToken } from './tokens';
import { provideSwalDefault } from './swal-default.provide';

export const provideSweetAlert2 = (options?: ProvideSwalOptions) => {
  return makeEnvironmentProviders([
    {provide: swalProviderFnToken, useValue: options?.provider ?? provideSwalDefault},
    {provide: fireOnInitToken, useValue: options?.fireOnInit ?? false},
    {provide: dismissOnDestroyToken, useValue: options?.dismissOnDestroy ?? true}
  ]);
}
