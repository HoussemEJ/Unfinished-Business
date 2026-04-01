import { inject, Pipe, PipeTransform } from '@angular/core';
import { DataController } from '../services/data-controller';
import { Priority } from '../model';

@Pipe({
  name: 'priorityLabel',
  pure: true,
})
export class PriorityLabelPipe implements PipeTransform {
  private dataController = inject(DataController);

  transform(value: Priority | number): string {
    return this.dataController.priorities[value] ?? 'Not set';
  }
}
