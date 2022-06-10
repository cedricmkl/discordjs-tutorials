require("dotenv").config() 
const { REST } = require("@discordjs/rest")
const { Routes, SlashCommandBuilder } = require("discord.js")

const commands = [
    new SlashCommandBuilder().setName("test").setDescription("Test!"),
    new SlashCommandBuilder().setName("info").setDescription("Informationen über Member oder die Guild")
        .addSubcommand(subCommand=> subCommand.setName("guild").setDescription("Informationen über die Guild"))
        .addSubcommand(subCommand=> subCommand.setName("member").setDescription("Informationen über einen Member")
            .addUserOption(option=> option.setName("member").setDescription("Der Member").setRequired(true)))
]

const restClient = new REST({version: "10"}).setToken(process.env.DISCORD_BOT_TOKEN)

restClient.put(Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DISCORD_GUILD_ID),
    { body: commands.map(command => command.toJSON() )})
    .then(() => console.log("Sucessfully registered Commands!"))
    .catch(console.error)
    