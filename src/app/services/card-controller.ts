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

  showCard(id: string, source: number): void {
    const cards = this.allCards();
    const card = cards.find((card) => card.id === id);
    if (!card) return;

    const updatedCard: ICard = { ...card, column: source };
    this.allCards.set([...cards.filter((card) => card.id !== id), updatedCard]);
  }

  hideCard(id: string): void {
    const cards = this.allCards();
    const card = cards.find((card) => card.id === id);
    if (!card) return;

    const updatedCard: ICard = { ...card, column: -1 };
    this.allCards.set([...cards.filter((card) => card.id !== id), updatedCard]);
  }

  moveCard(id: string, target: number): void {
    const cards = this.allCards();
    const card = cards.find((card) => card.id === id);
    if (!card) return;

    const updatedCard: ICard = { ...card, column: target };

    this.allCards.set([...cards.filter((card) => card.id !== id), updatedCard]);
  }
}
