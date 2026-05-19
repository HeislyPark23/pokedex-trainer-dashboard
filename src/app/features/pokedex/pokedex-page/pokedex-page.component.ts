import { LoadingSpinnerComponent }
from '../../../shared/components/loading-spinner/loading-spinner.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule,  } from '@angular/forms';

import { toSignal } from '@angular/core/rxjs-interop';

import { Pokemon } from '../../../models/pokemon.model';

import { PokemonStore } from '../../../state/pokemon.store';

import {
  selectLoading,
  selectPokemons,
  
} from '../../../state/pokemon.selectors';
import { PokemonRadarChartComponent }
from '../../../shared/components/pokemon-radar-chart/pokemon-radar-chart.component';

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PokemonRadarChartComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './pokedex-page.component.html',
  styleUrl: './pokedex-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexPageComponent {
  private readonly pokemonStore = inject(PokemonStore);

  /**
   * Search input state.
   */
  readonly searchTerm = signal('');

  /**
   * Sorting direction state.
   */
  readonly sortDirection = signal<'asc' | 'desc'>('asc');

  readonly currentPage = signal(1);

  readonly pageSize = signal(10);

  readonly selectedPokemon =
  signal<Pokemon | null>(null);

  /**
   * Pokémon list signal from store.
   */
  readonly pokemons = toSignal(
    selectPokemons(this.pokemonStore.state$),
    {
      initialValue: [] as Pokemon[],
    }
  );

  /**
   * Loading state signal.
   */
  readonly loading = toSignal(
    selectLoading(this.pokemonStore.state$),
    {
      initialValue: false,
    }
  );

  /**
   * Filtered Pokémon based on search term.
   */
  readonly filteredPokemons = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.pokemons().filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term)
    );
  });

  /**
   * Sorted Pokémon list.
   */
  readonly sortedPokemons = computed(() => {
    const direction = this.sortDirection();

    return [...this.filteredPokemons()].sort((a, b) => {
      if (direction === 'asc') {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });
  });

  readonly paginatedPokemons = computed(() => {
    const page = this.currentPage();

    const size = this.pageSize();

    const startIndex = (page - 1) * size;

    const endIndex = startIndex + size;

    return this.sortedPokemons().slice(
      startIndex,
      endIndex
    );
  });

  readonly totalPages = computed(() => {
    return Math.ceil(
      this.sortedPokemons().length /
        this.pageSize()
    );
  });

  /**
 * Moves to next page.
  */
  nextPage(): void {
    if (
      this.currentPage() <
      this.totalPages()
    ) {
      this.currentPage.update((page) => page + 1);
    }
  }

  /**
   * Moves to previous page.
   */
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  /**
   * Opens Pokémon detail panel.
   */
  selectPokemon(
    pokemon: Pokemon
  ): void {
    this.selectedPokemon.set(pokemon);
  }

  /**
   * Closes Pokémon detail panel.
   */
  closeDetails(): void {
    this.selectedPokemon.set(null);
  }

  constructor() {
    this.pokemonStore.loadPokemons(20, 0);
  }
}

