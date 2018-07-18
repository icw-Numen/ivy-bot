# Welcome to ~~demon~~ maid bot Ivy's website!
<img src="https://orig00.deviantart.net/5574/f/2018/195/d/f/maid_ivy_crop_by_icw_numen-dch83gp.png" width="200">

_(This is Ivy. She's happy to see you here today.)_

| [Invite Ivy to your server!](https://discordapp.com/api/oauth2/authorize?client_id=466470213899255818&permissions=8&scope=bot) | [Support/Dev's Discord Server](https://discord.gg/HVh7QcV) |
| :---: | :---: |
| [Wiki and Guides (WIP)](https://github.com/icw-Numen/ivy-bot/wiki) | [Donate!](http://ko-fi.com/rawsaucenumen) |

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prefix(es)](#prefixes)
- [Commands](#commands)
  - [Bot Commands](#bot-commands)
  - [Useful Commands](#useful-commands)
  - [Fun Commands](#fun-commands)
  - [Music Commands](#music-commands)
  - [Moderation Commands](#moderation-commands)
  - [Server Commands](#server-commands)
  - [Level/credits System Commands](#levelcredits-system-commands)
  - [Meme Commands](#meme-commands)
  - [Developer Commands](#developer-commands)
  - [Lewd Commands](#lewd-commands)
- [Adding Ivy to your server](#adding-ivy-to-your-server)
- [Contributors](#contributors)

## Introduction
You know that one **_extra thicc_** maid bot on Discord? No? Well, you're looking at her page right now! :P

Ivy's a totally ordinary maid who has ~~been summoned~~ come to Discord to provide userful services for all.

**This page is essentially a quick reference manual on how to use maid bot Ivy. For more complete, in-depth information, the GitHub repository also has a wiki page [(link here)](https://github.com/icw-Numen/ivy-bot/wiki) where you can find neat things like more step-by-step guides, Ivy's bio, author comments, and author information.**

[(Back to Table of Contents)](#table-of-contents)

## Features

- Online 24/7
- Three prefixes
- A nice personality~
- Special lines/responses for each command
- Music, moderation, and useful commands
- Includes fun and meme commands too
- Can set automatic role for new members
- Can set welcome/goodbye/log channels
- Each command has aliases for convenience
- Points/leveling/credits system
- User data and server settings are stored on a cloud-based database

[(Back to Table of Contents)](#table-of-contents)

## Prefixes
Prefixes are special characters/expressions you type before a command to let Ivy know that you are giving her a command to execute. 
The first two are ```~``` and ```Ivy, ```. The third is a mention.

| Prefix | Example |
| --- | --- |
| ~ | ~help |
| Ivy, | Ivy, help |
| @Ivy | @Ivy help |

[(Back to Table of Contents)](#table-of-contents)

## Commands

Note: Each command has aliases/shortcuts, which are just alternate command names.

#### Bot Commands:
Bot-related commands.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| info | Sends an embed with information about the bot | intro, botinfo, ivyinfo, bot, ivy, about | ```~info``` |
| author | Sends an embed with information about the bot's author | authorinfo, lewdbringer, dev, devinfo, botauthor, botdev | ```~author``` |
| help | Displays all the available commands | h, halp | ```~help```, ```~help bigmoji``` |
| ping | Ping/Pong command. Responds with ping | ms | ```~ping``` |
| goodgirl | Lets you tell Ivy that she's being a good girl | goodbot, goodmaid, goodcow, patpat, pat, pet | ```~goodgirl``` |

[(Back to Table of Contents)](#table-of-contents)

#### Useful Commands:
Handy commands with handy functions.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| avatar | Sends a bigger version of someone's avatar | icon, avy | ```~avatar```, ```~avatar @Ivy```, ```~avatar Ivy``` |
| bigmoji | Sends a bigger version of the given emoji | bigemoji, bmoji, bmj |```~help```, ```~help bigmoji``` |
| nickname | Changes the user's nickname. Ivy has special lines for some names when you change her name | setnick, setnickname, setname, newnick, newname, newnickname | ```~nickname @Ivy cow``` |

[(Back to Table of Contents)](#table-of-contents)

#### Fun Commands:
Fun stuff and games.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| coinflip | Flips a coin | flip | ```~coinflip``` |
| 8ball | The magic 8-ball answers any questions you might have about the future | 8-ball, 8b | ```~8ball Half Life 3 confirmed?``` |
| roll | Rolls one or more dice. You can specify the number of faces too (default's 6) | dice, diceroll | ```~roll```, ```~roll 2```, ```~roll 3 20``` |
| rps | Plays Rock Paper Scissors against the bot | jankenpon | ```~rps rock```, ```~rps Rock``` |
| roulette | Play russian roulette against yourself! You can play with up to 5 bullets (default's 1) and pull the trigger up to 5 times (default's 5). **Losing without safe mode gets you kicked from the server** | russianroulette, playroulette, rlt | ```~roulette```, ```~roulette 1 5```, ```~roulette 1 5 safe``` |

[(Back to Table of Contents)](#table-of-contents)

#### Music Commands:
Commands related to playing music in a voice channel.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| join | Joins the voice channel you are in | joinvc | ```~join``` |
| leave | Leaves the voice channel. Also stops playing music | stop, end | ```~leave``` |
| queue | Shows the first ten entries in the music queue | musiclist, songlist, tracklist, playlist, q | ```~roulette```, ```~roulette 1 5```, ```~roulette 1 5 safe``` |
| enqueue | Adds a Youtube video to the queue. Queue can hold 25 tracks max | addqueue, addsong, addmusic, enqueue, playthis, enq | ```~enqueue```, ```~enqueue <youtube_link_here>```, ```~enqueue ayy lmao macarena``` |
| removetrack | Removes the specified track from the queue | removemusic, removesong | ```~removetrack 12``` |
| play | Starts playing the tracks in the music queue. Unpauses if something was paused before | start | ```~play```, ```~play <youtube_ling_here>```, ```~play ayy lmao macarena``` |
| playing | Shows the current track being played from the music queue | nowplaying, playingnow, cursong, curmusic, curtrack | ```~playing``` |
| pause | Pauses the currently playing music | pausemusic, pausesong, pausetrack | ```~pause``` |
| skip | Skips the current music in the queue | next | ```~skip``` |
| queuepurge | Deletes all entries in the music queue | queueclear, clear, deletequeue, queuedelete | ```~queuepurge``` |

[(Back to Table of Contents)](#table-of-contents)

#### Moderation Commands:
Commands for moderation quality of life improvements.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| ban | Bans the mentioned user. You can pass in a reason for logging purposes | hammer | ```~ban @Ivy```, ```~ban @Ivy bad girl``` |
| kick | Kicks the mentioned user. You can pass in a reason for logging purposes | boot | ```~kick @Ivy```, ```~kick @Ivy bad girl``` |
| warn | Issues a warning to the mentioned user | warning, alert | ```~warn @Ivy```, ```~warn @Ivy bad girl``` |
| mute | Mutes or unmutes a mentioned user | unmute | ```~mute @Ivy```, ```~mute @Ivy bad girl``` |
| lockdown | This will prevent users from sending messages to the channel for the set duration | ld, lock | ```~lockdown 3 hours```, ```~lockdown 1 day``` |
| purge | Purges the specified amount of messages (default's 100) under 14 days old from a given channel | obliterate, delete, deletemsg | ```~purge```, ```~purge 20```, ```~purge 10 bot``` |
| reason | Sets the reason for a mod action in the mod logs (by its case number) if none was given to it before | setreason | ```~setreason 5 bad girl``` |
| unban | Revoke a ban on a user for a given reason based on their user ID (which can be found in the mod action's embed) | unhammer | ```~unban 4133543253252 good girl``` |

[(Back to Table of Contents)](#table-of-contents)

#### Server Commands:
Commands specifically related to the server Ivy's in.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| addrole | Assigns a role to the user | roleadd, setrole, roleset, iam, assign, assignrole | ```~addrole lewd```, ```~iam lewd```, ```Ivy, iam lewd``` |
| autorole | Sets the server's default role for new members. Passing nothing resets it to none | defaultrole | ```~autorole```, ```~autorole lewd``` |
| welcome | Sets the server's default channel for welcoming new members. Passing nothing resets it to none | setwelcome | ```~welcome```, ```~welcome welcome``` |
| goodbye | Sets the server's default channel for sending goodbyes to members who just left the guild. Passing nothing resets it to none | setgoodbye | ```~goodbye```, ```~goodbye goodbye``` |
| listmoji | Sends a list of the server's emojis | listemojis, listmojis, listemoji, emojilist, emojislist, emojis, le, el, emojis | ```~listmoji``` |
| listroles | Sends a list of the server's roles | listrole, rolelist, roleslist, lr, rl, roles | ```~listroles``` |
| removerole | Removes a role from the user | roleremove | ```~removerole lewd``` |
| settings | Shows current server settings set by the bot | serversettings, channelsettings, botsettings | ```~settings``` |
| invite | Sends a temporary server invite | serverinvite, serverlink, invitation, serverinvitation, createinvite | ```~invite``` |
| joindate | Tells when the mentioned member has joined the server | joined | ```~joindate @Ivy```, ```~joindate Ivy ```|

[(Back to Table of Contents)](#table-of-contents)

#### Level/credits System Commands:
Commands related to the level/economy system.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| dailies | Gives you $100. You can claim it again the next day as soon as the date changes | hollahollagetdolla | ```~dailies``` |
| exp | Shows how many experience points you currently have | xp | ```~exp``` |
| level | Shows your current level | lv, lvl | ```~level``` |
| money | Shows how much money you currently have | monies, moolah, moola, credits, wallet, bank, piggybank | ```~money``` |
| mystats | Shows the level, exp, and money you currently have | stats | ```~mystats``` |

[(Back to Table of Contents)](#table-of-contents)

#### Meme Commands:
Self-explanatory. These are all harmless, so just use them freely.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| ayy | lmao | ay, ayyy | ```~ayy``` |
| lenny | Sends a lenny face. Has slight chance to send rare lenny faces too ( ͡° ͜ʖ ͡°) | lennyface | ```~lenny``` |
| owo| OwO what's this? | OwO, 0w0 | ```~owo``` |

[(Back to Table of Contents)](#table-of-contents)

#### Developer Commands:
These can only be used by the one hosting the bot.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| setbotactivity | Changes the bot's activity/"Playing" status to the given input string | bact, setbotstatus | ```~setbotactivity with fire``` |
| setbotavatar | Changes the bot's avatar | bav, setboticon | ```~setbot avatar https://mei.do/cow.jpg``` |
| reload | Reloads the command file, if it's been updated or modified | rld | ```~setbot avatar https://mei.do/cow.jpg``` |

[(Back to Table of Contents)](#table-of-contents)

#### Lewd Commands:
Coming soon!

[(Back to Table of Contents)](#table-of-contents)

## Adding Ivy to your server
Just want to add her to your server ASAP? Simply follow the steps below:

1. [Click this link](https://discordapp.com/api/oauth2/authorize?client_id=466470213899255818&permissions=8&scope=bot) (Make sure you're logged in to Discord first, though)
2. Select the server you want to add her to from the drop-down menu
3. Make sure to give her Administrator permissions
4. Click on "Authorize"
5. You're all set! You should be able to see her on your server now

[(Back to Table of Contents)](#table-of-contents)

## Contributors
- icw-Numen

[(Back to Table of Contents)](#table-of-contents)
