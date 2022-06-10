const { Interaction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require("discord.js");
const { collection } = require("../data/messageCommandData");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Interaction} interaction
     */
    async execute(interaction) {
        if (!(interaction.isSelectMenu() && interaction.customId === "message_mode")) return
        const channel = collection.get(interaction.message.id)
        collection.delete(interaction.message.id)
        if (!channel) return

        const mode = interaction.values[0]
        await interaction.reply({ content: "Gebe den Inhalt der Nachricht ein." })

        const filter = message => message.member.user.id === interaction.user.id
        interaction.channel.awaitMessages({
            filter: filter,
            time: 600_000,
            max: 1,
            errors: ["time"]
        }).then(async messages => {
            const message = messages.first()
            await message.delete()
            const content = message.content

            const row = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId("message_send")
                    .setStyle(ButtonStyle.Primary)
                    .setLabel("Senden"),
                    new ButtonBuilder()
                        .setCustomId("message_reject")
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Abbrechen"))

            await interaction.editReply({
                content: content,
                components: [row]
            })

            const componentInteraction = await interaction.channel.awaitMessageComponent(
                {
                    componentType: ComponentType.Button,
                    max: 1,
                    filter: filter
                }
            )

            if (componentInteraction.customId === "message_send") {
                if (mode === "embed") {
                    channel.send({
                        embeds: [new EmbedBuilder()
                            .setDescription(content)]
                    })
                }else {
                    channel.send({ content })
                }
                await interaction.editReply({content: "Die Nachricht wurde gesendet.", components: []})
            } else if(componentInteraction.customId === "message_reject"){
                await interaction.editReply({content: "Der Vorgang wurde abgebrochen.", components: []})
            }



        }).catch((e) => interaction.editReply("Der Vorgang wurde abgebrochen."))

    }
}