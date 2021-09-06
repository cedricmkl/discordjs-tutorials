require("dotenv").config() //Dotenv Importieren und die config() Methode ausführen um die .env Datei zu laden
const fs = require("fs")
const { Client, Collection } = require("discord.js") //Von Discord.js Client und Collection importieren

const client = new Client({intents:[]}) //Den Client inizialisieren, ohne Intents (Intents Link)

//Client.commands zu einer neuen Collection festlegen (damit kann man dann in jeder Client Instanz die Commands bekommen)
client.commands = new Collection() 

//Alle Files, die mit der Endung js enden aus dem Ordner commands holen (mit src weil wir nicht von unserem File rekusiv das laden können)
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 

//Die CommandFiles mit einer Schleife durch gehen und die Commands mit require importieren 
//(dieses mal kein src weil wir den Path vom diesem File aus angeben)
//In die Client.commands Collection als Key den Namen, des Commands setzen und als Value den Command selber
commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
})

client.once("ready", () => { //Einmalig das Ready Event abfangen (Wenn der Bot sich eingeloggt hat) (on um events mehrmals abzufangen)
    //Nachricht, wenn der Bot sich eingeloggt hat ausgeben, die den Tag des Bottes (Name und Discriminator) 
    //und Anzahl der Guilds, wo der Bot drauf ist enthällt
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({name: "mit dem Code", type: "PLAYING"}) //Activity beim starten des Bottes anzeigen
})

//Das interactionCreate Event abhören und mit einer async function ein Parameter hinzufügen, das wir interafction nennen hinzufügen
//Hierzu sind keine Intents nötig! Wir nutzen on damit wir das Event nicht nur einmal abhören
client.on("interactionCreate", async (interaction) => {

    //Wenn die Interaction keine SlashCommandInteraction ist returen wir
    if(!interaction.isCommand()) return

    //Wir holen uns aus unserer Commands Collection den Command mit dem Namen, den Wir aus der Interaction bekommen
    const command = client.commands.get(interaction.commandName)

    //Wir testen ob der Command, den wir aus unsrer Collection bekommen existiert
    if(command) {

        //Wir machen einen Try-Catch Block, um wenn ein Fehler beim ausführen passiert, wir dem User eine Nachricht senden können
        try {
            //Wir führen den Command aus
            await command.execute(interaction);
        } catch (error) {
            //Wir loggen bei einem Error den Error
            console.error(error);

            //Wenn die Interaction schon deferred oder replied wurde, nutzen wir editReply(), sonst reply()
            if(interaction.deferred || interaction.replied) {
                interaction.editReply('There was an error while executing this command!')
            }else {
                interaction.reply('There was an error while executing this command!')
            }
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN) //Client mit dem Token aus der .env Datei einloggen lassen!
