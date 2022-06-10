const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js");
const { collection } = require("../data/messageCommandData");

//Wir exportieren in unserem File, den Command mit module.exports
module.exports = {
	name: "message",
	//Das ist unsere Methode, wo wir unsere Interaction abfangen, diese ist async
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
        const channel = interaction.options.getChannel("channel")
        if(!channel.isTextBased()) return

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("message_mode")
                    .setOptions([{
                        label: "Embed",
                        description: "Nachricht in einem Embed verschicken.",
                        value: "embed"
                    }, {
                        label: "Nachricht",
                        description: "Nachricht als normale Nachricht verschicken.",
                        value: "message"
                    }])
            )

        const message = await interaction.reply({content: "Wie soll die Nachricht verschickt werden?", components: [row], 
        fetchReply: true, ephemeral: true})

        collection.set(message.id, channel)
	}
}