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
 import os from 'os' 
 import PhoneNumber from 'awesome-phonenumber' 
  
 let handler = async (m, { conn, usedPrefix: _p }) => { 
 try {
  
   let user = `@${m.sender.split('@')[0]}` 
  
  
 let tags = {} 
 const defaultMenu = { 
   before: `*_あ Library : [ Baileys-MD ]_* 
*_あ Prefix : [ %_p ]_* 
*_あ Platform : [ %platform ]_* 
*_あ Uptime : [ %muptime ]_* 
*_あ Date : [ %date ]_* 
*_あ Database : [ %totalreg ]_* 
 %readmore 
 `.trimStart(), 
   header: '╭───「 \t*%category* 」', 
   body: `\t❏ _%cmd_ `, 
   footer: '╰────────────✧', 
   after: ``, 
 }  
     let name = m.pushName || conn.getName(m.sender) 
     let d = new Date(new Date + 3600000) 
     let locale = 'en' 
     // d.getTimeZoneOffset() 
     // Offset -420 is 18.00 
     // Offset    0 is  0.00 
     // Offset  420 is  7.00 
     let date = d.toLocaleDateString(locale, { 
       day: 'numeric', 
       month: 'long', 
       year: 'numeric', 
       timeZone: 'Asia/Jakarta' 
     }) 
     let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jakarta' }) 
     time = time.replace(/[.]/g, ':') 
     let _muptime 
     if (process.send) { 
       process.send('uptime') 
       _muptime = await new Promise(resolve => { 
         process.once('message', resolve) 
         setTimeout(resolve, 1000) 
       }) * 1000 
     } 
  
     let _uptime 
     if (process.send) { 
       process.send('uptime') 
       _uptime = await new Promise(resolve => { 
         process.once('message', resolve) 
         setTimeout(resolve, 1000) 
       }) * 1000 
     } 
  
     let totalreg = Object.keys(global.db.data.users).length 
     let platform = os.platform() 
     let muptime = clockString(_muptime) 
     let uptime = clockString(_uptime) 
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
     for (let plugin of help) 
       if (plugin && 'tags' in plugin) 
         for (let tag of plugin.tags) 
           if (!(tag in tags) && tag) tags[tag] = tag 
     conn.menu = conn.menu ? conn.menu : {} 
     let before = conn.menu.before || defaultMenu.before 
     let header = conn.menu.header || defaultMenu.header 
     let body = conn.menu.body || defaultMenu.body 
     let footer = conn.menu.footer || defaultMenu.footer 
     let after = conn.menu.after || defaultMenu.after 
     let _text = [ 
       before, 
       ...Object.keys(tags).map(tag => { 
         return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [ 
           ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => { 
             return menu.help.map(help => { 
               return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help) 
                 .replace(/%islimit/g, menu.limit ? '(Limit)' : '') 
                 .replace(/%isPremium/g, menu.premium ? '(Premium)' : '') 
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
       name, date, time, platform, _p, totalreg, 
       readmore: readMore 
     } 
     text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name]) 
       let pp = './OscarBot/menu.jpg'

    /*conn.sendButton(m.chat, text.trim(), `▢ DyLux  ┃ ᴮᴼᵀ`, pp, [
      ['ꨄ︎ Apoyar', `${_p}donate`],
      ['⏍ Info', `${_p}botinfo`],
      ['⌬ Grupos', `${_p}gpdylux`]
    ], m, rpl)*/
    conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m, null, rpl)
  
    m.react('♻️') 
    
  } catch (e) {
    conn.reply(m.chat, '❎ MENU SEDANG EROR', fwc)
    throw e
  }
}
handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['allmenu', 'menuall']

handler.daftar = true
  
 export default handler 
  
 const more = String.fromCharCode(8206) 
 const readMore = more.repeat(4001) 
  
 function clockString(ms) { 
   let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) 
   let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60 
   let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60 
   return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':') 
 }
