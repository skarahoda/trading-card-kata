import {Game} from './Game';
import {Player} from './Player';

describe('Game', () => {
    it('should create object', () => {
        expect(new Game()).toBeDefined();
    });
    it('should have two player', () => {
        const game = new Game();
        expect(game.getPlayer1()).toBeInstanceOf(Player);
        expect(game.getPlayer2()).toBeInstanceOf(Player);
    });
});
