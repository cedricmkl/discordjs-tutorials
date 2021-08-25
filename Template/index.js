const {Client} = require("discord.js")
require("dotenv").config()

const client = new Client({intents: []})


client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! I am on ${client.guilds.cache.size} Guild(s)!`)
})


client.login(process.env.BOT_TOKEN)