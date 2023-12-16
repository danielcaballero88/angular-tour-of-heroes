import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'

import { Hero } from 'src/app/hero'
import { MessageService } from 'src/app/message.service'
import { HEROES } from 'src/app/mock-heroes'

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes' // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  getHeroes(): Observable<Hero[]> {
    // Now we are fetching the heroes by making a request to the api (backend). This is being mocked
    // by the in-memory-data service which is using the in-memory-web-api of Angular.
    // https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
    // Adding a message when fetching heroes
    this.log('fetched heroes')
    // Done
    return heroes
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
    this.log(`fetched hero id=${id}`)
    return of(hero)
  }
}
