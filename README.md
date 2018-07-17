# Welcome to ~~demon~~ maid bot Ivy's quick reference page!
<img src="https://img00.deviantart.net/4f2d/i/2018/195/3/b/maid_ivy_colored_ps_crop2_by_icw_numen-dch85au.png" width="500">

## Table of Contents
- [Introduction](https://github.com/icw-Numen/ivy-bot/blob/master/README.md#introduction)
- [Features](https://github.com/icw-Numen/ivy-bot#features)
- [Prefix(es)](https://github.com/icw-Numen/ivy-bot/blob/master/README.md#prefixes)
- [Commands](https://github.com/icw-Numen/ivy-bot#commands)
- [Adding Ivy to your server](https://github.com/icw-Numen/ivy-bot/blob/master/README.md#adding-ivy-to-your-server)

## Introduction
You know that one **_extra thicc_** maid bot on Discord? No? Well, you're looking at her page right now! :P

Ivy's a totally ordinary maid who has ~~been summoned~~ come to Discord to provide userful services for all.

**This page is essentially a quick reference manual on how to use maid bot Ivy. For more complete, in-depth information, the GitHub repository also has a wiki page [(link here)](https://github.com/icw-Numen/ivy-bot/wiki) where you can find neat things like more step-by-step guides, Ivy's bio, author comments, and author information.**

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

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

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

## Prefixes
The first two are ```~``` and ```Ivy, ```. The third is pinging her.

| Prefix | Example |
| --- | --- |
| ~ | ~help |
| Ivy, | Ivy, help |
| @Ivy | @Ivy, help |

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

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
| goodgirl | Lets you tell Ivy that she's being a good girl | 'goodbot', 'goodmaid', 'goodcow', 'patpat', 'pat', 'pet' | ```~goodgirl``` |

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Useful Commands:
Handy commands with handy functions.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| avatar | Sends a bigger version of someone's avatar | icon, avy | ```~avatar```, ```~avatar @Ivy```, ```~avatar Ivy``` |
| bigmoji | Sends a bigger version of the given emoji | bigemoji, bmoji, bmj |```~help```, ```~help bigmoji``` |
| nickname | Changes the user's nickname. Ivy has special lines for some names when you change her name | setnick, setnickname, setname, newnick, newname, newnickname | ```~nickname @Ivy cow``` |

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Fun Commands:
Fun stuff and games.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| coinflip | Flips a coin | flip | ```~coinflip``` |
| 8ball | The magic 8-ball answers any questions you might have about the future | 8-ball, 8b | ```~8ball Half Life 3 confirmed?``` |
| roll | Rolls one or more dice. You can specify the number of faces too (default's 6) | dice, diceroll | ```~roll```, ```~roll 2```, ```~roll 3 20``` |
| rps | Plays Rock Paper Scissors against the bot | jankenpon | ```~rps rock```, ```~rps Rock``` |
| roulette | Play russian roulette against yourself! You can play with up to 5 bullets (default's 1) and pull the trigger up to 5 times (default's 5). **Losing without safe mode gets you kicked from the server** | russianroulette, playroulette, rlt | ```~roulette```, ```~roulette 1 5```, ```~roulette 1 5 safe``` |

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Music Commands:
Commands related to playing music in a voice channel.

| Command | Description | Alias(es) | Example |
| --- | --- | --- | --- |
| enqueue | Adds a track to the queue. Queue can hold 25 tracks max | addqueue', 'addsong', 'addmusic', 'enqueue', 'playthis', 'enq | ```~enqueue <youtube link here>``` |
| join | Joins the voice channel you are in | joinvc | ```~join``` |
| leave | Leaves the voice channel. Also stops playing music | stop, end | ```~leave``` |
| play | Starts playing the tracks in the music queue | start | ```~play``` |
| playing | Shows the current track being played from the music queue | nowplaying, playingnow, cursong, curmusic, curtrack | ```~playing``` |
| pause | Pauses the currently playing music | pausemusic, pausesong, pausetrack | ```~pause``` |
| skip | Skips the current music in the queue | next | ```~skip``` |
| queue | Shows the music queue | musiclist, songlist, tracklist, playlist, q | ```~roulette```, ```~roulette 1 5```, ```~roulette 1 5 safe``` |
| queuepurge | Deletes all entries in the music queue | queueclear, clear, deletequeue, queuedelete | ```~queuepurge``` |
| removetrack | Removes the specified track from the queue | removemusic, removesong | ```~removetrack 12``` |

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

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

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Server Commands:
Commands related to server settings and operations.

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

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Level/credits System Commands:
Commands related to the level/economy system.

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Meme Commands:
Self-explanatory.

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Developer Commands:
These can only be used by the one hosting the bot.

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

#### Lewd Commands:
Coming soon!

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

## Adding Ivy to your server
Just want to add her to your server ASAP? Simply follow the steps below:

1. Go to her Discord bot page (coming soon), then click on "invite" (make sure you're logged in to Discord)
2. Select the server you want to add her to
3. Make sure to give her permissions to manage roles, channels, along with moderation permissions (kick, ban)
4. Click on "Authorize"
5. You're all set! You should be able to see her on your server now

[(Back to Table of Contents)](https://github.com/icw-Numen/ivy-bot#table-of-contents)

