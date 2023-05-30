import { ModuleWithProviders, NgModule } from '@angular/core';
import { SwalComponent } from './swal.component';
import { SwalPortalDirective } from './swal-portal.directive';
import { SwalDirective } from './swal.directive';
import { dismissOnDestroyToken, fireOnInitToken, ProvideSwalOptions, swalProviderFnToken } from './tokens';
import { provideSwalDefault } from './swal-default.provide';

/**
 * @deprecated
 * Use standalone version, and `provideSweetAlert2`
 */
@NgModule({
  imports: [
    SwalComponent,
    SwalPortalDirective,
    SwalDirective
  ],
  exports: [
    SwalComponent,
    SwalPortalDirective,
    SwalDirective
  ]
})
export class SweetAlert2Module {
  /**
   * @deprecated
   * Use individual provide for `swalProviderFnToken`, `fireOnInitToken`, `dismissOnDestroyToken`.
   * Or use `provideSweetAlert2`
   */
  static forRoot(options?: ProvideSwalOptions): ModuleWithProviders<SweetAlert2Module> {
    return {
      ngModule: SweetAlert2Module,
      providers: [
        {provide: swalProviderFnToken, useValue: options?.provider ?? provideSwalDefault},
        {provide: fireOnInitToken, useValue: options?.fireOnInit ?? false},
        {provide: dismissOnDestroyToken, useValue: options?.dismissOnDestroy ?? true}
      ]
    }
  }

  /**
   * @deprecated
   * Use individual provide for `swalProviderFnToken`, `fireOnInitToken`, `dismissOnDestroyToken`.
   * Or use `provideSweetAlert2`
   */
  static forChild(options?: ProvideSwalOptions): ModuleWithProviders<SweetAlert2Module> {
    return this.forRoot(options);
  }
}
