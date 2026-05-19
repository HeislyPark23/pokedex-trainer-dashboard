import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  BaseChartDirective,
} from 'ng2-charts';

import {
  ChartConfiguration,
  ChartOptions,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';

import { Pokemon } from '../../../models/pokemon.model';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-pokemon-radar-chart',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
  ],
  templateUrl:
    './pokemon-radar-chart.component.html',
  styleUrl:
    './pokemon-radar-chart.component.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class PokemonRadarChartComponent {
  readonly pokemon =
    input<Pokemon | null>(null);

  /**
   * Reactive radar chart data.
   */
  readonly radarChartData =
    computed<ChartConfiguration<'radar'>['data']>(
      () => {
        const pokemon = this.pokemon();

        if (!pokemon) {
          return {
            labels: [],
            datasets: [],
          };
        }

        return {
          labels:
            pokemon.pokemon_v2_pokemonstats.map(
              (stat) =>
                stat.pokemon_v2_stat.name
            ),

          datasets: [
            {
              data:
                pokemon.pokemon_v2_pokemonstats.map(
                  (stat) =>
                    stat.base_stat
                ),

              label: pokemon.name,
            },
          ],
        };
      }
    );

  /**
   * Radar chart options.
   */
  readonly radarChartOptions:
    ChartOptions<'radar'> = {
    responsive: true,

    animation: {
      duration: 800,
    },

    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 150,
      },
    },
  };
}