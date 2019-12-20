export class Player {
    private mana: number;
    private health: number;
    private readonly deck: number[];
    private readonly hand: number[];

    constructor() {
        this.mana = 0;
        this.health = 30;
        this.deck = [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8];
        this.hand = [];
        this.pickCard();
        this.pickCard();
        this.pickCard();
    }

    pickCard(): void {
        const index = Math.floor(Math.random()*this.deck.length);
        this.hand.push(this.deck[index]);
        this.deck.splice(index, 1);
    };

    getMana(): number {
        return this.mana;
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
}
