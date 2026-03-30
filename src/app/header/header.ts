import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '../components/button/button';
import {
  LucideChevronRight,
  LucideChevronLeft,
  LucidePlus,
  LucideEllipsisVertical,
  LucideFolderInput,
  LucideMoon,
  LucideSlidersHorizontal,
  LucideSearch,
} from '@lucide/angular';
import { Input } from '../components/input/input';
import { TaskController } from '../task-editor/task-controller';
import { Chip } from '../components/chip/chip';

@Component({
  selector: 'app-header',
  imports: [
    Button,
    Input,
    Chip,
    LucideChevronRight,
    LucideChevronLeft,
    LucidePlus,
    LucideEllipsisVertical,
    LucideFolderInput,
    LucideMoon,
    LucideSlidersHorizontal,
    LucideSearch,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private taskController = inject(TaskController);

  protected openTaskEditor() {
    this.taskController.openEditor();
  }
}
