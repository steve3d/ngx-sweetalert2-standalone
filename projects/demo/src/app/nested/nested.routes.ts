import { Routes } from '@angular/router';
import { NestedComponent } from './nested.component';
import { dismissOnDestroyToken, swalProviderFnToken } from 'lib';

export const provideSwal2 = () =>
  import('sweetalert2').then(({ default: swal }) => swal.mixin({
    backdrop: false,
    customClass: {
      title: 'title-custom',
    }
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
