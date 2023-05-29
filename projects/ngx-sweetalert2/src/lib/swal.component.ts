import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EnvironmentInjector,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { dismissOnDestroyToken, fireOnInitToken, SwalModule, SwalProviderFn, swalProviderFnToken } from './tokens';
import { SwalPortalDirective } from './swal-portal.directive';

@Component({
  selector: 'swal',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SwalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() title?: SweetAlertOptions['title'];
  @Input() titleText?: SweetAlertOptions['titleText'];
  @Input() text?: SweetAlertOptions['text'];
  @Input() html?: SweetAlertOptions['html'];
  @Input() footer?: SweetAlertOptions['footer'];
  @Input() icon?: SweetAlertOptions['icon'];
  @Input() iconColor?: SweetAlertOptions['iconColor'];
  @Input() iconHtml?: SweetAlertOptions['iconHtml'];
  @Input() backdrop?: SweetAlertOptions['backdrop'];
  @Input() toast?: SweetAlertOptions['toast'];
  @Input() target?: SweetAlertOptions['target'];
  @Input() input?: SweetAlertOptions['input'];
  @Input() width?: SweetAlertOptions['width'];
  @Input() padding?: SweetAlertOptions['padding'];
  @Input() background?: SweetAlertOptions['background'];
  @Input() position?: SweetAlertOptions['position'];
  @Input() grow?: SweetAlertOptions['grow'];
  @Input() showClass?: SweetAlertOptions['showClass'];
  @Input() hideClass?: SweetAlertOptions['hideClass'];
  @Input() customClass?: SweetAlertOptions['customClass'];
  @Input() timer?: SweetAlertOptions['timer'];
  @Input() timerProgressBar?: SweetAlertOptions['timerProgressBar'];
  @Input() heightAuto?: SweetAlertOptions['heightAuto'];
  @Input() allowOutsideClick?: SweetAlertOptions['allowOutsideClick'];
  @Input() allowEscapeKey?: SweetAlertOptions['allowEscapeKey'];
  @Input() allowEnterKey?: SweetAlertOptions['allowEnterKey'];
  @Input() stopKeydownPropagation?: SweetAlertOptions['stopKeydownPropagation'];
  @Input() keydownListenerCapture?: SweetAlertOptions['keydownListenerCapture'];
  @Input() showConfirmButton?: SweetAlertOptions['showConfirmButton'];
  @Input() showDenyButton?: SweetAlertOptions['showDenyButton'];
  @Input() showCancelButton?: SweetAlertOptions['showCancelButton'];
  @Input() confirmButtonText?: SweetAlertOptions['confirmButtonText'];
  @Input() denyButtonText?: SweetAlertOptions['denyButtonText'];
  @Input() cancelButtonText?: SweetAlertOptions['cancelButtonText'];
  @Input() confirmButtonColor?: SweetAlertOptions['confirmButtonColor'];
  @Input() denyButtonColor?: SweetAlertOptions['denyButtonColor'];
  @Input() cancelButtonColor?: SweetAlertOptions['cancelButtonColor'];
  @Input() confirmButtonAriaLabel?: SweetAlertOptions['confirmButtonAriaLabel'];
  @Input() denyButtonAriaLabel?: SweetAlertOptions['denyButtonAriaLabel'];
  @Input() cancelButtonAriaLabel?: SweetAlertOptions['cancelButtonAriaLabel'];
  @Input() buttonsStyling?: SweetAlertOptions['buttonsStyling'];
  @Input() reverseButtons?: SweetAlertOptions['reverseButtons'];
  @Input() focusConfirm?: SweetAlertOptions['focusConfirm'];
  @Input() focusDeny?: SweetAlertOptions['focusDeny'];
  @Input() focusCancel?: SweetAlertOptions['focusCancel'];
  @Input() showCloseButton?: SweetAlertOptions['showCloseButton'];
  @Input() closeButtonHtml?: SweetAlertOptions['closeButtonHtml'];
  @Input() closeButtonAriaLabel?: SweetAlertOptions['closeButtonAriaLabel'];
  @Input() loaderHtml?: SweetAlertOptions['loaderHtml'];
  @Input() showLoaderOnConfirm?: SweetAlertOptions['showLoaderOnConfirm'];
  @Input() preConfirm?: SweetAlertOptions['preConfirm'];
  @Input() preDeny?: SweetAlertOptions['preDeny'];
  @Input() imageUrl?: SweetAlertOptions['imageUrl'];
  @Input() imageWidth?: SweetAlertOptions['imageWidth'];
  @Input() imageHeight?: SweetAlertOptions['imageHeight'];
  @Input() imageAlt?: SweetAlertOptions['imageAlt'];
  @Input() inputLabel?: SweetAlertOptions['inputLabel'];
  @Input() inputPlaceholder?: SweetAlertOptions['inputPlaceholder'];
  @Input() inputValue?: SweetAlertOptions['inputValue'];
  @Input() inputOptions?: SweetAlertOptions['inputOptions'];
  @Input() inputAutoTrim?: SweetAlertOptions['inputAutoTrim'];
  @Input() inputAttributes?: SweetAlertOptions['inputAttributes'];
  @Input() inputValidator?: SweetAlertOptions['inputValidator'];
  @Input() returnInputValueOnDeny?: SweetAlertOptions['returnInputValueOnDeny'];
  @Input() validationMessage?: SweetAlertOptions['validationMessage'];
  @Input() progressSteps?: SweetAlertOptions['progressSteps'];
  @Input() currentProgressStep?: SweetAlertOptions['currentProgressStep'];
  @Input() progressStepsDistance?: SweetAlertOptions['progressStepsDistance'];
  @Input() scrollbarPadding?: SweetAlertOptions['scrollbarPadding'];

  /**
   * Whether to fire the modal as soon as the <swal> component is created and initialized in the view.
   * When left undefined (default), the value will be inherited from the module configuration, which is `false`.
   *
   * Example:
   *     <swal *ngIf="error" [title]="error.title" [text]="error.text" icon="error" [swalFireOnInit]="true"></swal>
   */
  @Input()
  public swalFireOnInit?: boolean;

  /**
   * Whether to dismiss the modal when the <swal> component is destroyed by Angular (for any reason) or not.
   * When left undefined (default), the value will be inherited from the module configuration, which is `true`.
   */
  @Input()
  public swalDismissOnDestroy?: boolean;

  @Input()
  public set swalVisible(visible: boolean) {
    visible ? this.fire() : this.close();
  }

  public get swalVisible(): boolean {
    return this.isCurrentlyShown;
  }

  /**
   * Modal lifecycle hook. Synchronously runs before the modal is shown on screen.
   */
  @Output()
  public readonly willOpen = new EventEmitter<HTMLElement>();

  /**
   * Modal lifecycle hook. Synchronously runs before the modal is shown on screen.
   */
  @Output()
  public readonly didOpen = new EventEmitter<HTMLElement>();

  /**
   * Modal lifecycle hook. Synchronously runs after the popup DOM has been updated (ie. just before the modal is
   * repainted on the screen).
   * Typically, this will happen after `Swal.fire()` or `Swal.update()`.
   * If you want to perform changes in the popup's DOM, that survive `Swal.update()`, prefer {@link didRender} over
   * {@link willOpen}.
   */
  @Output()
  public readonly didRender = new EventEmitter<HTMLElement>();

  /**
   * Modal lifecycle hook. Synchronously runs when the popup closes by user interaction (and not due to another popup
   * being fired).
   */
  @Output()
  public readonly willClose = new EventEmitter<HTMLElement>();

  /**
   * Modal lifecycle hook. Asynchronously runs after the popup has been disposed by user interaction (and not due to
   * another popup being fired).
   */
  @Output()
  public readonly didClose = new EventEmitter<void>();

  /**
   * Modal lifecycle hook. Synchronously runs after popup has been destroyed either by user interaction or by another
   * popup.
   * If you have cleanup operations that you need to reliably execute each time a modal is closed, prefer
   * {@link didDestroy} over {@link didClose}.
   */
  @Output()
  public readonly didDestroy = new EventEmitter<void>();

  /**
   * Emits when the user clicks "Confirm".
   * The event value ($event) can be either:
   *  - by default, just `true`,
   *  - when using {@link input}, the input value,
   *  - when using {@link preConfirm}, the return value of this function.
   *
   * Example:
   *     <swal (confirm)="handleConfirm($event)"></swal>
   *
   *     public handleConfirm(email: string): void {
   *         // ... save user email
   *     }
   */
  @Output()
  public readonly confirm = new EventEmitter<any>();

  /**
   * Emits when the user clicks "Deny".
   * This event bears no value.
   * Use `(deny)` (along with {@link showDenyButton}) when you want a modal with three buttons (confirm, deny and
   * cancel), and/or when you want to handle clear refusal in a separate way than simple dismissal.
   *
   * Example:
   *     <swal (deny)="handleDeny()"></swal>
   *
   *     public handleDeny(): void {
   *     }
   */
  @Output()
  public readonly deny = new EventEmitter<void>();

  /**
   * Emits when the user clicks "Cancel", or dismisses the modal by any other allowed way.
   * The event value ($event) is a string that explains how the modal was dismissed. It is `undefined` when
   * the modal was programmatically closed (through {@link close} for example).
   *
   * Example:
   *     <swal (dismiss)="handleDismiss($event)"></swal>
   *
   *     public handleDismiss(reason: DismissReason | undefined): void {
   *         // reason can be 'cancel', 'overlay', 'close', 'timer' or undefined.
   *         // ... do something
   *     }
   */
  @Output()
  public readonly dismiss = new EventEmitter<Swal.DismissReason | undefined>();


  @ContentChildren(SwalPortalDirective) private portalDirectives?: QueryList<SwalPortalDirective>

  /**
   * Is the SweetAlert2 modal represented by this component currently opened?
   */
  private isCurrentlyShown = false;

  private swal?: SwalModule;

  constructor(private environmentInjector: EnvironmentInjector,
              private applicationRef: ApplicationRef,
              @Inject(swalProviderFnToken) private swalProvider: SwalProviderFn,
              @Inject(fireOnInitToken) private fireOnInit: boolean,
              @Inject(dismissOnDestroyToken) private dismissOnDestroy: boolean) {
  }

  ngOnInit(): void {
    this.swalProvider().then(m => this.swal = m);

    if (this.fireOnInit || this.swalFireOnInit) {
      this.fire();
    }
  }

  ngOnDestroy(): void {
    if (this.dismissOnDestroy) {
      this.swal?.close();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.swal && this.swal.getPopup()) {
      const updatedOptions = Object.keys(changes)
        .reduce((acc, cur) => {
          // Only update parameters which can be updatable
          if (this.swal?.isUpdatableParameter(cur)) {
            acc[cur] = changes[cur].currentValue;
          }
          return acc;
        }, {} as SweetAlertOptions);

      this.swal.update(updatedOptions);
    }
  }


  async fire(): Promise<SweetAlertResult> {
    this.swal = await this.swalProvider();
    const userOptions: SweetAlertOptions = this.swalOptions;
    let options: SweetAlertOptions = {
      ...userOptions,
      willOpen: e => this.willOpen.emit(e),
      didOpen: e => {
        this.didOpen.emit(e);
        this.portalDirectives?.forEach(d => d.injectView(this.swal!));
      },
      didRender: e => {
        this.didRender.emit(e);
      },
      willClose: e => this.willClose.emit(e),
      didClose: () => this.didClose.emit(),
      didDestroy: () => this.didDestroy.emit()
    };

    // Update all required options for each template
    this.portalDirectives?.forEach(d => options = Object.assign(options, d.enforceOption));

    const result = await this.swal.fire(options);
    if (result.isConfirmed) this.confirm.emit(result.value);
    else if (result.isDenied) this.deny.emit();
    else if (result.isDismissed) this.dismiss.emit(result.dismiss);

    return result;
  }

  /**
   * Closes the modal, if opened.
   *
   * @param result The value that the modal will resolve with, triggering either (confirm), (deny) or (dismiss).
   *               If the argument is not passed, it is (dismiss) that will emit an `undefined` reason.
   *               {@see Swal.close}.
   */
  async close(result?: SweetAlertResult): Promise<void> {

    this.swal?.close(result);
  }

  private get swalOptions(): SweetAlertOptions {
    return Object.keys(this)
      .reduce((acc, cur) => {
        if (this.swal?.isValidParameter(cur)) {
          // @ts-ignore allow old js way
          acc[cur] = this[cur];
        }
        return acc;
      }, {} as SweetAlertOptions);
  }
}
