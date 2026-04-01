import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-editor',
  imports: [],
  templateUrl: './task-editor.html',
  styleUrl: './task-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditor {}
