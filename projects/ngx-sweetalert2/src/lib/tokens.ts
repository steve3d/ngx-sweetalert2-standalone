import { InjectionToken } from '@angular/core';
import Swal from 'sweetalert2';

export type SwalModule = typeof Swal;
export type SwalProviderFn = () => Promise<SwalModule>;

export interface ProvideSwalOptions {
  /**
   * Provider function, normally it's just an import('sweetalert2') but you can add some mixin.
   * Normally, many angular application has its own css customization, So by default, we only import
   * the sweetalert2 version without any css.
   */
  provider?: SwalProviderFn,

  /**
   * If every swal is fired after the init, default is no.
   */
  fireOnInit?: boolean,

  /**
   * If any component/directive is destroyed, then also dismiss the swal dialog, this is default.
   */
  dismissOnDestroy: boolean,
}

export const swalProviderFnToken = new InjectionToken<SwalProviderFn>('@sweetalert2/ngx-sweetalert2#swalProvider');

export const fireOnInitToken = new InjectionToken<boolean>('@sweetalert2/ngx-sweetalert2#fireOnInit');

export const dismissOnDestroyToken = new InjectionToken<boolean>('@sweetalert2/ngx-sweetalert2#dismissOnDestroy');
