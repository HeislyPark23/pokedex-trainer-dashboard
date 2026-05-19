import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../core/services/pokemon.service';

export interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private readonly pokemonService = inject(PokemonService);

  private readonly state = new BehaviorSubject<PokemonState>({
    pokemons: [],
    loading: false,
    error: null,
  });

  readonly state$ = this.state.asObservable();

  /**
   * Fetch paginated Pokémon list.
   */
  loadPokemons(limit = 20, offset = 0): void {
    this.patchState({
      loading: true,
      error: null,
    });

    this.pokemonService
      .getPokemonList(limit, offset)
      .pipe(
        finalize(() => {
          this.patchState({
            loading: false,
          });
        })
      )
      .subscribe({
        next: (pokemons) => {
          this.patchState({
            pokemons,
          });
        },

        error: () => {
          this.patchState({
            error: 'Failed to load Pokémon.',
          });
        },
      });
  }

  /**
   * Update store state.
   */
  private patchState(
    partialState: Partial<PokemonState>
  ): void {
    this.state.next({
      ...this.state.value,
      ...partialState,
    });
  }
}