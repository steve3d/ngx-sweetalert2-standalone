import { SweetAlert2Module, Sweetalert2ModuleConfig } from './sweet-alert2.module';
import { makeEnvironmentProviders } from '@angular/core';
import { dismissOnDestroyToken, fireOnInitToken, swalProviderFnToken } from './tokens';
import { provideSwalDefault } from './sweet-alert2-loader.service';


export const provideSweetAlert2 = (options: Sweetalert2ModuleConfig = {}) => {
  return makeEnvironmentProviders([
    SweetAlert2Module,
    {provide: swalProviderFnToken, useValue: options.provideSwal ?? provideSwalDefault},
    {provide: fireOnInitToken, useValue: options.fireOnInit ?? false},
    {provide: dismissOnDestroyToken, useValue: options.dismissOnDestroy ?? true}
  ])
}
