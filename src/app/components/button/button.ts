import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type Status = 'prime' | 'pass' | 'warn' | 'error' | 'info';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'status()',
  },
})
export class Button {
  label = input<string>('');
  status = input<Status>();
}
