import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { BattleFeedComponent }
from '../components/battle-feed/battle-feed.component';

@Component({
  selector: 'app-battles-page',
  standalone: true,
  imports: [
    CommonModule,
    BattleFeedComponent,
  ],
  templateUrl:
    './battles-page.component.html',
  styleUrl:
    './battles-page.component.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class BattlesPageComponent {}