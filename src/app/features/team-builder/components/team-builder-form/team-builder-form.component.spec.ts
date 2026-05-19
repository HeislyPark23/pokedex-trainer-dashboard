import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuilderFormComponent } from './team-builder-form.component';

describe('TeamBuilderFormComponent', () => {
  let component: TeamBuilderFormComponent;
  let fixture: ComponentFixture<TeamBuilderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamBuilderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
