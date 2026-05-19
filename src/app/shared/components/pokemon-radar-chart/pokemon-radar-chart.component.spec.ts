import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonRadarChartComponent } from './pokemon-radar-chart.component';

describe('PokemonRadarChartComponent', () => {
  let component: PokemonRadarChartComponent;
  let fixture: ComponentFixture<PokemonRadarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonRadarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonRadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
