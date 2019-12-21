import {Game} from './Game';
import {Player} from './Player';

let game: Game;
describe('Game', () => {
    beforeEach(() => {
        game = new Game();
    });

    it('should have two player', () => {
        expect(game.getActivePlayer()).toBeInstanceOf(Player);
        expect(game.getOpponent()).toBeInstanceOf(Player);
    });

    it('should complete the preparation', () => {
        game.prepareFirstRound();
        for (let player of [game.getActivePlayer(), game.getOpponent()]) {
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

        expect(game.getActivePlayer().getHand()).toHaveLength(4);
        expect(game.getOpponent().getHand()).toHaveLength(3);
        expect(game.getActivePlayer().getManaSlots()).toEqual(1);
        expect(game.getActivePlayer().getFilledManaSlots()).toEqual(1);
    });

    describe('Active Player', () => {
        it('should damage to opponent', () => {
            const game = new Game({
                activePlayer: new Player({manaSlots: 10, hand: [2]}),
                opponent: new Player({health: 5}),
            });

            expect(game.playCard(0)).toEqual(2);
            expect(game.getOpponent().getHealth()).toEqual(3);
        });

        it('should switch to opponent', () => {
            const opponent = new Player({manaSlots: 5, hand: [], deck: [1]});
            const game = new Game({
                activePlayer: new Player(),
                opponent,
            });

            game.switchActivePlayer();

            expect(opponent.getHand()).toHaveLength(1);
            expect(opponent.getDeck()).toHaveLength(0);
            expect(opponent.getFilledManaSlots()).toBe(6);
            expect(opponent.getManaSlots()).toBe(6);
        });

        it('should be out of move when mana slots are not enough', () => {
            const game = new Game({
                activePlayer: new Player({manaSlots: 4, hand: [3, 5]}),
                opponent: new Player({health: 5}),
            });

            game.playCard(0);
            expect(game.isOutOfMove()).toEqual(true);
        });

        it('should be out of move when hand is empty', () => {
            const game = new Game({
                activePlayer: new Player({manaSlots: 5, hand: []}),
                opponent: new Player({health: 5}),
            });

            expect(game.isOutOfMove()).toEqual(true);
        });

        it('should not be out of move when hand is empty', () => {
            const game = new Game({
                activePlayer: new Player({manaSlots: 5, hand: []}),
                opponent: new Player({health: 5}),
            });

            expect(game.isOutOfMove()).toEqual(true);
        });

        it('should win', () => {
            const game = new Game({
                activePlayer: new Player({manaSlots: 5, hand: [5]}),
                opponent: new Player({health: 5}),
            });

            game.playCard(0);
            expect(game.isWin()).toEqual(true);
        });
    });
});
