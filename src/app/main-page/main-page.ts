import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Board } from '../board/board';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-main-page',
  imports: [Board, Header, Footer],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
