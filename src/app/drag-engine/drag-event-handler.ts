import { inject, Injectable } from '@angular/core';
import { DragState } from './drag-state';
import { DragController } from './drag-controller';
import { CardController } from '../services/card-controller';

@Injectable({
  providedIn: 'root',
})
export class DragEventHandler {
  private state = inject(DragState);
  private controller = inject(DragController);
  private cardController = inject(CardController);

  handlePointerDown(
    event: PointerEvent,
    instigatorEl: HTMLElement,
    instigator: string,
    source: number,
  ): void {
    if (event.button != 0) return;
    event.preventDefault();
    event.stopPropagation();

    const rect = instigatorEl.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    this.state.init(instigatorEl, instigator, source, source, offsetX, offsetY);

    this.controller.spawnDecoy(event);
    this.controller.spawnPlaceholder();
    this.controller.toggleInstigator();

    this.setEventListeners();
  }

  private handlePointerUp = async (event: PointerEvent): Promise<void> => {
    this.removeEventListeners();

    try {
      await this.controller.animateDecoyToPlaceholder();
    } catch (error) {
      console.error('Animation failed, cleaning up anyway.', error);
    } finally {
      const instigator = this.state.instigator();
      const source = this.state.source();
      const target = this.state.target();

      this.controller.toggleInstigator();
      this.state.reset();

      if (target !== null && source !== target && instigator) {
        this.cardController.moveCard(instigator, target);
      }
    }
  };

  private handlePointerMove = (event: PointerEvent): void => {
    this.controller.moveDecoy(event);

    const target = this.controller.getIntersectingTarget();
    const currentTarget = this.state.target();

    if (target !== null && target !== currentTarget) {
      this.state.target.set(target);
      this.controller.movePlaceholder(target);
    }
  };

  private setEventListeners(): void {
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointerdown', this.handlePointerUp);
  }

  private removeEventListeners(): void {
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointerdown', this.handlePointerUp);
  }
}
