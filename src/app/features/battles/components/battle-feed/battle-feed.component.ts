import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  interval,
  switchMap,
} from 'rxjs';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

import {
  BattleLog,
  BattleService,
} from '../../../../core/services/battle.service';

@Component({
  selector: 'app-battle-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl:
    './battle-feed.component.html',
  styleUrl:
    './battle-feed.component.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class BattleFeedComponent {
  private readonly battleService =
    inject(BattleService);

  private readonly destroyRef =
    inject(DestroyRef);

  readonly logs =
    signal<BattleLog[]>([]);

  constructor() {
    /**
     * Simulated live subscription
     * using polling.
     *
     * Polling is used because
     * json-graphql-server does not
     * support real websocket
     * subscriptions.
     */
    interval(5000)
      .pipe(
        switchMap(() =>
          this.battleService.getBattleLogs()
        ),

        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe((logs) => {
        this.logs.set(logs);
      });

    this.loadInitialLogs();
  }

  /**
   * Loads initial logs.
   */
  loadInitialLogs(): void {
    this.battleService
      .getBattleLogs()
      .subscribe((logs) => {
        this.logs.set(logs);
      });
  }
}