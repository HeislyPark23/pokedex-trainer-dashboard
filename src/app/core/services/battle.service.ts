import { Injectable } from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
} from 'rxjs';

export interface BattleLog {
  id: number;

  battle_id: number;

  timestamp: string;

  message: string;

  severity: string;
}

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private readonly apiUrl =
    'http://localhost:4000/battle_log';

  constructor(
    private readonly http: HttpClient
  ) {}

  /**
   * Fetches battle logs.
   */
  getBattleLogs():
    Observable<BattleLog[]> {
    return this.http.get<
      BattleLog[]
    >(this.apiUrl);
  }
}