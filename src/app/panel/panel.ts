import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LucideKanban } from '@lucide/angular';
import { TagController } from '../components/tag/tag-controller';

export interface ITag {
  title: string;
  color: string;
}

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

  tagList = this.tagController.tagList;

  toggle() {
    this.open.update((v) => !v);
  }
}
