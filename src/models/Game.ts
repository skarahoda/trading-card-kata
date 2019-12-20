import {Player} from './Player';

const playerConfig = {
    deck: [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
    hand: [],
    manaSlots: 0,
    health: 30,
};

export class Game {
    private readonly player1: Player;
    private readonly player2: Player;
    private activePlayer: Player;
    private opponent: Player;

    constructor({
                    player1 = new Player(playerConfig),
                    player2 = new Player(playerConfig)
    } = {}) {
        this.player1 = player1;
        this.player2 = player2;
        this.activePlayer = this.player1;
        this.opponent = this.player2;
    }

    getPlayer1(): Player {
        return this.player1;
    }

    getPlayer2(): Player {
        return this.player2;
    }

    prepareFirstRound(): void {
        for(let i = 0; i < 3; i++) {
            this.player1.pickCard();
            this.player2.pickCard();
        }
        this.startRound();
    }

    playCard(number: number): void {
        const damage = this.activePlayer.playCard(number);
        this.opponent.receiveDamage(damage);
    }

    isOutOfMove(): boolean {
        return this.activePlayer.isOutOfMove();
    }

    switchActivePlayer(): void {
        let tmp = this.opponent;
        this.opponent = this.activePlayer;
        this.activePlayer = tmp;
        this.startRound();
    }

    private startRound(): void {
        this.activePlayer.pickCard();
        this.activePlayer.incrementManaSlots();
        this.activePlayer.refillManaSlots();
    }

    isWin(): boolean {
        return this.opponent.isDead();
    }
}
