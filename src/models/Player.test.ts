// @ts-ignore
import {Player} from './Player';

describe('Player', () => {
    it('should create object', () => {
        expect(new Player()).toBeDefined();
    });

    it('should starts with correct mana and health', () => {
        const player = new Player();
        expect(player.getMana()).toBe(0);
        expect(player.getHealth()).toBe(30);
    });

    it('should starts with correct cards', () => {
        const player = new Player();
        const deck = player.getDeck();
        expect(deck).toHaveLength(17);

        const hand = player.getHand();
        expect(hand).toHaveLength(3);

        const cards = [...deck, ...hand];
        expect(cards.filter(value => value === 0)).toHaveLength(2);
        expect(cards.filter(value => value === 1)).toHaveLength(2);
        expect(cards.filter(value => value === 2)).toHaveLength(3);
        expect(cards.filter(value => value === 3)).toHaveLength(4);
        expect(cards.filter(value => value === 4)).toHaveLength(3);
        expect(cards.filter(value => value === 5)).toHaveLength(2);
        expect(cards.filter(value => value === 6)).toHaveLength(2);
        expect(cards.filter(value => value === 7)).toHaveLength(1);
        expect(cards.filter(value => value === 8)).toHaveLength(1);
    });
});
