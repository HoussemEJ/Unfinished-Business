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
    '[class.disabled]': 'disabled()',
    '[attr.disabled]': 'disabled() ? true : null',
  },
})
export class Button {
  label = input<string>('');
  status = input<Status>();
  disabled = input<boolean>(false);
}
