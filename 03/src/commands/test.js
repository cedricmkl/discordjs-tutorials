const { EmbedBuilder, ChatInputCommandInteraction} = require("discord.js");

//Wir exportieren in unserem File, den Command mit module.exports
module.exports = {
	name: "test",
	//Das ist unsere Methode, wo wir unsere Interaction abfangen, diese ist async
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		//await interaction.deferReply()
		//await interaction.deferReply({ephemeral: true})		
		const embed = new EmbedBuilder()
			.setTitle("Embeds")
			.setDescription("Beschreibung von einem Embed")
			.setURL("https://coolepizza.de")
			.setColor("Blurple")
			.addFields({
				name: "Interaction ID",
				value: interaction.id
			},
			{
				name: "User ID",
				value: interaction.user.id
			},
			{
				name: "Guild",
				value: interaction.guild.name
			},
			{
				name: "Mitglieder",
				value: interaction.guild.memberCount.toString()
			})
			.setAuthor({
				name: "Cedric",
				iconURL: "https://cdn.discordapp.com/avatars/435507892477755413/1e7455db01dd79d4fba61cea76f9fac7.png?size=1024",
				url: "https://coolepizza.de"
			})
			.setTimestamp()
			.setFooter({
				text: "Youtube Tutorial"
			})

		await interaction.reply({embeds: [embed]})
		//await interaction.reply({embeds: [embed], ephemeral: true})
		//await interaction.editReply({embeds: [embed]})
	}
}