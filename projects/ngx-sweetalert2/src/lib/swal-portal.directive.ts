import {
  ApplicationRef,
  Directive,
  EmbeddedViewRef,
  EnvironmentInjector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { SwalModule } from './tokens';

type SwalPortalType =
  'title'
  | 'content'
  | 'closeButton'
  | 'confirmButton'
  | 'denyButton'
  | 'cancelButton'
  | 'actions'
  | 'footer';

type CssClasses = string | string[] | Set<string>;

@Directive({
  selector: 'ng-template[swalPortal]',
  standalone: true
})
export class SwalPortalDirective implements OnInit, OnDestroy, OnChanges {
  /**
   * portal的目标位置
   */
  @Input('swalPortal') type: SwalPortalType | '' = '';

  @Input('class') klass?: CssClasses;

  private embeddedView?: EmbeddedViewRef<any>;
  private targetEl: HTMLElement | null = null;
  private oldKlass?: CssClasses;

  constructor(public templateRef: TemplateRef<any>,
              private environmentInjector: EnvironmentInjector,
              private containerRef: ViewContainerRef,
              private applicationRef: ApplicationRef) {
  }

  ngOnInit(): void {
    // Must use ViewContainerRef to create embedded view
    this.embeddedView = this.containerRef.createEmbeddedView(this.templateRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Keep the last classes, so we can remove it if it changes
    if (changes['klass']?.previousValue) {
      this.oldKlass = changes['klass'].previousValue;
    }
  }

  ngOnDestroy() {
    if (this.embeddedView) {
      this.applicationRef.detachView(this.embeddedView);
      this.embeddedView.destroy();
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

  injectView(swal: SwalModule) {
    this.targetEl = this.getTarget(swal);

    if (this.targetEl && this.embeddedView) {
      //=> Replace target's contents with our component
      // https://jsperf.com/innerhtml-vs-removechild/15
      while (this.targetEl.firstChild) {
        this.targetEl.removeChild(this.targetEl.firstChild);
      }

      // reflect the css class change
      this.setCssClass(this.targetEl, this.oldKlass, 'remove');
      this.setCssClass(this.targetEl, this.klass, 'add')

      this.embeddedView.rootNodes.forEach(n => this.targetEl?.appendChild(n));
    }
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

  private setCssClass(el: HTMLElement, klass: CssClasses | undefined, action: 'add' | 'remove') {
    if (klass) {
      if (action === 'add') {
        if (typeof klass === 'string') {
          el.classList.add(klass);
        } else {
          el.classList.add(...klass);
        }
      } else {
        if (typeof klass === 'string') {
          el.classList.remove(klass);
        } else {
          el.classList.remove(...klass);
        }
      }
    }
  }
}
