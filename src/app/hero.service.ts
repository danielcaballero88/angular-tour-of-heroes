import { Injectable } from '@angular/core'

import { Observable, delay, of } from 'rxjs'

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
}
