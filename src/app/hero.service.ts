import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'

import { Hero } from 'src/app/hero'
import { MessageService } from 'src/app/message.service'
import { HEROES } from 'src/app/mock-heroes'

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    // This creates an observable that emits a single value: the array of mock
    // heroes. Using this observable is a better mock for making a web request
    // where the data will not be ready beforehand.
    const heroes = of(HEROES)
    // Adding a message when fetching heroes
    this.messageService.add('HeroService: fetched heroes')
    // Done
    return heroes
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(hero)
  }
}
