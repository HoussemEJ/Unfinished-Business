import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '../components/button/button';
import {
  LucideChevronRight,
  LucideChevronLeft,
  LucideMinus,
  LucidePlus,
  LucideEllipsisVertical,
  LucideFolderInput,
  LucideMoon,
  LucideSlidersHorizontal,
} from '@lucide/angular';
import { Input } from '../components/input/input';
import { TaskController } from '../task-editor/task-controller';
import { Tag } from '../components/tag/tag';
import { Chip } from '../components/chip/chip';

@Component({
  selector: 'app-header',
  imports: [
    Button,
    Input,
    Tag,
    Chip,
    LucideChevronRight,
    LucideChevronLeft,
    LucideMinus,
    LucidePlus,
    LucideEllipsisVertical,
    LucideFolderInput,
    LucideMoon,
    LucideSlidersHorizontal,
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
