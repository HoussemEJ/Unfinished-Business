import { ElementRef, Injectable, signal } from '@angular/core';

export interface IDropTargetBoundary {
  id: number;
  el: HTMLElement;
}

@Injectable({
  providedIn: 'root',
})
export class DragState {
  instigatorEl: HTMLElement | null = null;
  decoyEl: HTMLElement | null = null;
  placeholderEl: HTMLElement | null = null;

  instigator = signal<string | null>(null);
  source = signal<number | null>(null);
  target = signal<number | null>(null);

  offsetX: number = 0;
  offsetY: number = 0;

  registry = new Map<number, IDropTargetBoundary>();

  init(
    instigatorEl: HTMLElement,
    instigator: string,
    source: number,
    target: number,
    offsetX: number,
    offsetY: number,
  ): void {
    this.instigatorEl = instigatorEl;

    this.instigator.set(instigator);
    this.source.set(source);
    this.target.set(target);

    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  registerTarget(target: IDropTargetBoundary): void {
    this.registry.set(target.id, target);
  }

  unregisterTarget(id: number): void {
    this.registry.delete(id);
  }

  reset(): void {
    [this.decoyEl, this.placeholderEl].forEach((el) => el?.remove());
    this.instigatorEl = this.decoyEl = this.placeholderEl = null;

    this.instigator.set(null);
    this.source.set(null);
    this.target.set(null);

    this.offsetX = 0;
    this.offsetY = 0;
  }
}
