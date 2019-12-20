import {Player} from './Player';

export class Game {
    private readonly player1: Player;
    private readonly player2: Player;

    constructor() {
        this.player1 = new Player();
        this.player2 = new Player();
    }

    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }
}
