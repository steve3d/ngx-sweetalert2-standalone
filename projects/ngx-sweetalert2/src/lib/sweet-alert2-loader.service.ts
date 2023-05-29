import { Inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { swalProviderFnToken } from './tokens';

export type SwalModule = typeof Swal;
export type SwalModuleLoaderFn = () => Promise<SwalModule>;

// load sweetalert2 without css
export const provideSwalDefault: SwalModuleLoaderFn = () => import('sweetalert2/dist/sweetalert2.js')
  .then(m => m.default);

@Injectable({
  providedIn: 'root'
})
export class SweetAlert2LoaderService {

  private swalPromiseCache?: Promise<SwalModule>;

  constructor(@Inject(swalProviderFnToken) private provideSwal: SwalModuleLoaderFn) { }

  get swal(): Promise<SwalModule> {
    return this.swalPromiseCache ?? this.preloadSweetAlertLibrary();
  }

  preloadSweetAlertLibrary(): Promise<SwalModule> {
    if(!this.swalPromiseCache) {
      return this.swalPromiseCache = this.provideSwal();
    }

    return this.swalPromiseCache;
  }
}
