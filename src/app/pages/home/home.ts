import { Component, inject, OnInit } from '@angular/core';
import { TPipe } from '../../core/i18n/pipes/translate.pipe';
import { ConsoleLoggerService } from '../../core/logging/console-logger/console-logger.service';

@Component({
  selector: 'app-home',
  imports: [TPipe],
  providers: [ConsoleLoggerService],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly _logger = inject(ConsoleLoggerService);

  ngOnInit() {
    this._logger.error('ERROR OCCURED');
  }
}
