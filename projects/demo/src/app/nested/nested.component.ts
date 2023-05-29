import { Component, Inject } from '@angular/core';
import { dismissOnDestroyToken, SwalComponent, SwalDirective } from 'lib';

@Component({
  selector: 'app-nested',
  standalone: true,
  templateUrl: './nested.component.html',
  imports: [
    SwalDirective,
    SwalComponent
  ],
  styleUrls: ['./nested.component.scss']
})
export class NestedComponent {
  constructor(@Inject(dismissOnDestroyToken) private token: boolean) {
  }
}
