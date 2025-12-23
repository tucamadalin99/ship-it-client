import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Logger } from './core/logging/base/logger';
import { ConsoleLoggerService } from './core/logging/console-logger/console-logger.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlingInterceptor } from './core/error-handling/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
    { provide: Logger, useClass: ConsoleLoggerService },
  ],
};
