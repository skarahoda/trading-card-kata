// @ts-ignore
import {Player} from './Player';

describe('Player', () => {
    it('should create object', () => {
        expect(new Player()).toBeDefined();
    });

    it('should increment the mana slots', () => {
        const player = new Player();
        player.incrementManaSlots();
        expect(player.getManaSlots()).toBe(1);
    });

    it('can increment the mana slots upto 10', () => {
        const player = new Player();
        for(let i = 0; i< 10; i++){
            player.incrementManaSlots();
            expect(player.getManaSlots()).toBe(i+1);
        }
        player.incrementManaSlots();
        expect(player.getManaSlots()).toBe(10);
    });

    it('should get mana slot', () => {
        const player = new Player({ manaSlots: 10});
        expect(player.getManaSlots()).toBe(10);
    });

    it('should get health', () => {
        const player = new Player({ health: 20});
        expect(player.getHealth()).toBe(20);
    });

    it('should get deck', () => {
        const player = new Player({ deck: [1,3,2,3]});
        const deck = player.getDeck();
        expect(deck.filter(value => value === 1)).toHaveLength(1);
        expect(deck.filter(value => value === 2)).toHaveLength(1);
        expect(deck.filter(value => value === 3)).toHaveLength(2);

    });

    it('should get hand', () => {
        const player = new Player({ hand: [1,3,2,3]});
        const hand = player.getHand();
        expect(hand.filter(value => value === 1)).toHaveLength(1);
        expect(hand.filter(value => value === 2)).toHaveLength(1);
        expect(hand.filter(value => value === 3)).toHaveLength(2);

    });

    it('should refill mana slots', () => {
        const player = new Player();
        player.incrementManaSlots();
        player.refillManaSlots();
        expect(player.getFilledManaSlots()).toBe(1);
    });

    it('should play card when its available', () => {
        const player = new Player({manaSlots: 5, hand: [1]});
        player.playCard(0);
        expect(player.getFilledManaSlots()).toBe(4);
        expect(player.getHand()).toHaveLength(0);
    });

    it('should not play invalid card', () => {
        const player = new Player({manaSlots: 5, hand: [1]});
        expect(() => {
            player.playCard(1);
        }).toThrow(new RangeError('Index is too high'));
        expect(() => {
            player.playCard(-1);
        }).toThrow(new RangeError('Index is too low'));
    });

    it('should not play card when filledManaSlot is not enough', () => {
        const player = new Player({manaSlots: 5, hand: [7]});
        expect(() => {
            player.playCard(0);
        }).toThrow(new Error('Insufficient mana'));
    });

    it('should not pick a card when the hand is full', () => {
        const player = new Player({ hand: [1,2,3,4,5], deck: [1,2,3,4,5]});
        player.pickCard();

        expect(player.getHand()).toHaveLength(5);
        expect(player.getDeck()).toHaveLength(4);
    });
});
