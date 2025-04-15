import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CardTodoComponent } from '../card-todo/card-todo.component';
import { Firestore, collection, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { onSnapshot } from '@firebase/firestore';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';


@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatDividerModule,
    MatIconModule, FormsModule, MatDialogModule, CardTodoComponent, PlayerMobileComponent],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  private firestore: Firestore = inject(Firestore);
  gameId: string = '';
  game: Game = new Game();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const gameId = params.get('id');

      if (gameId === 'new') {
        const newGame = new Game();
        const gamesCollection = collection(this.firestore, 'games');
        const docRef = await addDoc(gamesCollection, newGame.toJson());

        this.router.navigate(['/game', docRef.id]);
        return;
      }

      if (gameId) {
        this.gameId = gameId;
        const gameDoc = doc(this.firestore, 'games', gameId);
      
        onSnapshot(gameDoc, (docSnap) => {
          if (docSnap.exists()) {
            this.game = Object.assign(new Game(), docSnap.data());
          }
        });
      }
    });
  }

  async updateGame() {
    if (!this.gameId) return;
    const gameDocRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(gameDocRef, this.game.toJson());
  }

  async takeCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
  
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  
      await this.updateGame(); // save immediately so other devices see the card being picked
  
      setTimeout(async () => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        await this.updateGame(); // save after animation
      }, 1000);
    }
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(async (name: string | undefined) => {
      if (name) {
        this.game.players.push(name);
        await this.updateGame(); 
      }
    });
  }
}
