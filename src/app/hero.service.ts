import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs';

import { Hero } from 'src/app/hero';
import { HEROES } from 'src/app/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    // This creates an observable that emits a single value: the array of mock
    // heroes. Using this observable is a better mock for making a web request
    // where the data will not be ready beforehand.
    const heroes = of(HEROES);
    return heroes
  }
}
