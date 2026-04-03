import { inject, Injectable } from '@angular/core';
import { DragState } from './drag-state';
import { getIntersectingTarget } from './drag-physics';

type Animatable = HTMLElement & { animate: { enter?: string; leave?: string } };

@Injectable({
  providedIn: 'root',
})
export class DragController {
  private state = inject(DragState);

  spawnDecoy(event: PointerEvent): void {
    const instigator = this.state.instigatorEl;
    if (!instigator) throw new Error('Instigator not found. Cannot spawn decoy!');

    let decoy = instigator.cloneNode(true) as HTMLElement;
    decoy.classList.add('decoy-card');

    const rect = instigator.getBoundingClientRect();
    Object.assign(decoy.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      left: '0',
      top: '0',
    });

    document.body.appendChild(decoy);
    this.state.decoyEl = decoy;

    this.moveDecoy(event);
  }

  spawnPlaceholder(): void {
    const instigator = this.state.instigatorEl;
    if (!instigator) throw new Error('Instigator not found. Cannot spawn placeholder!');

    const rect = instigator.getBoundingClientRect();
    const placeholder = document.createElement('div');

    placeholder.classList.add('drag-placeholder');

    Object.assign(placeholder.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });

    instigator.parentNode?.insertBefore(placeholder, instigator);

    this.state.placeholderEl = placeholder;
  }

  moveDecoy(event: PointerEvent): void {
    const decoy = this.state.decoyEl;
    if (!decoy) throw new Error('No decoy found to move!');

    const location = {
      x: event.clientX - this.state.offsetX,
      y: event.clientY - this.state.offsetY,
    };

    decoy.style.transform = `translate3d(${location.x}px, ${location.y}px ,0)`;
  }

  repositionPlaceholder(target: number): void {
    const { instigatorEl, decoyEl, placeholderEl, registry } = this.state;
    const targetBoundary = registry.get(target);

    if (!targetBoundary || !instigatorEl || !decoyEl) return;

    if (placeholderEl) {
      placeholderEl.remove();
    }

    const newPlaceholder = document.createElement('div');
    newPlaceholder.classList.add('drag-placeholder');

    const rect = decoyEl.getBoundingClientRect();
    Object.assign(newPlaceholder.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });

    targetBoundary.el.appendChild(newPlaceholder);
    this.state.placeholderEl = newPlaceholder;
  }

  async animateDecoyToPlaceholder(): Promise<void> {
    const { decoyEl, placeholderEl } = this.state;
    if (!decoyEl || !placeholderEl) return;

    const pRect = placeholderEl.getBoundingClientRect();

    const animation = decoyEl.animate(
      [
        { transform: decoyEl.style.transform },
        { transform: `translate3d(${pRect.left}px, ${pRect.top}px, 0)` },
      ],
      {
        duration: 200,
        easing: 'cubic-bezier(0.2, 0, 0, 1)',
        fill: 'forwards',
      },
    );

    return animation.finished.then(() => {
      decoyEl.style.transform = `translate3d(${pRect.left}px, ${pRect.top}px, 0)`;
    });
  }

  toggleInstigator(): void {
    const instigator = this.state.instigatorEl;
    if (!instigator) throw new Error('No instigator found to toggle!');

    instigator.style.display = instigator.style.display === 'none' ? 'flex' : 'none';
  }

  checkCollisions(): number | null {
    const decoy = this.state.decoyEl;
    if (!decoy) return null;

    return getIntersectingTarget(decoy.getBoundingClientRect(), this.state.registry.values());
  }
}
