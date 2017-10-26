const Discord = require('discord.js')
const bot = new Discord.Client();
const client = new Discord.Client();
const fs = require("fs");
const yt = require("ytdl-core");
const tokenFile = require ("./token.json")
const forever = require('forever-monitor')
const opusencode = require('opusscript')
const readTest = "G:\\New folder\\Animation\\FBK Bot v2\\FoozBallKing Bot v2.1 (JS)\\helpfbkbot.txt"
const randomcat = require('random-cat')
const ts = new Date()
const http = require("http")
const catdog = require("./catdog.json")
const request = require("request")

/*
	fs.readFile(path, "utf8", function(error, data) {
     if (error) {
       console.error("read error:  " + error.message);
     } else {
       console.log(data);
     }
*/
var errormsg_noperms = [{embed: {
    color: [170, 0, 0],
    title: "Error",
    description: 'You do not have permission!',

    timestamp: new Date(),
    footer: {
      text: "Don't worry, get help from here: https://discord.gg/xgBaPPE"
    }
}
}]
var errormsg_voice = [{embed: {
    color: [170, 0, 0],
    title: "Error",
    description: 'Timed out',

    timestamp: new Date(),
    footer: {
      text: "Don't worry, get help from here: https://discord.gg/xgBaPPE"
    }
}
}]
var errormsg_play = [{embed: {
    color: [170, 0, 0],
    title: "Error",
    description: 'No file found: `C:/Users/ASUS/Downloads/FBK Bot Songs/`',

    timestamp: new Date(),
    footer: {
      text: "Don't worry, get help from here: https://discord.gg/xgBaPPE"
    }
}
}]
var errormsg_argserr = [{embed: {
    color: [170, 0, 0],
    title: "Error",
    description: 'Incorrect arguments!',

    timestamp: new Date(),
    footer: {
      text: "Don't worry, get help from here: https://discord.gg/xgBaPPE"
    }
}
}]

const msg = new Discord.Message();
//https://discord.gg/xgBaPPE

// /\ Do not touch. This is important for the entire bot.
// If you got this code, edit it out as much as you want.

var prefix = "|"
// Change to prefix

var bot_name = "FoozBallKing Bot v2.1"
// Change to bot's name

var build_number = "Build 75"
// Change to your build number

var yt_api_key = "<none>"
// Change to your Google API key

var bot_id = "292053219528671233"
// Change to your bot's Client ID

var version_bot = 'Build 75 (Built in 20/10/2017) (Music)'

// \/ Change this ID to your 18 digit number ID. Use Developer Mode in Discord.
var owner_id = "368700038488129538"
var host_id = '209214117649711113'
var owner_username = "IndoHQ Blu YT?????????#3035"
// Change to your name and 4 digit ID

var owner_id_2 = ['222955939714695168','236251438685093889','315653896645378048','209214117649711113','245369326322843649','237577551436972033']

// Invite link: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=0
// This is the format for an invite link.
// For the FBK Bot updates, join https://discord.gg/8h2fJQG

var token = 'You do not need this anymore.'
// Change to your bot's token

var client_id = '292053219528671233'
// Change to your bot's Client ID (Yes for bot_id too)

var queue = {};


// \/ This will be for commands. Edit them as much as you want.
// To add a command, follow what it says.

bot.on('message', (message) => {
	const args = message.content.split(" ").slice(1);
	if(message.content.startsWith(prefix + 'hero')) {
		const name = args.join(" ");
		if(name == "Ana" || "1" || "Ana Amari") {
			const owhero = require("./owapi/hero/1.json")
			message.channel.send({embed: {
    color: 3447003,
    author: {
      name: message.author.username,
      icon_url: message.author.avatarURL
    },
    title: "Overwatch API - Heroes",
    description: `Full name: ${owhero.real_name}\nDescription: ${owhero.description}\nHealth: ${owhero.health}\nArmour: ${owhero.armour}\nShield: ${owhero.shield}\nBase of Operations: ${owhero.base_of_operations}\nRole(s): ${owhero.role.name}\nSub-role(s): ${owhero.sub_roles.name}\nAbilities: ${owhero.abilities.name}`
  }
});
} else if(name == "Bastion") {
	const owhero = require("./owapi/hero/2.json")
			message.channel.send({embed: {
    color: 3447003,
    author: {
      name: message.author.username,
      icon_url: message.author.avatarURL
    },
    title: "Overwatch API - Heroes",
    description: `Full name: ${owhero.real_name}\nDescription: ${owhero.description}\nHealth: ${owhero.health}\nArmour: ${owhero.armour}\nShield: ${owhero.shield}\nBase of Operations: ${owhero.base_of_operations}\nRole(s): ${owhero.role.name}\nSub-role(s): ${owhero.sub_roles.name}\nAbilities: ${owhero.abilities.name}`
  }
});
} else {
	message.channel.send(`${name} is not an Overwatch hero, or you're using it wrong! The way to use it is ` + '`' + `${prefix}hero <hero_name>` + '`' + `!`)
}
}
	
	
	
})

bot.on('ready', () => {
        bot.user.setStatus('online');
        bot.user.setGame('Type ' + prefix + 'help for help!');
        console.clear
        console.log('--------------------------')
		console.log('FBK Bot OWAPI is now online.')
        console.log('The current prefix is "' + prefix + '".')
        console.log('----------------------------')
        console.log('Make sure to update your bot frequently! Keep backups so you would not have to go through the trouble of having to do it all over again.')
		console.log('To get the latest updates, join https://discord.gg/8h2fJQG')
		console.log('')
		console.log('')
		console.log('Invite link: https://discordapp.com/oauth2/authorize?client_id=' + client_id + '&scope=bot&permissions=0')
		console.log('Owner: ' + owner_username + ' with ID ' + owner_id)
		console.log('Your GAPI token is: ' + yt_api_key)
});

// \/ This will be to log in your bot. Insert the bot token into "BOT_TOKEN"

bot.login(tokenFile.token);