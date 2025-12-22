export abstract class Logger {
  abstract log(message: unknown): void;
  abstract info(message: unknown): void;
  abstract warn(message: unknown): void;
  abstract error(message: unknown): void;
}
