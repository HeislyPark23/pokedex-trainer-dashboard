import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

import { GET_POKEMON_LIST } from '../../graphql/pokemon.queries';
import { Pokemon } from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apollo = inject(Apollo);

  /**
   * Fetch paginated Pokémon list.
   */
  getPokemonList(
    limit: number,
    offset: number
  ): Observable<Pokemon[]> {
    return this.apollo
      .watchQuery<any>({
        query: GET_POKEMON_LIST,
        variables: {
          limit,
          offset,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.pokemon_v2_pokemon)
      );
  }
}