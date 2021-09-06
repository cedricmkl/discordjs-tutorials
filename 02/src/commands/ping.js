//Wir importieren SlashCommandBuilder von Discordjs Builders, um damit einfach Slash Commands zu erstellen 
const { SlashCommandBuilder } = require("@discordjs/builders");

//Wir exportieren in unserem File, den Command mit module.exports
module.exports = {
	//Wir erstellen den Slash Command
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	//Das ist unsere Methode, wo wir unsere Interaction abfangen, diese ist async
	async execute(interaction) {
		//Mit Pong antworten
		await interaction.reply('Pong!');

		/*Andere Optionen, zu Antworten
			interaction.reply({content: "Pong!"});
		    interaction.reply({content: "Pong!", embeds: []});
			interaction.reply({content: "Pong!", ephemeral: true});
			interaction.editReply({content: "Pong!"});

			Video: Zeigen wie man zu den Types kommt und da mithilfe von STRG+F die richtigen Methoden/Properties/Payloads findet
		*/ 
	
	}
}