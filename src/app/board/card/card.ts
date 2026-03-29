import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { LucideX, LucideDot } from '@lucide/angular';
import { CardController } from '../column/card-controller';

export enum Priority {
  Chill = 'Chill',
  Emshy = 'Emshy Emshy',
  GettingNervous = 'Getting Nervous',
  AssOnFire = 'Ass On Fire',
}

export interface CardDto {
  id: string;
  title: string;
  description: string;
  tag: string;
  priority: Priority;
}

@Component({
  selector: 'app-card',
  imports: [LucideX, LucideDot],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'toggleActive()',
    '[class.active]': 'active()',
  },
})
export class Card {
  protected cardController = inject(CardController);
  card = input.required<CardDto>();
  active = computed<boolean>(() => this.cardController.activeCards().has(this.card().id));

  priorityWeight: Record<string, string> = {
    [Priority.Chill]: 'p-0',
    [Priority.Emshy]: 'p-1',
    [Priority.GettingNervous]: 'p-2',
    [Priority.AssOnFire]: 'p-3',
  };

  toggleActive() {
    if (!this.active()) this.cardController.addCard(this.card().id);
    else this.cardController.removeCard(this.card().id);
  }
}
