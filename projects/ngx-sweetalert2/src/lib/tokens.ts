import { InjectionToken } from '@angular/core';
import Swal from 'sweetalert2';

export type SwalModule = typeof Swal;
export type SwalProviderFn = () => Promise<SwalModule>;

export interface ProvideSwalOptions {
  provider?: SwalProviderFn,
  fireOnInit?: boolean,
  dismissOnDestroy: boolean,
}

export const swalProviderFnToken = new InjectionToken<SwalProviderFn>('@sweetalert2/ngx-sweetalert2#swalProvider');

export const fireOnInitToken = new InjectionToken<boolean>('@sweetalert2/ngx-sweetalert2#fireOnInit');

export const dismissOnDestroyToken = new InjectionToken<boolean>('@sweetalert2/ngx-sweetalert2#dismissOnDestroy');
