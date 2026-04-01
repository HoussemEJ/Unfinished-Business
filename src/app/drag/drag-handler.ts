import { inject, Injectable, signal } from '@angular/core';
import { CardController } from '../services/card-controller';

@Injectable({
  providedIn: 'root',
})
export class DragHandler {
  private cardController = inject(CardController);

  instigator = signal<string | null>(null);
  source = signal<number | null>(null);
  target = signal<number | null>(null);

  private instigatorEl: HTMLElement | null = null;

  dragStart(event: PointerEvent, el: HTMLElement, instigator: string, source: number): void {
    if (instigator == null) throw new Error('Instigator is invalid.');
    if (source == null) throw new Error('Source is invalid.');

    this.source.set(source);
    this.instigator.set(instigator);
    this.instigatorEl = el;

    this.cardController.hideCard(instigator);

    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointermove', this.handlePointerMove);
  }

  drop(): void {
    const instigator = this.instigator();
    const target = this.target();

    if (instigator == null) throw new Error('Instigator is invalid.');
    if (target == null) throw new Error('Target is invalid.');

    this.cardController.moveCard(instigator, target);
    this.reset();
  }

  private handlePointerUp = (event: PointerEvent): void => {
    const instigator = this.instigator();
    const source = this.source();
    const target = this.target();

    if (target !== null) {
      this.drop();
    } else {
      console.warn('Drop out of bound!');
      if (instigator != null && source != null) this.cardController.showCard(instigator, source);
      this.reset();
    }
  };

  private handlePointerMove = (event: PointerEvent): void => {
    console.log('Moving');
  };

  reset(): void {
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);

    if (this.instigatorEl) {
      this.instigatorEl = null;
    }

    this.instigator.set(null);
    this.source.set(null);
    this.target.set(null);
  }
}
