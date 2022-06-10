require("dotenv").config()
const fs = require("fs")
const { Client, Collection, ActivityType, GatewayIntentBits } = require("discord.js") 

const client = new Client({intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})

client.commands = new Collection() 

fs.readdirSync('./src/commands')
    .filter(file => file.endsWith('.js'))
    .forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.name, command);
})


fs.readdirSync('./src/events')
    .filter(file => file.endsWith('.js'))
    .forEach((commandFile) => {
	const event = require(`./events/${commandFile}`);
    client.on(event.name, (...args) => event.execute(...args))
})

client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({name: "mit dem Code", type: ActivityType.Playing}) 
})


client.login(process.env.DISCORD_BOT_TOKEN)
