import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideX } from '@lucide/angular';
import { ITag } from '../../model';

@Component({
  selector: 'app-tag',
  imports: [LucideX],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.background-color]': 'tag().color',
  },
})
export class Tag {
  tag = input.required<ITag>();
}
