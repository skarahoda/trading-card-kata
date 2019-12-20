export class Player {
    private manaSlots: number;
    private filledManaSlots: number;
    private health: number;
    private readonly deck: number[];
    private readonly hand: number[];

    constructor({ deck = [], hand = [], manaSlots = 0, health = 30 } = {}) {
        this.manaSlots = manaSlots;
        this.health = health;
        this.deck = [...deck];
        this.hand = [...hand];
        this.refillManaSlots();
    }

    pickCard(): void {
        const index = Math.floor(Math.random()*this.deck.length);
        this.hand.push(this.deck[index]);
        this.deck.splice(index, 1);
    };

    getManaSlots(): number {
        return this.manaSlots;
    }

    getHealth(): number {
        return this.health;
    }

    getDeck(): ReadonlyArray<number> {
        return this.deck;
    }

    getHand(): ReadonlyArray<number> {
        return this.hand;
    }

    incrementManaSlots(): void {
        if(this.manaSlots < 10){
            this.manaSlots += 1;
        }
    }

    getFilledManaSlots(): number {
        return this.filledManaSlots;
    }

    refillManaSlots(): void {
        this.filledManaSlots = this.manaSlots;
    }

    playCard(i: number): number {
        if(i >= this.hand.length) {
            throw new RangeError('Index is too high');
        }
        if(i < 0) {
            throw new RangeError('Index is too low');
        }
        if(this.filledManaSlots < this.hand[i]) {
            throw new Error('Insufficient mana');
        }
        const damage = this.hand[i];
        this.filledManaSlots -= damage;
        this.hand.splice(i, 1);
        return damage;
    };

    receiveDamage(damage: number): void {
        this.health -= damage;
    }

    isOutOfMove(): boolean {
        return this.hand.length === 0 || this.hand.reduce(
            (isOutOfMove, card) => isOutOfMove && card > this.filledManaSlots,
            true,
        );
    }

    isDead(): boolean {
        return this.health <= 0;
    }
}
