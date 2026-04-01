import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LucideKanban } from '@lucide/angular';
import { TagController } from '../services/tag-controller';

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
  private tagController = inject(TagController);

  protected open = signal(false);
  protected tagList = this.tagController.tagList;

  toggle() {
    this.open.update((v) => !v);
  }
}
