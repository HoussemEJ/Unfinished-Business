import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '../components/button/button';

@Component({
  selector: 'app-task-editor',
  imports: [Button],
  templateUrl: './task-editor.html',
  styleUrl: './task-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditor {
  private dialogRef = inject(DialogRef);

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ saved: true });
  }
}
