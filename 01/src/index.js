require("dotenv").config() //Dotenv Importieren und die config() Methode ausführen um die .env Datei zu laden.
const { Client } = require("discord.js") //Von Discord.js Client importieren.

const client = new Client({intents:[]}) //Den Client inizialisieren, ohne Intents (Intents Link).

client.once("ready", () => { //Einmalig das Ready Event abfangen (Wenn der Bot sich eingeloggt hat) (on um events mehrmals abzufangen).
    //Nachricht, wenn der Bot sich eingeloggt hat ausgeben, die den Tag des Bottes (Name und Discriminator) 
    //und Anzahl der Guilds, wo der Bot drauf ist enthällt.
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({name: "mit dem Code", type: "PLAYING"}) //Activity beim starten des Bottes anzeigen.
})

client.login(process.env.DISCORD_BOT_TOKEN) //Client mit dem Token aus der .env Datei einloggen lassen!