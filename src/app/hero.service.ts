import { Injectable } from '@angular/core'

import { Observable, catchError, of, tap } from 'rxjs'

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
    return (
      this.http
        .get<Hero[]>(this.heroesUrl)
        // Pipe for the response (I add this comment to get the .pipe in a newline).
        .pipe(
          // tap does something and passes the values along (it taps into the observable)
          tap(heroes => this.log(`fetched ${heroes.length} heroes`)),
          // if there is an error it is catched by this operator which takes a callback a parameter,
          // so we pass the service generice error handler function, which returns a function that
          // will handle the error.
          catchError(this.handleError<Hero[]>('getHeroes', [])),
        )
    )
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
    this.log(`fetched hero id=${id}`)
    return of(hero)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
