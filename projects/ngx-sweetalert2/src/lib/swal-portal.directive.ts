import {
  ApplicationRef,
  Component,
  ComponentRef,
  createComponent,
  Directive,
  EnvironmentInjector,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { NgTemplateOutlet } from '@angular/common';
import { SwalModule } from './tokens';

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
  selector: 'ng-template[swalPortal]',
  standalone: true
})
export class SwalPortalDirective implements OnInit, OnDestroy, OnChanges {
  /**
   * portal的目标位置
   */
  @Input('swalPortal') type: SwalPortalType | '' = '';

  @Input('class') klass?: string | string[] | Set<string> | { [klass: string]: any; };

  private componentRef?: ComponentRef<SwalPortalComponent>;

  constructor(public templateRef: TemplateRef<any>,
              private environmentInjector: EnvironmentInjector,
              private applicationRef: ApplicationRef) {
  }

  ngOnInit(): void {
    this.componentRef = createComponent(SwalPortalComponent, {
      environmentInjector: this.environmentInjector
    });

    this.componentRef.setInput('template', this.templateRef);
    this.componentRef.instance.klass = this.klass;
    this.applicationRef.attachView(this.componentRef.hostView);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.componentRef && changes['klass']) {
      this.componentRef.instance.klass = this.klass;
    }
  }


  ngOnDestroy() {
    if (this.componentRef) {
      this.applicationRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

  get enforceOption(): SweetAlertOptions {
    switch (this.type) {
      case 'title':
        return {title: ' '};
      case 'content':
      case '':
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

    if (targetEl && this.componentRef) {
      //=> Replace target's contents with our component
      // https://jsperf.com/innerhtml-vs-removechild/15
      while (targetEl.firstChild) {
        targetEl.removeChild(targetEl.firstChild);
      }

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
  template: '<ng-container [ngTemplateOutlet]="template"></ng-container>',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ]
})
export class SwalPortalComponent {
  @Input() template!: TemplateRef<any>;

  @HostBinding('class') klass?: string | string[] | Set<string> | { [klass: string]: any; };
}
