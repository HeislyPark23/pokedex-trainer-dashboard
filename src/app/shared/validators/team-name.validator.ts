import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

import {
  Observable,
  of,
} from 'rxjs';

import {
  delay,
  map,
} from 'rxjs/operators';

/**
 * Simulates async unique team name validation.
 */
export function uniqueTeamNameValidator():
  AsyncValidatorFn {
  const existingNames = [
    'Kanto Starters',
    'Johto Squad',
    'Water Specialists',
  ];

  return (
    control:
      AbstractControl
  ):
    Observable<
      ValidationErrors | null
    > => {
    return of(
      existingNames.includes(
        control.value
      )
    ).pipe(
      delay(500),

      map((exists) => {
        return exists
          ? {
              teamNameTaken: true,
            }
          : null;
      })
    );
  };
}