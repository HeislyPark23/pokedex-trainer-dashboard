import {
  Injectable,
} from '@angular/core';

import {
  BehaviorSubject,
} from 'rxjs';

export interface Team {
  id: number;

  teamName: string;

  pokemon: unknown[];
}

interface TrainerState {
  teams: Team[];
}

@Injectable({
  providedIn: 'root',
})
export class TrainerStoreService {
  private readonly state =
    new BehaviorSubject<TrainerState>({
      teams: [],
    });

  readonly state$ =
    this.state.asObservable();

  /**
   * Gets current state snapshot.
   */
  private get snapshot():
    TrainerState {
    return this.state.value;
  }

  /**
   * Performs optimistic
   * team creation.
   */
  createTeam(
    team: Team
  ): void {
    const previousState =
      this.snapshot;

    /**
     * Optimistic update:
     * update UI immediately.
     */
    this.state.next({
      teams: [
        ...previousState.teams,
        team,
      ],
    });

    /**
     * Simulated rollback.
     */
    const shouldFail =
      Math.random() < 0.2;

    if (shouldFail) {
      setTimeout(() => {
        console.error(
          'Rollback triggered'
        );

        this.state.next(
          previousState
        );
      }, 1000);
    }
  }
}