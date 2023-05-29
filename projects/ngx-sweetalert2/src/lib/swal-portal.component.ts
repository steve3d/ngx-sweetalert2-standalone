import {
  ApplicationRef,
  Component,
  ComponentRef, createComponent,
  Directive,
  EnvironmentInjector,
  Input, OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { SwalModule } from './sweet-alert2-loader.service';

export type SwalPortalType =
  'title'
  | 'content'
  | 'closeButton'
  | 'confirmButton'
  | 'denyButton'
  | 'cancelButton'
  | 'actions'
  | 'footer';

@Directive({
  selector: 'ng-template[swalPortal]'
})
export class SwalPortalDirective implements OnInit, OnDestroy {
  /**
   * portal的目标位置
   */
  @Input() type: SwalPortalType = 'content';

  /**
   * portal 内容的方式, 只有几个button可以被replace, 其它无效
   */
  @Input() mode: 'replace' | 'append' = 'append';

  private componentRef?: ComponentRef<SwalPortalComponent>;

  constructor(public templateRef: TemplateRef<any>,
              private environmentInjector: EnvironmentInjector,
              private applicationRef: ApplicationRef,) {
  }

  ngOnInit(): void {
    this.componentRef = createComponent(SwalPortalComponent, {
      environmentInjector: this.environmentInjector
    });

    this.componentRef.setInput('template', this.templateRef);
    this.applicationRef.attachView(this.componentRef.hostView);
  }

  ngOnDestroy() {
    if(this.componentRef) {
      this.applicationRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

  get enforceOption(): SweetAlertOptions {
    switch (this.type) {
      case 'title':
        return {title: ' '};
      case 'content':
        return {html: ' '};
      case 'confirmButton':
        return {showConfirmButton: true};
      case 'cancelButton':
        return {showCancelButton: true};
      case 'denyButton':
        return {showDenyButton: true};
      case 'closeButton':
        return {showCloseButton: true};
      case 'footer':
        return {footer: ' '};
    }

    return {};
  }

  private getTarget(swal: SwalModule): HTMLElement | null {
    switch (this.type) {
      case 'title':
        return swal.getTitle();
      case 'content':
        return swal.getHtmlContainer();
      case 'confirmButton':
        return swal.getConfirmButton();
      case 'cancelButton':
        return swal.getCancelButton();
      case 'denyButton':
        return swal.getDenyButton();
      case 'closeButton':
        return swal.getCloseButton();
      case 'actions':
        return swal.getActions();
      case 'footer':
        return swal.getFooter();
    }

    return null;
  }

  injectView(swal: SwalModule) {
    const targetEl = this.getTarget(swal);

    if(targetEl && this.mode === 'replace') {
      // 只有这几个button可以被replace, 其它replace无效
      switch (this.type) {
        case 'confirmButton':
        case 'closeButton':
        case 'denyButton':
        case 'cancelButton':
          targetEl.innerHTML = '';
          break;
      }
    }

    if(targetEl && this.componentRef) {
      targetEl.appendChild(this.componentRef.location.nativeElement);
    }
  }

}


/**
 * @private
 * 内部组件, 用于渲染ng-template[swalPortal]
 */
@Component({
  selector: 'swal-portal',
  template: '<ng-container [ngTemplateOutlet]="template"></ng-container>'
})
export class SwalPortalComponent {
  @Input() template!: TemplateRef<any>;
}
