import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  uniqueTeamNameValidator,
} from '../../../../shared/validators/team-name.validator';

import {
  TrainerStoreService,
} from '../../../../state/trainer-store.service';

import {
  ToastService,
} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-team-builder-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl:
    './team-builder-form.component.html',
  styleUrl:
    './team-builder-form.component.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class TeamBuilderFormComponent {
  private readonly fb =
    inject(FormBuilder);

  private readonly trainerStore =
    inject(TrainerStoreService);

  private readonly toastService =
    inject(ToastService);

  /**
   * Competitive mode state.
   */
  readonly competitiveMode =
    signal(false);

  /**
   * Team builder form.
   */
  readonly form = this.fb.group({
    teamName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
      [
        uniqueTeamNameValidator(),
      ],
    ],

    pokemon: this.fb.array([]),

    competitiveTier: [''],

    notes: [''],
  });

  /**
   * Pokémon FormArray.
   */
  get pokemonControls(): FormArray {
    return this.form.get(
      'pokemon'
    ) as FormArray;
  }

  /**
   * Total selected Pokémon.
   */
  readonly pokemonCount =
    computed(() => {
      return this.pokemonControls.length;
    });

  /**
   * Adds a Pokémon slot.
   */
  addPokemon(): void {
    if (
      this.pokemonControls.length >= 6
    ) {
      return;
    }

    this.pokemonControls.push(
      this.fb.group({
        pokemonName: [
          '',
          Validators.required,
        ],

        nickname: [''],

        heldItem: ['Leftovers'],

        evTotal: [0],
      })
    );
  }

  /**
   * Removes Pokémon slot.
   */
  removePokemon(
    index: number
  ): void {
    this.pokemonControls.removeAt(index);
  }

  /**
   * Toggles competitive mode.
   */
  toggleCompetitiveMode(): void {
    this.competitiveMode.update(
      (value) => !value
    );
  }

  /**
   * Submits form.
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.trainerStore.createTeam({
      id: Date.now(),

      teamName:
        this.form.value.teamName ?? '',

      pokemon:
        this.form.value.pokemon ?? [],
    });

    this.toastService.show(
      'Team created successfully!'
    );

    console.log(
      'Optimistic team created'
    );

    this.form.reset();

    this.pokemonControls.clear();
  }
}