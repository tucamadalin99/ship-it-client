import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
