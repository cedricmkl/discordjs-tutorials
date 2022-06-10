const { Message, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     */
    async execute(message) {
        const channel = message.guild.channels.cache.get(process.env.LOG_CHANNEL_ID)

        const embed = new EmbedBuilder()
            .setTitle("Nachricht gelöscht")
            .setColor("Blurple")
            .setTimestamp(  )
            .addFields({
                name: "User",
                value: message.member.user.toString()
            },
            {
                name: "Inhalt",
                value: message.content || "keinen Inhalt"
            })

        await channel.send({embeds: [embed]})
    }    
}