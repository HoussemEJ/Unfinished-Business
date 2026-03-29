import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideX } from '@lucide/angular';

@Component({
  selector: 'app-tag',
  imports: [LucideX],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.background-color]': 'color()',
  },
})
export class Tag {
  label = input<string>();
  color = input<string>();
}
