import {ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder} from "discord.js";
import {BuildButtonId, ButtonType} from ".";
import {StartGame} from "../gameCoordinator";

const gameStartButton: ButtonType = {
    buttonId: "gameStart",
    execute: async (intr, gameId: string) => {
        // start the game
        await StartGame(gameId);

        // create an updated action row
        const newActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel("Meeting Started")
                .setStyle(ButtonStyle.Primary)
                .setCustomId(BuildButtonId("meetingStart", gameId)),
            new ButtonBuilder()
                .setLabel("Game Ended")
                .setStyle(ButtonStyle.Danger)
                .setCustomId(BuildButtonId("gameEnd", gameId))
        );

        // edit the original message
        await intr.update({components: [newActionRow]});
    },
};

export {gameStartButton as button};
