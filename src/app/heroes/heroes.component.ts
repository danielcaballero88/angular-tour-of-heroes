import { Component } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HEROES } from 'src/app/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
