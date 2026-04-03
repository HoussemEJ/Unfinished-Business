import { Directive, ElementRef, inject, input } from '@angular/core';
import { ICard } from '../model';
import { DragEventHandler } from './drag-event-handler';

@Directive({
  selector: '[dragInstigator]',
  host: {
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class DragInstigator {
  private eventHandler = inject(DragEventHandler);
  el = inject<ElementRef<HTMLElement>>(ElementRef);
  card = input.required<ICard>();

  private startPos = { x: 0, y: 0 };
  private cacheEvent?: PointerEvent;
  private threshhold = 5;

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;

    this.startPos = { x: event.clientX, y: event.clientY };
    this.cacheEvent = event;

    window.addEventListener('pointermove', this.checkThreshold);
    window.addEventListener('pointerup', this.cancelIntent);
  }

  private checkThreshold = (event: PointerEvent): void => {
    if (
      Math.hypot(event.clientX - this.startPos.x, event.clientY - this.startPos.y) > this.threshhold
    ) {
      this.cancelIntent();

      this.eventHandler.handlePointerDown(
        this.cacheEvent!,
        this.el.nativeElement,
        this.card().id,
        this.card().column,
      );
    }
  };

  private cancelIntent = (): void => {
    window.removeEventListener('pointermove', this.checkThreshold);
    window.removeEventListener('pointerup', this.cancelIntent);
  };
}
