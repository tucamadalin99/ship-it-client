import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Logger } from './core/logging/base/logger';
import { ConsoleLoggerService } from './core/logging/console-logger/console-logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: Logger, useClass: ConsoleLoggerService },
  ],
};
