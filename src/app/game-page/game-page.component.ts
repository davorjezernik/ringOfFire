import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  imports: [CommonModule, Router],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  constructor(private router: Router) { }

  newGame() {
    this.router.navigateByUrl('/game');
    //start game
  }
}
