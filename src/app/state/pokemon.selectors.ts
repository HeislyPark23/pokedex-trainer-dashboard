import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon.model';

import { PokemonState } from './pokemon.store';

export const selectPokemons = (
  state$: Observable<PokemonState>
) =>
  state$.pipe(
    map((state) => state.pokemons)
  );

export const selectLoading = (
  state$: Observable<PokemonState>
) =>
  state$.pipe(
    map((state) => state.loading)
  );

export const selectError = (
  state$: Observable<PokemonState>
) =>
  state$.pipe(
    map((state) => state.error)
  );