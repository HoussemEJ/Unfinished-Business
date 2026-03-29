import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../components/button/button';
import {
  LucideChevronRight,
  LucideChevronLeft,
  LucideMinus,
  LucidePlus,
  LucideEllipsisVertical,
  LucideSettings,
} from '@lucide/angular';
import { Input } from '../components/input/input';

@Component({
  selector: 'app-header',
  imports: [
    Button,
    Input,
    LucideChevronRight,
    LucideChevronLeft,
    LucideMinus,
    LucidePlus,
    LucideEllipsisVertical,
    LucideSettings,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
