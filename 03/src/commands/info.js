//Wir importieren SlashCommandBuilder von Discordjs Builders, um damit einfach Slash Commands zu erstellen 
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")
//Wir exportieren in unserem File, den Command mit module.exports
module.exports = {
    //Wir erstellen den Slash Command und fügen options hinzu
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Zeige informationen über diesen Server oder einen User an')
        .addSubcommand(subCommand=> subCommand.setName("server").setDescription("Informationen über diesen Server ausgeben"))
        .addSubcommand(
            subCommand => subCommand.setName("user").setDescription("Informationen über einen Member ausgeben")
            .addUserOption(option => option.setName("member").setDescription("Der Member").setRequired(true))),


    //Das ist unsere Methode, wo wir unsere Interaction abfangen, diese ist async
    async execute(interaction) {
        switch(interaction.options.getSubcommand()) {
            case "server": {
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle(`Informationen für die Guild ${interaction.guild.name}`)
                    .addFields([
                        {
                            name: "Channels",
                            value: `${interaction.guild.channels.cache.size} Channels`,
                            inline: true
                        },

                        {
                            name: "Erstellt",
                            value: `<t:${Math.round(interaction.guild.createdTimestamp/1000)}>`,
                            inline: true
                        }
                    ])

                ]})
                break
            }
            case "user": {
                const member = interaction.options.getMember("member")
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle(`Informationen für ${member.user.toString()}`)
                    .setThumbnail(member.user.avatarURL({dynamic: true}))
                    .addFields([
                        {
                            name: "Account erstellt ",
                            value: `<t:${Math.round(member.user.createdTimestamp/1000)}>`,
                            inline: true
                        },

                        {
                            name: "Guild beigetreten",
                            value: `<t:${Math.round(member.joinedTimestamp/1000)}>`,
                            inline: true
                        }
                    ])

                ]})
                break
            }
        }
    }
}