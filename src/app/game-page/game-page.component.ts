import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CardTodoComponent } from '../card-todo/card-todo.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatDividerModule,
     MatIconModule, FormsModule, MatDialogModule, CardTodoComponent, GameInfoComponent],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { 
    this.game = new Game();
  }

  ngOnInit(): void {  
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string | undefined) => {
      if (name) { 
        this.game.players.push(name);
      }
    });
  }
}
