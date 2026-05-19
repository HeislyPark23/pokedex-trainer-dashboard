import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleFeedComponent } from './battle-feed.component';

describe('BattleFeedComponent', () => {
  let component: BattleFeedComponent;
  let fixture: ComponentFixture<BattleFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
