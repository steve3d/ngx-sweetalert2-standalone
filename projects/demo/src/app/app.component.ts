import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';
  interval$ = interval(300);

  constructor() {

  }

  ngOnInit(): void {
  }

  actions(action: string, $event: any) {
    console.log(action, $event);
  }
}
