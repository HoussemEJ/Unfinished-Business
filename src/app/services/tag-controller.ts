import { inject, Injectable, signal } from '@angular/core';
import { DataController } from './data-controller';
import { ITag } from '../model';

@Injectable({
  providedIn: 'root',
})
export class TagController {
  private dataController = inject(DataController);
  tagList = signal<ITag[]>([]);

  constructor() {
    // TODO
    this.tagList.set(this.dataController.tagList);
  }
}
