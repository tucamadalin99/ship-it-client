import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Header } from './components/header/header';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { GlobalErrorHandlerService } from '../error-handling/global-error-handler.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);

  /**
   * Global error handler to listen to
   */
  private readonly _globalErrorHandler = inject(GlobalErrorHandlerService);

  private readonly _router = inject(Router);

  ngOnInit(): void {
    this._globalErrorHandler.errorSubject$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((_) => {
        this._router.navigate(['/error']);
      });
  }
}
