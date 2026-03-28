import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { Panel } from './panel/panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainPage, Panel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Unfinished-Business');
}
