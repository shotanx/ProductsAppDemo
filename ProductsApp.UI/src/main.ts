import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function getBaseUrl() {
  const elem = document.getElementsByTagName('base')[0];
  if (elem == null)
    return null;

  const href = elem.getAttribute("href");
  return href;
}

export function getBackUrl() {
  const elem = document.getElementsByTagName('back')[0];
  if (elem == null)
    return null;

  const href = elem.getAttribute("href");
  return href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'BACK_URL', useFactory: getBackUrl, deps: [] },
];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
