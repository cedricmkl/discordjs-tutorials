require("dotenv").config() //Wieder Dotenv für unseren Token und Später unsere Application ID
const fs = require("fs") //Fs (Filesystem) (Datein auslesen aus command files)
const { REST } = require("@discordjs/rest") //REST Client um die Commands zu regestrieren
const { Routes } = require('discord-api-types/v9'); //API Types um die REST Route für ApplicationCommands zu bekommen
const commands = [] //Später kommen hier unsere Commands aus den Files rein

//Mit FS den Ordner "commands" durchgehen und nur JS Datein akzeptieren
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 

//Commandfiles Durchgehen und durch require das Module (den Command) laden und in unser Array hinzufügen (toJSON wegen Discordjs Builders)
commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    commands.push(command.data.toJSON())
})

//RestClient zum Erstellen der Commands regestrieren
const restClient = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN)

//Guild ID und Discord Appliction ID noch im .env festlegen

//PUT Webrequest mit der Route und der ApplicationID und der GuildID an Discord Senden und wenns funktioniert hat eine Nachricht ausgeben
//Für Global Commands die Guild ID entfernen und Routes.applicationCommands stattdessen nutzen
restClient.put(Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DISCORD_GUILD_ID),
    { body: commands })
    .then(() => console.log("Sucessfully registered Commands!"))
    .catch(console.error)


//Danach in der package.json als Script erstellen   