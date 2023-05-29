import { Directive, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SwalComponent } from './swal.component';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { SweetAlert2LoaderService } from './sweet-alert2-loader.service';
import { dismissOnDestroyToken, fireOnInitToken } from './tokens';

@Directive({
  selector: '[swal]'
})
export class SwalDirective implements OnInit, OnDestroy {
  @Input() swal?: SwalComponent | SweetAlertOptions;

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
   * the modal was programmatically closed (through {@link dismiss} for example).
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

  constructor(private loaderService: SweetAlert2LoaderService,
              @Inject(fireOnInitToken) private fireOnInit: boolean,
              @Inject(dismissOnDestroyToken) private dismissOnDestroy: boolean) {
  }

  ngOnInit() {
    this.loaderService.preloadSweetAlertLibrary();

    if(this.fireOnInit) {
      this.clicked();
    }
  }

  ngOnDestroy() {
    if(this.dismissOnDestroy) {
      this.loaderService.swal.then(swal => swal.close());
    }
  }

  @HostListener('click', ['$event'])
  async clicked(event?: PointerEvent) {
    if (this.swal) {
      const swalModule = await this.loaderService.swal;
      let result: SweetAlertResult = this.swal instanceof SwalComponent ?
        await this.swal.fire() :
        await swalModule.fire(this.swal as SweetAlertOptions);

      if (result.isConfirmed) this.confirm.emit(result.value);
      else if (result.isDenied) this.deny.emit();
      else if (result.isDismissed) this.dismiss.emit(result.dismiss);
    }
  }
}
