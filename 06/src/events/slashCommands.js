const { Interaction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Interaction} interaction
     */
    async execute(interaction) {
        if(!interaction.isChatInputCommand()) return

        const command = interaction.client.commands.get(interaction.commandName)

        if(command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if(interaction.deferred || interaction.replied) {
                    interaction.editReply('There was an error while executing this command!')
                }else {
                    interaction.reply('There was an error while executing this command!')
                }
            }
        }
    }    
}