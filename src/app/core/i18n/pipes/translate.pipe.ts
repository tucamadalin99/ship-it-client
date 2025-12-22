import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18NService } from '../i18n';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // important so it updates when locale changes
})
export class TPipe implements PipeTransform {
  private readonly i18n = inject(I18NService);

  transform(key: string): string {
    return this.i18n.translate(key);
  }
}
