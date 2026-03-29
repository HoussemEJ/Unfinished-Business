import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideKanban } from '@lucide/angular';

@Component({
  selector: 'app-panel',
  imports: [LucideKanban],
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.open]': 'open()',
  },
})
export class Panel {
  protected open = signal(false);

  toggle() {
    this.open.update((v) => !v);
  }
}
