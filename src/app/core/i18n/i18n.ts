import { computed, inject, Injectable, signal } from '@angular/core';
import enUS from './translations/en-US.json';
import roRO from './translations/ro-RO.json';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

export type Locale = 'ro-RO' | 'en-US';
type Dict = Record<string, unknown>;

const STORAGE_KEY = 'locale';

function isLocale(v: unknown): v is Locale {
  return v === 'en-US' || v === 'ro-RO';
}

function getByPath(obj: Dict, path: string): string | undefined {
  const parts = path.split('.');
  let cur: unknown = obj;

  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as any)) {
      cur = (cur as any)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === 'string' ? cur : undefined;
}

@Injectable({ providedIn: 'root' })
export class I18NService {
  constructor() {
    const route = inject(ActivatedRoute);
    route.queryParams.pipe(take(1)).subscribe((params) => {
      this.setLocale(params['locale']);
    });
  }

  private readonly dicts: Record<Locale, Dict> = {
    'en-US': enUS as Dict,
    'ro-RO': roRO as Dict,
  };

  private readonly _locale = signal<Locale>(this.getInitialLocale());

  locale = computed(() => this._locale);

  setLocale(locale: Locale) {
    this._locale.set(locale);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      //
    }
  }

  translate(key: string): string {
    const locale = this._locale();

    const dict = this.dicts[locale];
    return getByPath(dict, key) ?? key;
  }

  private getInitialLocale(): Locale {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) return stored;
    } catch {
      // ignore
    }
    return 'en-US';
  }
}
