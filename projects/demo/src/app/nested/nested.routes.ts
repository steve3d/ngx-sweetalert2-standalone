import { Routes } from '@angular/router';
import { NestedComponent } from './nested.component';
import { swalProviderFnToken } from 'lib';

export const provideSwal2 = () =>
  import('sweetalert2/dist/sweetalert2.js').then(({ default: swal }) => swal.mixin({
    backdrop: false
  }));

export const nested: Routes =  [
  {
    path: '',
    providers: [
      {provide: swalProviderFnToken, useValue: provideSwal2}
    ],
    component: NestedComponent,
  }
] as Routes;
