export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push(`clubs_${i}`);
            this.stack.push(`diamonds_${i}`);
            this.stack.push(`hearts_${i}`);
            this.stack.push(`spade_${i}`);
        }
        shuffleStack(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        }
    }
}

function shuffleStack(stack: string[]) {
    for (let i = stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [stack[i], stack[j]] = [stack[j], stack[i]];
    }
}
