require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const prefijo = '$'

client.once('ready', () => console.log(`Ya cargue, soy ${client.user.tag}!`));

// necesario siempre poner un signo al principio porq sino da un bucle de respuestas
// con un signo unicamente corre la respuesta una vez


const comando = (msg, cmd, args) => {

    if (!args.length) {
        msg.channel.send(`Fijate que te falta escribir algo mas, ${msg.author}!`);  // si no hay un comando devuelve eso
        msg.react('💩')
        return 0;
    }
    switch (cmd) {
        case 'saludo':
            if (args !== msg.mentions.users.first()) {
                msg.channel.send('No etiquetaste a nadie')
                break;
            } else {
                msg.channel.send(`Al fin llego el genio de ${msg.mentions.users.first()}`);
                break;
            }
        case 'bot':
            if (args[0] === 'hoy') {
                msg.channel.send(`Segun mis calculo suponiendo un comportamiento de la distribucion de probabilidad Normal hay una probabilidad del ${Math.random().toFixed(2) * 100}%`)
                break;
            }
        default:
            break;
    }
}


client.on('message', msg => {
    if (!msg.content.startsWith(prefijo) || msg.author.bot) return;

    const args = msg.content.slice(prefijo.length).trim().split(/ +/);      // separa el prefijo del argumento y elimina espacios devuelve un []
    const command = args.shift().toLowerCase();                             // pasa el argumento a minuscula y devuelve la palabra clave
    comando(msg, command, args)
});

client.login(process.env.ApiKey);

