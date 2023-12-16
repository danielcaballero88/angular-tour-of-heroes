import { Component, OnInit } from '@angular/core'

import { Hero } from 'src/app/hero'
import { HeroService } from 'src/app/hero.service'
import { MessageService } from 'src/app/message.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = []

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    // Subscribe to getHeroes() to assign the data to the component variable
    // once the data is ready. This way we don't block the browser while waiting
    // for the data.
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes))
  }

  add(name: string): void {
    name = name.trim()
    if (!name) {
      return
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero)
    })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }
}
