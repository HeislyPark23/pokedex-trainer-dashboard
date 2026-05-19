import { TestBed } from '@angular/core/testing';

import { TrainerStoreService } from './trainer-store.service';

describe(
  'TrainerStoreService',
  () => {
    let service:
      TrainerStoreService;

    beforeEach(() => {
      service =
        new TrainerStoreService();
    });

    it(
      'should create team',
      () => {
        service.createTeam({
          id: 1,
          teamName: 'Test',
          pokemon: [],
        });

        service.state$.subscribe(
          (state) => {
            expect(
              state.teams.length
            ).toBeGreaterThan(0);
          }
        );
      }
    );
  }
);