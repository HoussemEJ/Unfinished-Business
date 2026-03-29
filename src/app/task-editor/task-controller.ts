import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { TaskEditor } from './task-editor';

@Injectable({
  providedIn: 'root',
})
export class TaskController {
  private dialog = inject(Dialog);

  openEditor() {
    this.dialog.open(TaskEditor, {
      minWidth: '400px',
      panelClass: 'modal-panel',
      backdropClass: 'modal-backdrop',
      hasBackdrop: true,
    });
  }
}
