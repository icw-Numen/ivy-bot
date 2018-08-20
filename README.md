# Welcome to ~~demon~~ maid bot Ivy's website!
<img src="https://orig00.deviantart.net/5574/f/2018/195/d/f/maid_ivy_crop_by_icw_numen-dch83gp.png" width="200">

_(This is Ivy. She's glad you're here today.)_

- [Invite Ivy to your server!](https://discordapp.com/api/oauth2/authorize?client_id=466470213899255818&permissions=1073081591&scope=bot) 
- [Dev's Discord Server](https://discord.gg/HVh7QcV)
- [Wiki and Guides (WIP)](https://github.com/icw-Numen/ivy-bot/wiki) 
- [Donate! ~~I'm poor pls~~](http://ko-fi.com/rawsaucenumen)

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
  - [Level/Credits System Commands](#levelcredits-system-commands)
  - [Meme Commands](#meme-commands)
  - [Developer Commands](#developer-commands)
  - [Lewd Commands](#lewd-commands)
- [Adding Ivy to your server](#adding-ivy-to-your-server)
- [Assets](#assets)
- [Contributors](#contributors)
- [If you have any questions/problems](#if-you-have-any-questionsfeedback)

## Introduction
You know that one **_extra thicc_** maid bot on Discord? No? Well, you're looking at her page right now! :P

Ivy's a totally ordinary maid who has ~~been summoned~~ come to Discord to provide userful services for all.

**This page is essentially a quick reference manual on how to use maid bot Ivy. For more complete, in-depth information, the GitHub repository also has a wiki page (work in progress) [(link here)](https://github.com/icw-Numen/ivy-bot/wiki) where you can find neat things like more step-by-step guides, Ivy's bio, author comments, and author information.**

As of now, the page might not look like the prettiest thing in the world, but I'll update this soon.

[(Back to Table of Contents)](#table-of-contents)

## Features

- Online 24/7
- Three prefixes
- A lovely personality~
- Points/leveling/credits system
- Special lines/responses for each command
- Music, moderation, and useful commands
- Includes fun and meme commands too
- Each command has aliases for convenience
- Can set automatic role for new members
- Can set welcome/goodbye/log channels
- Can make custom cards/lists to help you keep track of stuff
- Cloud-based database

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
| info | Sends an embed with information about the bot | intro, botinfo, ivyinfo, bot, ivy, about, features | ```~info``` |
| author | Sends an embed with information about the bot's author | authorinfo, lewdbringer, dev, devinfo, botauthor, botdev | ```~author``` |
| help | Displays all the available commands | h, halp | ```~help```, ```~help bigmoji``` |
| ping | Ping/Pong command. Responds with ping | ms | ```~ping``` |
| whoareyou | Sends an embed with information about the Ivy as a character | lore, characterinfo, bio, characterprofile, aboutivy | ```~whoareyou``` |
| goodgirl | Lets you tell Ivy that she's being a good girl | goodbot, goodmaid, goodcow, patpat, pat, pet | ```~goodgirl``` |

[(Back to Table of Contents)](#table-of-contents)

#### Useful Commands:
Handy commands with handy functions.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| avatar | Sends someone's avatar at its original resolution | icon, avy | ```~avatar```, ```~avatar @Ivy```, ```~avatar Ivy``` |
| bigmoji | Sends the given custom emoji at its original resolution | bigemoji, bmoji, bmj |```~bigmoji :PogChamp:``` |
| nickname | Changes the user's nickname. Ivy has special lines for some names when you change her name | setnick, setnickname, setname, newnick, newname, newnickname | ```~nickname @Ivy cow``` |

[(Back to Table of Contents)](#table-of-contents)

#### Fun Commands:
Fun stuff and games.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| coinflip | Flips a coin | flip | ```~coinflip``` |
| 8ball | The magic 8-ball answers any questions you might have about the future | 8-ball, 8b | ```~8ball Half Life 3 confirmed?``` |
| choose | Chooses one out of two or more choices (up to n choices) | erabe | ```~choose thick | thin```, ```~choose thick | thin | none``` |
| rps | Plays Rock 
| roll | Rolls one or more dice. You can specify the number of faces too (default's 6) | dice, diceroll | ```~roll```, ```~roll 2```, ```~roll 3 20``` |
| rps | Plays Rock Paper Scissors against the bot | jankenpon | ```~rps rock```, ```~rps Rock``` |
| roulette | Play russian roulette against yourself! You can play with up to 5 bullets (default's 1) and pull the trigger up to 5 times (default's 1). Safe mode's on by default. **Losing without safe mode gets you kicked from the server and causes you to lose points/credits** | russianroulette, playroulette, rlt | ```~roulette```, ```~roulette 1 5```, ```~roulette 1 5 off``` |

[(Back to Table of Contents)](#table-of-contents)

#### Music Commands:
Commands related to playing music in a voice channel.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| join | Joins the voice channel you are in | joinvc | ```~join``` |
| leave | Leaves the voice channel. Also stops playing music | stop, end | ```~leave``` |
| queue | Shows the first ten entries in the music queue. Typing "full" after the command gives the whole queue instead | musiclist, songlist, tracklist, playlist, q, showqueue | ```~queue```, ```~queue full``` |
| enqueue | Adds a Youtube video to the queue. Queue can hold 25 tracks max | addqueue, addsong, addmusic, enqueue, playthis, enq | ```~enqueue```, ```~enqueue <youtube_link_here>```, ```~enqueue purupuru pururin 4k``` |
| removetrack | Removes the specified track from the queue | removemusic, removesong | ```~removetrack 12``` |
| play | Starts playing the tracks in the music queue. Unpauses if something was paused before | start | ```~play``` |
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
| purge | Purges the specified amount of messages (default's 100) under 14 days old from a given channel | obliterate, delete, deletemsg, killwithfire, killitwithfire, burn | ```~purge```, ```~purge 20```, ```~purge 10 bot``` |
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
| modlog | Sets the server's default channel for storing mod logs. Making the mod log channel visible to mods/admins only is recommended | setlogs, setmodlog, botlog, defaultmodlog, defaultbotlog, defaultlogs, setlog | ```~modlog mod-logs``` |
| lvupmessages | Toggles level up messages from Ivy on/off. Default: Off | levelupmsgs, lvnotifs, togglelvupmsgs | ```~lvupmessages``` |
| listmoji | Sends a list of the server's emojis | listemojis, listmojis, listemoji, emojilist, emojislist, emojis, le, el, emojis | ```~listmoji``` |
| listroles | Sends a list of the server's roles | listrole, rolelist, roleslist, lr, rl, roles | ```~listroles``` |
| removerole | Removes a role from the user | roleremove | ```~removerole lewd``` |
| settings | Shows current server settings set by the bot | serversettings, channelsettings, botsettings | ```~settings``` |
| invite | Sends a temporary server invite | serverinvite, serverlink, invitation, serverinvitation, createinvite | ```~invite``` |
| joindate | Tells when the mentioned member has joined the server | joined | ```~joindate @Ivy```, ```~joindate Ivy ```|

[(Back to Table of Contents)](#table-of-contents)

#### Custom Card Commands:
Commands related to custom cards/lists. These are features to help you keep track of things. You can store any form of text/links, so feel free to experiment. Note that you cannot put spaces in titles (other characters are ok, though).

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| createcard | Allows you to create a custom card. Each entry in the card has a tile and a description. A card can hold 15 entries total. You can unlock more card slots with 600 credits each (3 max. First one's free) | makecard | ```~createcard Game-IDs``` |
| showcard | Shows a custom card you've created. Passing nothing shows your first card. Passing an entry/field title after the card name will show a card with just that entry | card, list, showlist, customcard | ```~showcard```, ```~showcard Game-IDs```, ```~showcard Game-IDs GBF-ID``` |
| editbody | Edits the contents of the specified card. If the entry/field does not exist, a new one will be created | addfield, editfield, editentry, editlist, cardbody | ```~editbody Game-IDs description My game IDs```,  ```~editbody Game-IDs GBF-ID 1234567``` |
| edittitle | Edits the title of an entry/field of the specified card. If the entry/field title does not exist, a new entry/field will be created | addtitle | ```~edittitle Game-IDs title Game-ID```,  ```~edittitle Game-IDs GBF-ID 7654321``` |
| removebody | Deletes an entry/field of the specified card. Typing just the card title deletes the card, and typing "purge" deletes all entries in the card | deletecard, deleteentry, removecard, removeentry | ```~removebody Game-IDs```, ```~removebody Game-IDs purge```, ```~removebody Game-IDs GBF-ID``` |

[(Back to Table of Contents)](#table-of-contents)

#### Level/Credits System Commands:
Commands related to the level/economy system.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| dailies | Gives you $100. You can claim it again the next day as soon as the date changes | hollahollagetdolla, getdaily, daily | ```~dailies``` |
| exp | Shows how many experience points you currently have | xp | ```~exp``` |
| level | Shows your current level | lv, lvl | ```~level``` |
| money | Shows how much money you currently have | monies, moolah, moola, credits, wallet, bank, piggybank | ```~money``` |
| mystats | Shows the level, exp, money, and custom cards you currently have | stats | ```~mystats``` |

[(Back to Table of Contents)](#table-of-contents)

#### Meme Commands:
Self-explanatory. These are all harmless, so just use them freely.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| ayy | lmao | ay, ayyy | ```~ayy``` |
| lenny | Sends a lenny face. Has slight chance of sending rare lenny faces too ( ͡° ͜ʖ ͡°) | lennyface | ```~lenny``` |
| owo | OwO what's this? | OwO, 0w0 | ```~owo``` |

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
Of course, every bot needs at least one of these. ( ͡° ͜ʖ ͡°) 
Ivy won't allow you to use lewd commands on non-nsfw channels by the way.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| danbooru | Searches a random, totally not lewd image on Danbooru. ( ͡° ͜ʖ ͡°) You can search up to two tags at once (in the same way you would on Danbooru) | luds, l00ds, lewds, postlewds, nsfw, nudes | ```~danbooru maid demon_girl``` |

[(Back to Table of Contents)](#table-of-contents)

## Adding Ivy to your server
Just want to add her to your server ASAP? Simply follow the steps below:

1. [Click this link](https://discordapp.com/api/oauth2/authorize?client_id=466470213899255818&permissions=1073081591&scope=bot) (Make sure you're logged in to Discord first, though)
2. Select the server you want to add her to from the drop-down menu
3. Make sure to give her Administrator permissions
4. Click on "Authorize"
5. You're all set! You should be able to see her on your server now

[(Back to Table of Contents)](#table-of-contents)

## Assets
You can find all the icons/art used by Ivy [in this link](https://sta.sh/21qy8xqbpkxm). Unused stuff included. 
And yes, I made all of that myself.

[(Back to Table of Contents)](#table-of-contents)

## Contributors
- icw-Numen (Numen#3815 on Discord)

[(Back to Table of Contents)](#table-of-contents)

## If you have any questions/feedback
Got any questions? Bugs? Issues? Feedback? No problem! 

You can either join my [development Discord server](https://discord.gg/HVh7QcV) and ask away, or send a PM to me if it's something simple.

Again, [Ivy's wiki](https://github.com/icw-Numen/ivy-bot/wiki) is still WIP, but eventually it'll have more in-depth information about Ivy, including usage guides, which should help answering questions in the long run.

[(Back to Table of Contents)](#table-of-contents)
