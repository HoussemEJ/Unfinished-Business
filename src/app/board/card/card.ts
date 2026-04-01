import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CardController } from '../../services/card-controller';
import { Tag } from '../../components/tag/tag';
import { ICard } from '../../model';

@Component({
  selector: 'app-card',
  imports: [Tag],
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

  card = input.required<ICard>();
  protected active = computed<boolean>(() => this.cardController.activeCards().has(this.card().id));

  protected toggleActive() {
    if (this.active()) {
      this.cardController.removeActiveCard(this.card().id);
    } else {
      this.cardController.addActiveCard(this.card().id);
    }
  }
}
