import { computed, inject, Injectable, signal } from '@angular/core';
import { ICard } from '../model';
import { DataController } from './data-controller';

@Injectable({
  providedIn: 'root',
})
export class CardController {
  private dataController = inject(DataController);
  private allCards = signal<ICard[]>([]);

  constructor() {
    // TODO
    this.allCards.set(this.dataController.cards);
  }

  columns = computed(() => {
    const cards = this.allCards();
    const columns: ICard[][] = [[], [], [], []];

    cards.forEach((card) => columns[card.column].push(card));
    return columns.map((column) => column.sort((a, b) => a.order.localeCompare(b.order)));
  });

  protected _activeCards = signal(new Set<string>());
  activeCards = this._activeCards.asReadonly();

  getCards(): ICard[][] {
    return this.columns();
  }

  addActiveCard(id: string): void {
    if (id && !this._activeCards().has(id)) {
      this._activeCards.update((cards) => new Set(cards).add(id));
    }
  }

  removeActiveCard(id: string): void {
    if (id && this._activeCards().has(id)) {
      this._activeCards.update((cards) => {
        const newSet = new Set(cards);
        newSet.delete(id);
        return newSet;
      });
    }
  }
}
