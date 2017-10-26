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
var owner_username = "IndoHQ Blu YT✓ᵛᵉʳᶦᶠᶦᵉᵈ#3035"
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

    if(message.content.startsWith(prefix + 'botinfox')) {
        message.channel.send('Hey there! I am `FoozBallKing Bot v2.1`! I was coded by @IndoHQ Blu YT✓ᵛᵉʳᶦᶠᶦᵉᵈ and coded using `Discord.js` and `Visual Studio Code`! I\'m currently being run by Dragons99990. Thanks to Adam Gaskins Discord Bot tutorial, I would not have been made!');
        console.log(message.author + ' has typed "|botinfox"!')
    
    }

    if(message.content.startsWith(prefix + 'help')) {
		fs.readFile(".\\helpfbkbot.txt", "utf8", function(error, data) {
     if (error) {
       console.error("Read error:  " + error.message);
     } else {
       message.author.send(data);
     }
		console.log(message.author + ' has typed "|help"!')
		
    })
	}

	// START MUSIC
	
    if(message.content.startsWith(prefix + 'play')) {
		if (queue[message.guild.id] === undefined) return message.channel.send(`Add some songs to the queue first with ${prefix}add`);
		if (!message.guild.voiceConnection) {
			message.channel.send(`**ERROR!** Not in voice channel!\nTo join VC, type "${prefix}join"!`)
		}
		if (queue[message.guild.id].playing) return message.channel.send(':x: Already playing a song!');
		let dispatcher;
		queue[message.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return message.channel.send('The queue is finished. The player has been stopped.').then(() => {
				queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
			});
			message.channel.send(`Playing: **${song.title}** as requested by: "${song.requester}"`);
			dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : tokens.passes });
			let collector = message.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(prefix + 'pause')) {
					message.channel.send(':pause_button: The player has been paused.').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(prefix + 'resume')){
					message.channel.send(':thumbsup: The player has resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(prefix + 'skip')){
					message.channel.send(':track_next: Skipped song.').then(() => {dispatcher.end();});
				} else if (m.content.startsWith(prefix + 'volume+')){
					if (Math.round(dispatcher.volume*50) >= 100) return message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (5*(m.content.split('+').length-1)))/50,2));
					message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
				} else if (m.content.startsWith(prefix + 'volume-')){
					if (Math.round(dispatcher.volume*50) <= 0) return message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (5*(m.content.split('-').length-1)))/50,0));
					message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
				} else if (m.content.startsWith(prefix + 'time')){
					message.channel.send(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
			});
			dispatcher.on('error', (err) => {
				return message.channel.send('Error: ' + err).then(() => {
					collector.stop();
				});
			});
		})
	}
	
	if(message.content.startsWith(prefix + 'queue')) {
		if (queue[message.guild.id] === undefined) return message.channel.send(`Add some songs to the queue first with ${tokens.prefix}add`);
		let tosend = [];
		queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
		message.channel.send('```\n' + `${message.guild.name}'s Music Queue:**\n Currently "${tosend.length}" songs queued\n ${(tosend.length > 15 ? '[Only next 15 shown]' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	}
	
	if(message.content.startsWith(prefix + 'join')) {
		return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.channel.send(errormsg_voice);
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	}
	
	if(message.content.startsWith(prefix + 'add')) {
		let url = message.content.split(' ')[1];
		if (url == '' || url === undefined) return message.channel.send(`:x: You must add a YouTube video url, or id after ${prefix}play`);
		yt.getInfo(url, (err, info) => {
			if(err) return message.channel.send('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
			queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
			message.channel.send(`Added **${info.title}** requested by "${message.author.username}" to the queue`);
			message.channel.send('Type `|play` to start the player.')
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} added to queue with link ${url}`)
		});
	}

	// END MUSIC
    
    if(message.content.startsWith(prefix + 'youtube')) {
        message.channel.send('Here you go! Links: https://www.youtube.com/channel/UCfMwlVqas3DZIml24FXY7rw https://www.youtube.com/user/dragons99990 https://www.youtube.com/channel/UCArKd8rTTWvdK7gA7E3TfVw https://www.youtube.com/channel/UCRFcXEpywYabEVvoKLGdJBw')
        console.log(message.author + ' has typed "|youtube"!')
    }

    if(message.content.startsWith(prefix + 'shutdown')) {
        if (owner_id == String(message.author.id)) {
            // Shutdown here...
            message.channel.send(':wave: Shutting down... (Code help by Der, the developer of NanoBot)')
            console.log(message.author + ' is now shutting down the bot!')
            bot.user.setGame('Shutting down...')
            bot.user.setStatus('invisible')
            bot.destroy()
            console.log('The bot is now shut down.')
            console.clear
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} shut down the bot`)
        } else {
            // No perms
            message.channel.send(errormsg_noperms)
            console.log(message.author + ' tried shutting down the bot, but has no permission!')
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} tried shutting down bot.`)
    }
}
    
	if(message.content.startsWith(prefix + 'restart')) {
        if (owner_id == String(message.author.id)) {
            // Restart here...
            message.channel.send(':wave: Restarting...')
            console.log(message.author + ' is now restarting the bot!')
            bot.user.setGame('Restarting...')
            bot.user.setStatus('invisible')
            bot.destroy()
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} restarted bot.`)
        } else {
            // No perms
            message.channel.send(errormsg_noperms)
            console.log(message.author + ' tried restarting the bot, but has no permission!')
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} attempted to restart bot.`)
    }
}

