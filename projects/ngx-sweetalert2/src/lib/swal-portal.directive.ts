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

type CssClasses = string | string[];

const WS_REGEXP = /\s+/;

@Directive({
  selector: 'ng-template[swalPortal]',
  standalone: true
})
export class SwalPortalDirective implements OnInit, OnDestroy, OnChanges {

  /**
   * Portal template target
   */
  @Input('swalPortal') type: SwalPortalType | '' = '';

  /**
   * Additional class for the target
   */
  @Input('class') klass?: CssClasses;

  private embeddedView?: EmbeddedViewRef<any>;
  private targetEl: HTMLElement | null = null;
  private oldKlass?: string[];
  private newKlass?: string[];

  constructor(public templateRef: TemplateRef<any>,
              private environmentInjector: EnvironmentInjector,
              private containerRef: ViewContainerRef,
              private applicationRef: ApplicationRef) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    // parse the class and keep the previous classes
    if (changes.hasOwnProperty('klass')) {
      this.oldKlass = this.parseClasses(changes['klass'].previousValue);
      this.newKlass = this.parseClasses(changes['klass'].currentValue);
    }
  }

  ngOnDestroy() {
    this.detachView();
  }

  get enforceOption(): SweetAlertOptions {
    switch (this.type) {
      case 'title':
        return {title: ' '};
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

    // any other option default to content
    return {html: ' '};
  }

  injectView(swal: SwalModule) {
    this.targetEl = this.getTarget(swal);

    // create the embedded view only when didOpen, dom exists
    if(!this.embeddedView) {
      // Must use ViewContainerRef to create embedded view
      this.embeddedView = this.containerRef.createEmbeddedView(this.templateRef);
    }

    if (this.targetEl && this.embeddedView) {
      //=> Replace target's contents with our component
      // https://jsperf.com/innerhtml-vs-removechild/15
      while (this.targetEl.firstChild) {
        this.targetEl.removeChild(this.targetEl.firstChild);
      }

      // reflect the css class change, remove old classes
      if(this.oldKlass) {
        this.targetEl.classList.remove(...this.oldKlass);
      }
      // add new classes
      if(this.newKlass) {
        this.targetEl.classList.add(...this.newKlass);
      }

      this.embeddedView.rootNodes.forEach(n => this.targetEl?.appendChild(n));
    }
  }

  detachView() {
    if (this.embeddedView) {
      // remove and destroy embedded view manually
      this.applicationRef.detachView(this.embeddedView);
      this.embeddedView.destroy();
      this.embeddedView = undefined;
    }
  }

  private getTarget(swal: SwalModule): HTMLElement | null {
    switch (this.type) {
      case 'title':
        return swal.getTitle();
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

    // any other option default to content
    return swal.getHtmlContainer();
  }

  private parseClasses(value: CssClasses | undefined): string[] | undefined {
    if(value) {
      if(typeof value === 'string') {
        return value.trim().split(WS_REGEXP);
      } else {
        return value.reduce((acc, cur) => [
          ...acc,
          ...(cur.trim().split(WS_REGEXP)),
        ], [] as string[])
      }
    }

    return undefined;
  }
}
