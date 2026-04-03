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
    this.columnHeaders.set(this.dataController.columnHeaders);
  }

  columnHeaders = signal<string[]>([]);
  columns = computed(() => {
    const cards = this.allCards();
    const columns: ICard[][] = [[], [], [], []];

    cards.forEach((card) => {
      if (card.column > -1) columns[card.column].push(card);
    });

    return columns;
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

  moveCard(id: string, target: number): void {
    this.allCards.update((cards) => {
      const cardIndex = cards.findIndex((c) => c.id === id);
      if (cardIndex === -1 || cards[cardIndex].column === target) return cards;

      const newCards = [...cards];
      const [movedCard] = newCards.splice(cardIndex, 1);
      movedCard.column = target;
      newCards.push(movedCard);

      return newCards;
    });
  }
}
