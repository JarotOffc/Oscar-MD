const { default: _makeWaSocket, makeWALegacySocket, downloadContentFromMessage, jidDecode, areJidsSameUser, generateForwardMessageContent, generateWAMessageFromContent, WAMessageStubType, extractMessageContent, prepareWAMessageMedia } = (await import('@whiskeysockets/baileys')).default
let { proto } = (await import('@whiskeysockets/baileys')).default
import { xpRange } from '../lib/levelling.js'
import fs from 'fs';
import util from 'util';
import os from 'os';
import path from 'path';
import { createHash } from 'crypto';
import fetch from 'node-fetch';

import moment from 'moment-timezone';

//━━━━━━━━[ CATEGORY ]━━━━━━━━//
let handler = async (m, { conn, usedPrefix: _p, args, usedPrefix, text, command }) => {
try {
  let tags
    let teks = `${args[0]}`.toLowerCase()
    let arrayMenu = ['main', 'fun', 'islamic', 'info', 'ai', 'jadibot', 'quotes', 'newsletter', 'store', 'downloader', 'nsfw','premium', 'primbon', 'music', 'panel', 'stalk', 'maker', 'game', 'group', 'adminry', 'internet', 'random', 'owner', 'rpg', 'genshin', 'sticker', 'tools', 'anime', 'xp']
    if (!arrayMenu.includes(teks)) teks = '404'
    if (teks == 'stalk') tags = {
        stalk: 'MENU STALKER'
    }
    if (teks == 'downloader') tags = {
        downloader: 'MENU DOWNLOADER'
    }
    if (teks == 'ai') tags = {
        ai: 'MENU AI'
    }
    if (teks == 'genshin') tags = {
        genshin: 'MENU GENSHIN'
    }
    if (teks == 'primbon') tags = {
        primbon: 'MENU PRIMBON'
    }
    if (teks == 'newsletter') tags = {
        newsletter: 'MENU NEWSLETTER'
    }
    if (teks == 'xp') tags = {
        xp: 'MENU REGISTER'
    }
    if (teks == 'panel') tags = {
        panel: 'OSCAR PANEL'
    }
    if (teks == 'main') tags = {
        main: 'MENU MAIN'
    }
    if (teks == 'maker') tags = {
        maker: 'MENU MAKER'
    }
    if (teks == 'premium') tags = {
        premium: 'MENU PREMIUM'
    }
    if (teks == 'game') tags = {
        game: 'MENU GAME'
    }
    if (teks == 'group') tags = {
        group: 'MENU GROUP'
    }
    if (teks == 'adminry') tags = {
        adminry: 'MENU ADMIN'
    }
    if (teks == 'quotes') tags = {
        quotes: 'MENU QUOTES'
    }
    if (teks == 'fun') tags = {
        fun: 'MENU FUN'
    }
    if (teks == 'random') tags = {
        random: 'MENU RANDOM'
    }
    if (teks == 'islamic') tags = {
        islamic: 'MENU ISLAMI'
    }
    if (teks == 'store') tags = {
        store: 'MENU STORE'
    }
    if (teks == 'jadibot') tags = {
        jadibot: 'MENU JADIBOT'
    }
    if (teks == 'nsfw') tags = {
        nsfw: 'MENU NSFW'
    }
    if (teks == 'internet') tags = {
        internet: 'MENU INTERNET'
    }
    if (teks == 'owner') tags = {
        owner: 'MENU OWNER'
    }    
    if (teks == 'info') tags = {
        info: 'MENU INFO'
    }
    if (teks == 'sticker') tags = {
        sticker: 'MENU STICKER'
    }
    if (teks == 'tools') tags = {
        tools: 'MENU TOOLS'
    }
    if (teks == 'anime') tags = {
        anime: 'MENU ANIME'
    }
  
  
  
  //━━━━━━━━[ DEFAULT MENU ]━━━━━━━━//
const defaultMenu = {
  before:``.trimStart(), 
  header: '╔═❖  \`—  %category  —\`  ❖════╗',
  body: '┃➺ %cmd %islimit %isPremium',
  footer: '┃\n╚═════════════════════❖\n', 
  after: 'Made With OSCAR MD',
}


//━━━━━━━━[ DATABASE USER ]━━━━━━━━//
    
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let name = conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let premium = global.db.data.users[m.sender].premium
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let tag = `@${m.sender.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}

//━━━━━━━━[ TIMER ]━━━━━━━━//
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

//━━━━━━━━[ SETTING HELP ]━━━━━━━━//
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })


//━━━━━━━━[ BAGIAN MENU ]━━━━━━━━//
await conn.sendMessage(m.chat, {
        react: {
            text: '🕒',
            key: m.key
        }
    })
let skntex = `Hai ${tag} 

[ 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐬𝐢 𝐁𝐨𝐭 ]

• 𝐍𝐚𝐦𝐚 𝐁𝐨𝐭: *OSCAR MD*
• 𝐖𝐚𝐤𝐭𝐮: *${time}*
• 𝐓𝐚𝐧𝐠𝐠𝐚𝐥: *${week} ${weton}*
• 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐃𝐚𝐭𝐞: *${dateIslamic}*
• 𝐔𝐩𝐭𝐢𝐦𝐞: *${uptime}*
• 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞: *${rtotalreg} dari ${totalreg}*`
if (teks == '404') {
let sections = [{
    title: '⎙ 𝚂𝚎𝚖𝚞𝚊 𝙿𝚎𝚛𝚒𝚗𝚝𝚊𝚑',
    highlight_label: 'Populer Plugins',
    rows: [
        {
   title: '⎙ 𝙼𝚎𝚗𝚞 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚛',
   description: "Displays menu Downloader ( List Menu )",
   id: `${_p + command} downloader`
        },
        {
   title: '⎙ 𝙼𝚎𝚗𝚞 𝙼𝚊𝚒𝚗',
   description: "Displays menu Main ( List Menu )",
   id: `${_p + command} main`
        },
        {
            title: '⎙ 𝙰𝚒 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Ai ( List Menu )",
            id: `${_p + command} ai`
        },
        {
            title: '⎙ 𝚀𝚞𝚘𝚝𝚎𝚜 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Quotes ( List Menu )",
            id: `${_p + command} quotes`
        },
        {
            title: '⎙ 𝙽𝚎𝚠𝚜𝚕𝚎𝚝𝚝𝚎𝚛 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Newsletter ( List Menu )",
            id: `${_p + command} newsletter`
        },
        {
            title: '⎙ 𝚁𝚎𝚐𝚒𝚜𝚝𝚎𝚛 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Register ( List Menu )",
            id: `${_p + command} xp`
        },
        {
            title: '⎙ 𝙶𝚊𝚖𝚎 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Game ( List Menu )",
            id: `${_p + command} game`
        },
        {
            title: '⎙ 𝙵𝚞𝚗 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Fun ( List Menu )",
            id: `${_p + command} fun`
        },
        {
            title: '⎙ 𝚁𝚊𝚗𝚍𝚘𝚖 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Random ( List Menu )",
            id: `${_p + command} random`
        },
        {
            title: '⎙ 𝙸𝚗𝚏𝚘 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Info ( List Menu )",
            id: `${_p + command} info`
        },
        {
            title: '⎙ 𝙸𝚜𝚕𝚊𝚖𝚒𝚌 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Islami ( List Menu )",
            id: `${_p + command} islamic`
        },
        {
            title: '⎙ 𝚂𝚝𝚊𝚕𝚔𝚎𝚛 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Stalker ( List Menu )",
            id: `${_p + command} stalk`
        },
        {
            title: '⎙ 𝙼𝚊𝚔𝚎𝚛 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Maker ( List Menu )",
            id: `${_p + command} maker`
        },
        {
            title: '⎙ 𝙿𝚛𝚎𝚖𝚒𝚞𝚖 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Premium ( List Menu )",
            id: `${_p + command} premium`
        },
        {
            title: '⎙ 𝙰𝚍𝚖𝚒𝚗 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Admin ( List Menu )",
            id: `${_p + command} adminry`
        },
        {
            title: '⎙ 𝙶𝚛𝚘𝚞𝚙 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Group ( List Menu )",
            id: `${_p + command} group`
        },
        {
            title: '⎙ 𝙸𝚗𝚝𝚎𝚛𝚗𝚎𝚝 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Internet ( List Menu )",
            id: `${_p + command} internet`
        },
        {
            title: '⎙ 𝙾𝚠𝚗𝚎𝚛 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Owner ( List Menu )",
            id: `${_p + command} owner`
        },
        {
            title: '⎙ 𝚂𝚝𝚒𝚌𝚔𝚎𝚛 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Sticker ( List Menu )",
            id: `${_p + command} sticker`
        },
        {
            title: '⎙ 𝚃𝚘𝚘𝚕𝚜 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Tools ( List Menu )",
            id: `${_p + command} tools`
        },
        {
            title: '⎙ 𝙹𝚊𝚍𝚒𝚋𝚘𝚝 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Jadibot ( List Menu )",
            id: `${_p + command} jadibot`
        },
        {
            title: '⎙ 𝙰𝚗𝚒𝚖𝚎 𝙵𝚎𝚊𝚝𝚞𝚛𝚎',
            description: "Displays menu Anime ( List Menu )",
            id: `${_p + command} anime`
        },
        {
            title: '⎙ 𝙽𝚜𝚏𝚠',
            description: "Displays menu Nsfw ( List Menu )",
            id: `${_p + command} nsfw`
        }
    ]
},
{
    title: '⎙ 𝚂𝚢𝚜𝚝𝚎𝚖 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗',
    highlight_label: 'Populer Plugins',
    rows: [
        {
            title: '⎙ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 𝙱𝚘𝚝',
            description: "Bot owner info, who created it ( information )",
            id: '.owner'
        },
        {
            title: '⎙ 𝙸𝚗𝚏𝚘 𝚂𝚢𝚜𝚝𝚎𝚖',
            description: "Viewing System Info on Bot ( information )",
            id: '.ping'
        },
        {
            title: '⎙ 𝙼𝚎𝚗𝚞 𝙰𝚕𝚕',
            description: "Viewing menuall on Bot ( information )",
            id: '.allmenu'
        },
        {
            title: '⎙ 𝚂𝚌𝚛𝚒𝚙𝚝 𝙸𝚗𝚏𝚘',
            description: "Source Code Bot WhatsApp Info ( information )",
            id: '.sc'
        },
        {
            title: '⎙ 𝙳𝚘𝚗𝚊𝚝𝚎 𝙸𝚗𝚏𝚘',
            description: "Donate to Support Bot ( information )",
            id: '.donasi'
        }
    ]
}
]
    const fcon = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': `${name}`,}}}
     let media = await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/4gD8z9W3/1000069957.jpg' } }, { upload: conn.waUploadToServer });
    let msg = {
		viewOnceMessage: {
			message: {
				messageContextInfo: {
					deviceListMetadata: {},
					deviceListMetadataVersion: 2,
				},
				interactiveMessage: {
					body: {
						text: skntex,
					},
					footer: {
						text: wm,
					},
					header: proto.Message.InteractiveMessage.Header.create({
          ...media,
          title: "",
          subtitle: "",
          hasMediaAttachment: false
        }),
					nativeFlowMessage: {
						buttons: [
							{
              "name": "single_select",
              "buttonParamsJson":
JSON.stringify({
 "title": "List Menu",
"sections": sections
              })              
            },
            {
              "name": "cta_url",
              "buttonParamsJson": JSON.stringify({
                display_text: "Saluran Update Bot",
                url: 'https://whatsapp.com/channel/0029Vafxmss3wtb42PjN371r',
                merchant_url: 'https://whatsapp.com/channel/0029Vafxmss3wtb42PjN371r'
              })
            },
          ],
					},
					contextInfo: {
						quotedMessage: m.message,
						participant: m.sender,
						...m.key
					}
				},
			},
		},
	};
    return conn.relayMessage(m.chat, msg, m, { });
}
  
  
 
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                  .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = { 
       '%': '%', 
       p: _p, uptime, muptime, 
       me: conn.getName(conn.user.jid), 
       name, date, time, totalreg, 
       readmore: readMore 
     }
    
//━━━━━━━━[ SETTINGS MENU ]━━━━━━━━//
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let vn = './Src/mp3/jancok.mp3'
    let pp = './OscarBot/menu.jpg'
  conn.sendFile(m.chat, pp, 'menu.jpg', text, m, null, rpl)
} catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.register = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

export default handler;

//━━━━━━━━[  JANGAN DI UBAH  ]━━━━━━━━//
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat DiniHari"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time > 10) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
}
