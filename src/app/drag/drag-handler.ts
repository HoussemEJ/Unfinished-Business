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
  targetEl: HTMLElement | null = null;

  private instigatorEl: HTMLElement | null = null;
  private decoy: HTMLElement | null = null;
  placeholder: HTMLElement | null = null;

  offsetX: number | null = null;
  offsetY: number | null = null;

  dragging = signal<boolean>(false);

  dragStart(
    event: PointerEvent,
    instigatorEl: HTMLElement,
    instigator: string,
    source: number,
  ): void {
    if (instigator == null) throw new Error('Instigator is invalid.');
    if (source == null) throw new Error('Source is invalid.');
    if (!instigatorEl) throw new Error('Instigator element is invalid.');

    this.dragging.set(true);

    this.source.set(source);
    this.instigator.set(instigator);
    this.instigatorEl = instigatorEl;

    const rect = instigatorEl.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    this.placeholder = document.createElement('div');
    this.placeholder.classList.add('placeholder-card');
    Object.assign(this.placeholder.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });

    instigatorEl.parentElement?.insertBefore(this.placeholder, instigatorEl.nextSibling);

    this.decoy = instigatorEl.cloneNode(true) as HTMLElement;
    this.decoy.classList.add('decoy-card');
    instigatorEl.style.display = 'none';

    Object.assign(this.decoy.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      left: '0',
      top: '0',
    });

    document.body.appendChild(this.decoy);
    this.decoy.style.transform = `translate3d(${event.clientX - this.offsetX}px, ${event.clientY - this.offsetY}px ,0)`;

    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
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
    const target = this.target();

    if (target !== null) {
      this.drop();
    } else {
      console.warn('Drop out of bound!');
      this.reset();
    }
  };

  private handlePointerMove = (event: PointerEvent): void => {
    if (!this.decoy) return;
    if (this.offsetX == null || this.offsetY == null) return;

    this.decoy.style.transform = `translate3d(${event.clientX - this.offsetX}px, ${event.clientY - this.offsetY}px ,0)`;
  };

  movePlaceholder(container: HTMLElement) {
    if (this.placeholder && this.placeholder.parentElement !== container) {
      container.appendChild(this.placeholder);
    }
  }

  reset(): void {
    this.dragging.set(false);

    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);

    if (this.instigatorEl) {
      this.instigatorEl.style.display = 'flex';
      this.instigatorEl = null;
    }

    if (this.decoy) {
      this.decoy.remove();
      this.decoy = null;
    }

    if (this.placeholder) {
      this.placeholder.remove();
      this.placeholder = null;
    }

    this.instigator.set(null);
    this.source.set(null);
    this.target.set(null);
  }
}
