import {
  uniqueTeamNameValidator,
} from './team-name.validator';

describe(
  'uniqueTeamNameValidator',
  () => {
    it(
      'should detect duplicate name',
      (done) => {
        const validator =
          uniqueTeamNameValidator();

        validator({
          value:
            'Kanto Starters',
        } as never).subscribe(
          (result) => {
            expect(
              result
            ).toEqual({
              teamNameTaken:
                true,
            });

            done();
          }
        );
      }
    );
  }
);