// TODO: Add Restart command

    if(message.content.startsWith(prefix + 'status1')) {
        if(owner_id == String(message.author.id)) {
            bot.user.setGame('Type ' + prefix + 'help for help!')
            message.channel.send('Set!')
            console.log(message.author + ' has set the status for ' + bot_name + ' to Status 1!')
        } else {
            message.channel.send(errormsg_noperms)
            console.log(message.author + ' tried setting the bot status, but has no permission!')
        }
    }

    if(message.content.startsWith(prefix + 'status2')) {
		if(owner_id == String(message.author.id)) {
			bot.user.setGame('Dragons is bot sitting me... And I mean sitting on me... Ow...')
			message.channel.send('**Ow...** Set....')
			console.log(message.author + ' has set the status for ' + bot_name + ' to Status 2!')
		} else {
			message.channel.send(errormsg_noperms)
			console.log(message.author + ' tried to set the bot status, but has no permission!')
		}
	}

    if(message.content.startsWith(prefix + 'mtcmode')) {
		if(owner_id == String(message.author.id)) {
			bot.user.setGame('Maintenance')
			bot.user.setStatus('dnd')
			message.channel.send('Set to Maintenance Mode!')
			console.log(message.author + ' has changed ' + bot_name + ' to Maintenance Mode!')
		} else {
			message.channel.send(errormsg_noperms)
			console.log(message.author + ' has tried changing the bot to Maintenance Mode, but has no permission!')
		}
	}

    if(message.content.startsWith(prefix + 'normalmode')) {
		if(owner_id == String(message.author.id)) {
			bot.user.setGame('Type |help for help!')
			bot.user.setStatus('online')
			message.channel.send('Set to Normal Mode!')
			console.log(message.author + ' has changed FBK Bot to Normal Mode!')
		} else {
			message.channel.send(errormsg_noperms)
			console.log(message.author + ' has attempted to change FBK Bot to Normal Mode, but has no permission!')
		}
	}
    // TODO: Add a set game command

    if(message.content.startsWith(prefix + 'setonline')) {
		if(owner_id == String(message.author.id)) {
			bot.user.setStatus('online')
			message.channel.send('Status set to Online!')
			console.log(message.author + ' has set the bot to Online!')
		} else {
			message.channel.send(errormsg_noperms)
			console.log(message.author + ' tried to change the bot status, but has no permission!')
		}
	}

    if(message.content.startsWith(prefix + 'setidle')) {
        if(owner_id == String(message.author.id)) {
			bot.user.setStatus('idle')
			message.channel.send('Status set to Idle!')
			console.log(message.author + ' has set the bot to idle!')
		} else {
			message.channel.send(errormsg_noperms)
			console.log(message.author + ' tried to change the bot status, but has no permission!')
		}
	}
	
	if(message.content.startsWith(prefix + 'setdnd')) {
        if(owner_id == String(message.author.id)) {
			bot.user.setStatus('dnd')
			message.channel.send('Status set to DND!')
			console.log(message.author + ' has set the bot to DND!')
		} else {
			message.channel.send(errormsg_noperms)
			console.log(message.author + ' tried to change the bot status, but has no permission!')
		}
	}

    if(message.content.startsWith(prefix + 'setinvis')) {
        if(owner_id == String(message.author.id)) {
			bot.user.setStatus('invisible')
			message.channel.send('Status set to Invisible!')
			console.log(message.author + ' has set the bot to Invisible!')
		} else {
			message.channel.send(errormsg_noperms)
			console.log(message.author + ' tried to change the bot status, but has no permission!')
		}
	}


    // \/ This is to show what is being used. Edit them to what your specs are. Do not touch the library or the coded with thing. Don't touch the errors and uptime thing either.

    if(message.content.startsWith(prefix + 'botspecs')) {
		var days = Math.floor(bot.uptime / 86400000000000)
		var hours = Math.floor(bot.uptime / 3600000)
		var minutes = Math.floor((bot.uptime % 3600000) / 60000)
		var seconds = Math.floor(((bot.uptime % 360000) % 60000) / 1000)
        message.channel.send('```Markdown\n< FoozBallKing Bot v2.1 ' + build_number + ' >\n[Library]: Discord.JS\n[Coded with]: Node.JS and Visual Studio Code, Notepad++\n[Coded by]: IndoHQ Blu YT✓ᵛᵉʳᶦᶠᶦᵉᵈ\n[Help by]: Der✓ (Developer of NanoBot)\n[Laptop]: ASUS A55VD\n[Core]: Intel i3-3120M (Quad Core)\n[OS]: Windows 10 Home\n[RAM usage]: unknown MB / 8196 MB\n[Total RAM]: 8 GB\n[Internet]: null\n[Internet Utilization]: unknown\n[Errors]: unknown\n[Uptime]: ' + days + ' days : ' + hours + ' hours : ' + minutes + ' minutes : ' + seconds + ' seconds\n```')
        console.log(message.author.username + ' has typed "|botspecs"!')
    }

    if(message.content.startsWith(prefix + 'uptime')) {
        message.channel.send('Sending uptime information in Console and chat!')
        console.log(message.author.username + ' has requested for Uptime stats! Sending...')
        // CONVERT MILLISECONDS TO DIGITAL CLOCK FORMAT
		var days = Math.floor(bot.uptime / 86400000000000)
		var hours = Math.floor(bot.uptime / 3600000)
		var minutes = Math.floor((bot.uptime % 3600000) / 60000)
		var seconds = Math.floor(((bot.uptime % 360000) % 60000) / 1000)
		message.channel.send('Uptime: `' + days + ' days : ' + hours + ' hours : ' + minutes + ' minutes : ' + seconds + ' seconds`')
		console.log('Uptime: ' + days + ' days : ' + hours + ' hours : ' + minutes + ' minutes : ' + seconds + ' seconds')
        console.log('Uptime information sent!')
    }
	
	if(message.content.startsWith(prefix + 'sparta')) {
		message.channel.send('THIS!\n**IS!**\n***SPARTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!***\nXD')
		console.log(message.author + ' has called for SPARTAAAAAAAAA!!!')
	}
	
	const args = message.content.split(" ").slice(1);

	if (message.content.startsWith(prefix + "eval")) {
		if(message.author.id !== owner_id) {
			message.channel.send(errormsg_noperms)
		} else {
		try {
			const code = args.join(" ")
			let evaled = eval(code);
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} used evaluation with evaluation: " ${code}`)
			if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);

			message.channel.send(clean(evaled), {code:"xl"});
		} catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
	
	}
	}

    if(message.content.startsWith(prefix + 'embed')) {
		message.delete()
        var descembed = args.join(" ");
        message.channel.send({embed: {
    color: 3447003,
    author: {
      name: message.author.username,
      icon_url: message.author.avatarURL
    },
    title: "Info",
    description: descembed,

    timestamp: new Date(),
    footer: {
      icon_url: message.author.avatarURL,
      text: "© TheFoozBallTable"
    }
  }
});
fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} used embed with embed: " ${descembed} "`)
    }

    

    if(message.content.startsWith(prefix + 'say')) {
        message.delete()
        var saytext = args.join(" ");
        message.channel.send(saytext)
		fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} used say with text " ${saytext} "`)
    }

    if(message.content.startsWith(prefix + 'guilds')) {
        message.channel.send(`I'm in \`${bot.guilds.size} guilds\`!`)
    }
	
	
	if (message.content.startsWith(prefix + "kick1")) {
    let modRole = message.guild.roles.find("name", "FMod");
    if(message.member.roles.has(modRole.id)) { 
      let kickMember = message.guild.member(message.mentions.users.first());
      message.guild.member(kickMember).kick(args.join(" "));
      message.channel.send(`Successfully kicked ${kickMember} with reason ${args.join}`);
	  fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} kicked user ${kickMember.username} with reason: " ${args.join(" ")} "`)
    } else {
      return message.channel.send("**ERROR!** You do not have permission!");
    }
	
  }
  
	// ShadowLegion Server reserved
	
	const helper = bot.guilds.get("355411227045920769").roles.find('name', "[Helper]")
	const mod = bot.guilds.get("355411227045920769").roles.find('name', "[Mod]")
	const jrmod = bot.guilds.get("355411227045920769").roles.find('name', "[Jr.Mod]")
	const admin = bot.guilds.get("355411227045920769").roles.find('name', "[Admin]")
	const hadmin = bot.guilds.get("355411227045920769").roles.find('name', "[Head Admin]")
	const owner = bot.guilds.get("355411227045920769").roles.find('name', "[Owner]")
	
	if(message.content.startsWith(prefix + "kick2")) {
		if(message.member.roles.has(jrmod.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
			message.guild.member(kickMember).kick(args.join(" "));
			message.channel.send(`Successfully kicked ${kickMember} with reason ${args.join}`);
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} kicked user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else if(message.member.roles.has(admin.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
			message.guild.member(kickMember).kick(args.join(" "));
			message.channel.send(`Successfully kicked ${kickMember} with reason ${args.join}`);
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} kicked user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else if(message.member.roles.has(hadmin.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
      message.guild.member(kickMember).kick(args.join(" "));
      message.channel.send(`Successfully kicked ${kickMember} with reason ${args.join}`);
	  fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} kicked user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else if(message.member.roles.has(owner.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
      message.guild.member(kickMember).kick(args.join(" "));
      message.channel.send(`Successfully kicked ${kickMember} with reason ${args.join}`);
	  fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} kicked user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else {
			message.channel.send('**ERROR!** You have no permission! You must be Jr. Mod or higher in server `ShadowLegion Community`.')
		}
	}
	
	if(message.content.startsWith(prefix + "ban2")) {
		if(message.member.roles.has(jrmod.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
			message.guild.member(kickMember).ban(args.join(" "));
			message.channel.send(`Successfully banned ${kickMember} with reason ${args.join}`);
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} banned user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else if(message.member.roles.has(admin.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
			message.guild.member(kickMember).ban(args.join(" "));
			message.channel.send(`Successfully banned ${kickMember} with reason ${args.join}`);
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} banned user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else if(message.member.roles.has(hadmin.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
      message.guild.member(kickMember).ban(args.join(" "));
      message.channel.send(`Successfully banned ${kickMember} with reason ${args.join}`);
	  fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} banned user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else if(message.member.roles.has(owner.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
      message.guild.member(kickMember).ban(args.join(" "));
      message.channel.send(`Successfully banned ${kickMember} with reason ${args.join}`);
	  fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} banned user ${kickMember.username} with reason: " ${args.join(" ")} "`)
	  } else if(message.member.roles.has(mod.id)) {
			let kickMember = message.guild.member(message.mentions.users.first());
			message.guild.member(kickMember).ban(args.join(" "));
			message.channel.send(`Successfully banned ${kickMember} with reason ${args.join}`);
			fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} banned user ${kickMember.username} with reason: " ${args.join(" ")} "`)
		} else {
			message.channel.send('**ERROR!** You have no permission! You must be Mod or higher in server `ShadowLegion Community`.')
		}
	}
	
	
	// Reservation end
  
  if(message.content.startsWith(prefix + 'msg')) {
	  message.author.send('WHY DA FLIP DID YOU DO THAT!??!?!?!?!??!?!?')
	  message.author.send(':middle_finger:')
  }
  
  if(message.content.startsWith(prefix + 'cat')) {
	  const catfile = require("./catdog.json")
	  request('http://random.cat/meow').pipe(fs.createWriteStream('./catdog.json'))
  message.channel.send(`Here's your random cat! ${catfile.file}`)
  }
  
  if(message.content.startsWith(prefix + 'animals')) {
	  var url = randomcat.get({
  category: 'animals'
});
	message.channel.send(url + '\nHere\'s your random... animal?')
  }
  
  if(message.content.startsWith(prefix + 'dog')) {
	  const dogfile = require("./woof.json")
	  request('https://random.dog/woof.json').pipe(fs.createWriteStream('./woof.json'))
  message.channel.send(`Here's your random dog! ${dogfile.url}`)
  }
  
  if (message.content.startsWith(prefix + "kick3")) {
    if(message.author.id == "368700038488129538") { 
      let kickMember = message.guild.member(message.mentions.users.first());
      message.guild.member(kickMember).kick(args.join(" "));
      message.channel.send(`Successfully kicked ${kickMember} with reason ${args.join}`);
	  fs.appendFile("fbkbotlog.txt", `\n${ts} ${message.author.username} in ${message.guild.id} or ${message.guild.name} kicked user ${kickMember.username} with reason: " ${args.join(" ")} "`)
    } else {
      return message.channel.send("**ERROR!** You do not have permission!");
    }
  }
	
    } )

bot.on('ready', () => {
        bot.user.setStatus('online');
        bot.user.setGame('Type ' + prefix + 'help for help!');
        console.clear
        console.log('--------------------------')
		console.log('FBK Bot version 2.1 is now online.')
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

// \/ This is unused. Don't ask why.

    function output(error, token) {
        if (error) {
                console.log(`There was an error logging in: ${error}`);
                return;
        } else {
                console.log(`Logged in. Token: ${token}`);
        }
    }   

// TODO LIST
// Add |eval (Owner only)
// Add |errors (Owner only)
// Update Owner commands (Halfway)
// Add music

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}



/*
	Random cat/dog setup
	
	function cat {

var options = {
    host: 'random.cat',
    path: '/meow'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
		return data;
    });
});
request.on('error', function (e) {
    throw err;
});
request.end();
	}
	
	function dog {
		var options = {
    host: 'random.dog',
    path: '/woof'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
		return data;
    });
});
request.on('error', function (e) {
    throw err;
});
request.end();
	}
*/