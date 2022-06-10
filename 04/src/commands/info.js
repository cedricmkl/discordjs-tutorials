const { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Formatters, TimestampStyles} = require("discord.js");

module.exports = {
	name: "info",
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		
		switch(interaction.options.getSubcommand()) {
			case "guild": {
				const guild = interaction.guild
				const embed = new EmbedBuilder()
					.setTitle(guild.name)
					.setThumbnail(guild.iconURL())
					.setColor("Blurple")
					.setDescription("Informationen über die Guild")
					.addFields({
						name: "Mitglieder",
						value: guild.memberCount.toString()
					},
					{
						name: "Kanäle",
						value: guild.channels.cache.size.toString()
					},
					{
						name: "Nitro Boost Level",
						value: `${guild.premiumTier} (${guild.premiumSubscriptionCount} Boosts)`
					})
					.setFooter({text: "Erstellt am"})
					.setTimestamp(guild.createdTimestamp)
				await interaction.reply({embeds: [embed]})
				break
			}
			case "member": {
				/**@type {GuildMember} */
				const member = interaction.options.getMember("member")
				const embed = new EmbedBuilder()
					.setTitle(member.user.tag)
					.setThumbnail(member.displayAvatarURL())
					.setColor("Blurple")
					.setDescription("Informationen über den Member")
					.addFields({
						name: "Guild Beigetreten",
						value: Formatters.time(member.joinedAt, TimestampStyles.LongDateTime)
					},
					{
						name: "Discord Beigetreten",
						value: Formatters.time(member.user.createdAt, TimestampStyles.LongDateTime)
					})
				await interaction.reply({embeds: [embed]})
			}
		}
	
	}
}