import {IBleedingOut, Player} from './Player';

const playerConfig = {
    deck: [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8],
    hand: [],
    manaSlots: 0,
    health: 30,
};

export class Game {
    private activePlayer: Player;
    private opponent: Player;

    constructor({
                    activePlayer = new Player({...playerConfig, name: 'Player 1'}),
                    opponent = new Player({...playerConfig, name: 'Player 2'})
                } = {}) {
        this.activePlayer = activePlayer;
        this.opponent = opponent;
    }

    getActivePlayer(): Player {
        return this.activePlayer;
    }

    getOpponent(): Player {
        return this.opponent;
    }

    prepareFirstRound(): void {
        for (let i = 0; i < 3; i++) {
            this.activePlayer.pickCard();
            this.opponent.pickCard();
        }
        this.startRound();
    }

    playCard(number: number): number {
        const damage = this.activePlayer.playCard(number);
        this.opponent.receiveDamage(damage);
        return damage;
    }

    isOutOfMove(): boolean {
        return this.activePlayer.isOutOfMove();
    }

    switchActivePlayer(): IBleedingOut {
        let tmp = this.opponent;
        this.opponent = this.activePlayer;
        this.activePlayer = tmp;
        return this.startRound();
    }

    isWin(): boolean {
        return this.opponent.isDead();
    }

    private startRound(): IBleedingOut {
        this.activePlayer.incrementManaSlots();
        this.activePlayer.refillManaSlots();
        return this.activePlayer.pickCard();
    }
}
