import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { provideSweetAlert2 } from 'lib';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'nested',
    loadChildren: () => import('./app/nested/nested.routes').then(m => m.nested),
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideSweetAlert2({
      dismissOnDestroy: true,
    }),
    provideRouter(routes),
  ]
})
  .catch(err => console.error(err));
