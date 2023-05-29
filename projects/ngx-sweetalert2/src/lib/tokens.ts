import { InjectionToken } from '@angular/core';
import { SwalModuleLoaderFn } from './sweet-alert2-loader.service';

export const swalProviderFnToken = new InjectionToken<SwalModuleLoaderFn>('@sweetalert2/ngx-sweetalert2#swalProvider');

export const fireOnInitToken = new InjectionToken<boolean>('@sweetalert2/ngx-sweetalert2#fireOnInit');

export const dismissOnDestroyToken = new InjectionToken<boolean>('@sweetalert2/ngx-sweetalert2#dismissOnDestroy');
