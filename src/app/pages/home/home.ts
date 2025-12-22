import { Component } from '@angular/core';
import { TPipe } from '../../core/i18n/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  imports: [TPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
