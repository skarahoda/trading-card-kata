import {prompt, Separator} from 'inquirer';

import {Game, Player} from './models';

const logPlayerStatus = (player: Player) => {
    console.log('\tHealth:', player.getHealth());
    console.log(`\tMana: ${player.getFilledManaSlots()}/${player.getManaSlots()}`);
};

const logCurrentStatus = (game: Game) => {
    const activePlayer: Player = game.getActivePlayer();
    console.log('Active Player:', activePlayer.getName());
    logPlayerStatus(activePlayer);

    console.log('');

    const opponent: Player = game.getOpponent();
    console.log('Opponent:', opponent.getName());
    logPlayerStatus(opponent);
};

export const app = async () => {
    const game = new Game();
    game.prepareFirstRound();


    while(!game.isWin()) {
        logCurrentStatus(game);
        const hand = game.getActivePlayer().getHand();

        let move = -1;
        if(game.isOutOfMove()) {
            console.log(`${game.getActivePlayer().getName()} has not valid move`);
        }
        else {
            const response = await prompt([{
                type: 'list',
                name: 'move',
                message: `${game.getActivePlayer().getName()}, what is your move?`,
                choices: [
                    ...hand.map((name, value) => ({name: String(name), value})),
                    new Separator(),
                    { name: 'pass', value: -1},
                ]
            }]);
            move = response.move;
        }

        if(move === -1) {
            console.log('Switching to opponent....');
            const { isBleedingOut }  = game.switchActivePlayer();
            if(isBleedingOut) {
                console.log(`${game.getActivePlayer().getName()} is bleeding out`);
            }
        }else {
            try{
                const damage = game.playCard(move);
                console.log(`${game.getOpponent().getName()} is receives ${damage} damage`);
            } catch (e) {
                console.log(e.message);
            }
        }
        console.log('\n=======================================\n');
    }
    console.log(`${game.getActivePlayer().getName()} won the game`);
};