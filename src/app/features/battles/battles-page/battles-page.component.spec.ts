import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlesPageComponent } from './battles-page.component';

describe('BattlesPageComponent', () => {
  let component: BattlesPageComponent;
  let fixture: ComponentFixture<BattlesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattlesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
