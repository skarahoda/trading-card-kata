import {Game} from './Game';
import {Player} from './Player';


let game: Game;
describe('Game', () => {
    beforeEach(() => {
        game = new Game();
    });

    it('should have two player', () => {
        expect(game.getPlayer1()).toBeInstanceOf(Player);
        expect(game.getPlayer2()).toBeInstanceOf(Player);
    });

    it('should complete the preparation', () => {
        game.prepareFirstRound();
        for(let player of [game.getPlayer1(), game.getPlayer2()]) {
            const deck = player.getDeck();
            const hand = player.getHand();

            const cards = [...deck, ...hand];
            expect(cards).toHaveLength(20);
            expect(cards.filter(value => value === 0)).toHaveLength(2);
            expect(cards.filter(value => value === 1)).toHaveLength(2);
            expect(cards.filter(value => value === 2)).toHaveLength(3);
            expect(cards.filter(value => value === 3)).toHaveLength(4);
            expect(cards.filter(value => value === 4)).toHaveLength(3);
            expect(cards.filter(value => value === 5)).toHaveLength(2);
            expect(cards.filter(value => value === 6)).toHaveLength(2);
            expect(cards.filter(value => value === 7)).toHaveLength(1);
            expect(cards.filter(value => value === 8)).toHaveLength(1);
        }

        expect(game.getPlayer1().getManaSlots()).toEqual(1);
        expect(game.getPlayer1().getFilledManaSlots()).toEqual(1);
    });

    describe('Active Player', () => {
        it('should damage to opponent', () => {
            const game = new Game({
                player1: new Player({ manaSlots: 10, hand: [2]}),
                player2: new Player({ health: 5}),
            });

            game.playCard(0);
            expect(game.getPlayer2().getHealth()).toEqual(3);
        });

        it('should switch to opponent', () => {
            const player2 = new Player({ manaSlots: 5, hand: [], deck: [1]});
            const game = new Game({
                player1: new Player(),
                player2,
            });

            game.switchActivePlayer();

            expect(player2.getHand()).toHaveLength(1);
            expect(player2.getDeck()).toHaveLength(0);
            expect(player2.getFilledManaSlots()).toBe(6);
            expect(player2.getManaSlots()).toBe(6);
        });
    });
});
