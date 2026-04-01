import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragHandler {
  instigator = signal<string | null>(null);
  source = signal<number | null>(null);
  target = signal<number | null>(null);

  private instigatorEl: HTMLElement | null = null;

  dragStart(event: PointerEvent, el: HTMLElement, instigator: string, source: number) {
    if (instigator == null) throw new Error('Instigator is invalid.');
    if (source == null) throw new Error('Source is invalid.');

    this.source.set(source);
    this.instigator.set(instigator);
    this.instigatorEl = el;

    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointermove', this.handlePointerMove);
  }

  drop(target: number | null) {
    if (target == null) throw new Error('Target is invalid.');
    this.reset();
  }

  private handlePointerUp = (event: PointerEvent) => {
    if (this.target() !== null) {
      console.log('Dropped!', this.target());
      this.drop(this.target());
    } else {
      console.warn('Drop out of bound!');
      this.reset();
    }
  };

  private handlePointerMove = (event: PointerEvent) => {
    console.log('Moving');
  };

  reset() {
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
