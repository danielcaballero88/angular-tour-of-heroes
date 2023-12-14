import { Component } from '@angular/core';

import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(
    private heroService: HeroService, private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // Subscribe to getHeroes() to assign the data to the component variable
    // once the data is ready. This way we don't block the browser while waiting
    // for the data.
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }
}
