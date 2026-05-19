import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { TeamBuilderFormComponent }
from '../components/team-builder-form/team-builder-form.component';

@Component({
  selector: 'app-team-builder-page',
  standalone: true,
  imports: [
    CommonModule,
    TeamBuilderFormComponent,
  ],
  templateUrl:
    './team-builder-page.component.html',
  styleUrl:
    './team-builder-page.component.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class TeamBuilderPageComponent {}