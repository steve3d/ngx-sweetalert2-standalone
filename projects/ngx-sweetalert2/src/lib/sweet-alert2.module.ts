import { ModuleWithProviders, NgModule } from '@angular/core';
import { SwalComponent } from './swal.component';
import { SwalPortalComponent, SwalPortalDirective } from './swal-portal.component';
import { NgTemplateOutlet } from '@angular/common';
import { dismissOnDestroyToken, fireOnInitToken, swalProviderFnToken } from './tokens';
import { SwalDirective } from './swal.directive';
import { provideSwalDefault, SwalModuleLoaderFn } from './sweet-alert2-loader.service';

export interface Sweetalert2ModuleConfig {
  provideSwal?: SwalModuleLoaderFn,
  fireOnInit?: boolean;
  dismissOnDestroy?: boolean;
}

@NgModule({
  declarations: [
    SwalComponent,
    SwalPortalDirective,
    SwalPortalComponent,
    SwalDirective
  ],
  imports: [
    NgTemplateOutlet
  ],
  exports: [
    SwalComponent,
    SwalPortalDirective
  ]
})
export class SweetAlert2Module {
  static forRoot(options: Sweetalert2ModuleConfig = {}): ModuleWithProviders<SweetAlert2Module> {
    return {
      ngModule: SweetAlert2Module,
      providers: [
        {provide: swalProviderFnToken, useValue: options.provideSwal ?? provideSwalDefault},
        {provide: fireOnInitToken, useValue: options.fireOnInit ?? false},
        {provide: dismissOnDestroyToken, useValue: options.dismissOnDestroy ?? true}
      ]
    }
  }

  static forChild(options: Sweetalert2ModuleConfig = {}): ModuleWithProviders<SweetAlert2Module> {
    return {
      ngModule: SweetAlert2Module,
      providers: [
        {provide: fireOnInitToken, useValue: options.fireOnInit ?? false},
        {provide: dismissOnDestroyToken, useValue: options.dismissOnDestroy ?? true}
      ]
    }
  }
}
