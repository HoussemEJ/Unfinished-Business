import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideX } from '@lucide/angular';

@Component({
  selector: 'app-chip',
  imports: [LucideX],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chip {
  label = input<string>();
}
