require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const prefijo = '$'

client.once('ready', () => console.log(`Ya cargue, soy ${client.user.tag}!`));

// necesario siempre poner un signo al principio porq sino da un bucle de respuestas
// con un signo unicamente corre la respuesta una vez

client.on('message', msg => {
    if (!msg.content.startsWith(prefijo) || msg.author.bot) return;

    const args = msg.content.slice(prefijo.length).trim().split(/ +/);      // separa el prefijo del argumento y elimina espacios devuelve un []
    const command = args.shift().toLowerCase();                             // pasa el argumento a minuscula y devuelve la palabra clave

    if (command === 'saludo') {
        if (!args.length) {
            msg.channel.send(`Fijate que te falta escribir algo mas, ${msg.author}!`);  // si no hay un comando devuelve eso
            msg.react('💩')
        }
        else {
            msg.channel.send(`Al fin llego ${msg.mentions.users.first()}`);
        }
        msg.channel.send(`El argumento ${args[0]} no es valido`)
    }
});

client.login(process.env.ApiKey);

