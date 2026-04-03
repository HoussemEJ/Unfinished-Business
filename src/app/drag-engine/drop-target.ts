import { Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { DragState } from './drag-state';
import { IColumn } from '../model';

@Directive({
  selector: '[dropTarget]',
})
export class DropTarget implements OnInit, OnDestroy {
  private state = inject(DragState);
  el = inject<ElementRef<HTMLElement>>(ElementRef);
  column = input.required<IColumn>();

  ngOnInit(): void {
    this.state.registerTarget({
      id: this.column().id,
      el: this.el.nativeElement,
    });
  }

  ngOnDestroy(): void {
    this.state.unregisterTarget(this.column().id);
  }
}
