import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-page',
  imports: [CommonModule],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  ngOnInit(): void {  
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    this.currentCard = this.game.stack.pop()!;
    console.log(this.currentCard);
    this.pickCardAnimation = true;
  }
}
