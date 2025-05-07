const {
    default: _makeWaSocket,
    makeWALegacySocket,
    proto,
    downloadContentFromMessage,
    jidDecode,
    areJidsSameUser,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    WAMessageStubType,
    extractMessageContent, 
    prepareWAMessageMedia 
} = (await import('@whiskeysockets/baileys')).default
//import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
//import { plugins } from '../lib/plugins.js'
let tags = {}
     
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, diamond, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
     let sections = [{
                        title: 'List menu',
                        highlight_label: 'Populer Plugins',
                        rows: [{
                                title: 'Download Feature',
                                description: `Displays menu Download ( List Menu )`,
                                id: '.menu downloader'
                            },
                            {
                                title: 'Main Feature',
                                description: "Displays menu Main ( List Menu )",
                                id: '.menu main'
                            },
                            {
                                title: 'Ai Feature',
                                description: "Displays menu Ai ( List Menu )",
                                id: '.menu ai'
                            },
                            {
                                title: 'Game Feature',
                                description: "Displays menu Game ( List Menu )",
                                id: '.menu game'
                            },
                            {
                                title: 'Rpg Feature',
                                description: "Displays menu Rpg ( List Menu )",
                                id: '.menu rpg'
                            },
                            {
                                title: 'Info Feature',
                                description: "Displays menu Info ( List Menu )",
                                id: '.menu info'
                            },
                            {
                                title: 'Premium Feature',
                                description: "Displays menu Premium ( List Menu )",
                                id: '.menu premium'
                            },
                            {
                                title: 'Group Feature',
                                description: "Displays menu Group ( List Menu )",
                                id: '.menu group'
                            },
                            {
                                title: 'Internet Feature',
                                description: "Displays menu Internet ( List Menu )",
                                id: '.menu internet'
                            },
                            {
                                title: 'Fun Feature',
                                description: "Displays menu Fun ( List Menu )",
                                id: '.menu fun'
                            },
                            {
                                title: 'Owner Feature',
                                description: "Displays menu Owner ( List Menu )",
                                id: '.menu owner'
                            },
                            {
                                title: 'Maker Feature',
                                description: "Displays menu Maker ( List Menu )",
                                id: '.menu maker'
                            },
                            {
                                title: 'Sticker Feature',
                                description: "Displays menu Sticker ( List Menu )",
                                id: '.menu sticker'
                            },
                            {
                                title: 'Tools Feature',
                                description: "Displays menu Tools ( List Menu )",
                                id: '.menu tools'
                            },
                            {
                                title: 'Anime Feature',
                                description: "Displays menu Anime ( List Menu )",
                                id: '.menu anime'
                            },
                            {
                                title: 'Quotes Feature',
                                description: "Displays menu Quotes ( List Menu )",
                                id: '.menu quotes'
                            },
                            {
                                title: 'Convert Feature',
                                description: "Displays menu Convert ( List Menu )",
                                id: '.menu convert'
                            },
                            {
                                title: 'Music Feature',
                                description: "Displays menu Music ( List Menu )",
                                id: '.menu music'
                            }
                        ]
                    },
                    {
                        title: 'System Information',
                        highlight_label: 'Populer Plugins',
                        rows: [{
                                title: 'Creator Bot',
                                description: `Bot owner info, who created it ( information )`,
                                id: '.owner'
                            },
                            {
                                title: 'Info System',
                                description: "Viewing System Info on Bot ( information )",
                                id: '.ping'
                            },
                            {
                                title: 'Info Menu',
                                description: "Viewing menulist on Bot ( information )",
                                id: '.list'
                            },
                            {
                                title: 'Script Info',
                                description: "Source Code Bot WhatsApp Info ( information )",
                                id: '.sc'
                            },
                            {
                                title: 'Donate Info',
                                description: "Donate to Support Bot ( information )",
                                id: '.donate'
                            }
                        ]
                    }
                ]

                let listMessage = {
                    title: 'List Menu',
                    sections
                };
    let captimenu =
`*_あ Library : [ Baileys-MD ]_* 
*_あ Uptime : [ %muptime ]_* 
*_あ Date : [ %date ]_* 
*_あ Database : [ %totalreg ]_*  
 `    
    let msg = generateWAMessageFromContent(m.chat, {
                    viewOnceMessage: {
                        message: {
                            "messageContextInfo": {
                                "deviceListMetadata": {},
                                "deviceListMetadataVersion": 2
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.create({
                                contextInfo: {
                                    mentionedJid: [m.sender],
                                    isForwarded: false,
                                    forwardedNewsletterMessageInfo: {
                                        newsletterJid: '120363177092661333@newsletter',
                                        newsletterName: 'Powered By Jarot',
                                        serverMessageId: -1
                                    },
                                    externalAdReply: {
                                        title: 'OscarBotz',
                                        body: 'Version: 1.0.2-beta',
                                        thumbnailUrl: 'https://raw.githubusercontent.com/Fiisya/uploads/main/uploads/1745581231825.jpeg',
                                        sourceUrl: 'https://alfisyl.my.id',
                                        mediaType: 1,
                                        renderLargerThumbnail: true
                                    },
                                },
                                body: proto.Message.InteractiveMessage.Body.create({
                                    text: `NOTE ⛽️:
乂 BOT INI MASIH TAHAP PENGEMBANGAN`
                                }),
                                footer: proto.Message.InteractiveMessage.Footer.create({
                                    text: 'Click the button below for the menu list'
                                }),
                                header: proto.Message.InteractiveMessage.Header.create({
                                    title: `Halo, @${m.sender.replace(/@.+/g, '')} 🪸 I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.`,
                                    subtitle: "Oscar",
                                    hasMediaAttachment: true,
                                    ...(await prepareWAMessageMedia({
                                        document: {
                                            url: 'https://wa.me/'
                                        },
                                        mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                        fileName: ` ${name}`,
                                        // jpegThumbnail: await conn.resize(ppUrl, 400, 400),
                                        fileLength: 0
                                    }, {
                                        upload: conn.waUploadToServer
                                    }))
                                }),
                                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                    buttons: [{
                                            "name": "single_select",
                                            "buttonParamsJson": JSON.stringify(listMessage)
                                        },
                                        {
                                            "name": "cta_url",
                                            "buttonParamsJson": "{\"display_text\":\"Owner\",\"url\":\"https://wa.me/6285850539404\",\"merchant_url\":\"https://wa.me/6285850539404\"}"
                                        },
                                    ],
                                })
                            })
                        }
                    }
}, { quoted: m })
    {
      return conn.relayMessage(m.chat, msg.message, {})
    }            
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
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
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        diamond: plugin.diamond,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `⭐ Powered by Oscar https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      sbot: (conn.user.jid == global.conn.user.jid ? '' : `\n▢ ✨ *Sub-Bot de:*\nwa.me/${global.conn.user.jid.split`@`[0]}`), 
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, diamond, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let pp = './src/fg_logo.jpg'

    /*conn.sendButton(m.chat, text.trim(), `▢ DyLux  ┃ ᴮᴼᵀ\n${mssg.ig}`, pp, [
      ['ꨄ︎ Apoyar', `${_p}donate`],
      ['⏍ Info', `${_p}botinfo`],
      ['⌬ Grupos', `${_p}gpdylux`]
    ], m, rpl)*/
    conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m, null, m)
  
    m.react('📚') 
    
  } catch (e) {
    conn.reply(m.chat, '❎ MENU SEDANG EROR', m)
    throw e
  }
}
//handler.help = ['help']
//handler.tags = ['main']
handler.command = ['menu2', 'help2', 'menú2'] 
handler.register = false

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('')
}