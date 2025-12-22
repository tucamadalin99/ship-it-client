import { Injectable } from '@angular/core';
import { Logger } from '../base/logger';

@Injectable()
export class ConsoleLoggerService extends Logger {
  override log(message: unknown): void {
    console.log(message);
  }
  override info(message: unknown): void {
    console.info(message);
  }
  override warn(message: unknown): void {
    console.warn(message);
  }
  override error(message: unknown): void {
    console.error(message);
  }
}
