import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideMoveRight } from '@lucide/angular';
import { Button } from '../components/button/button';

@Component({
  selector: 'app-footer',
  imports: [LucideMoveRight, Button],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
