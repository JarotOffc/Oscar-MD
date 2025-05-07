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
let handler = async (m, { conn, args, usedPrefix, command }) => {
	
	let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
      let str = `
╭─────[ *Status* ]────✧
├❑ *Aktif Selama:* [ ${muptime} ]
├❑ *Mode: ${global.group_mode ? 'Group' : 'Public'}*
├❑ *Platform:* ${os.platform()}
├❑ *RAM Usage:* ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
╰────────────···
    `.trim() // Pesan nya atau caption
     let msgs = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: str
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false,
          ...await prepareWAMessageMedia({ image: { url: `https://og.tailgraph.com/og?fontFamily=Poppins&title=Runtime+Bot&titleTailwind=font-bold%20text-red-600%20text-7xl&stroke=true&text=Time : ${muptime}&textTailwind=text-red-700%20mt-4%20text-2xl&textFontFamily=Poppins&logoTailwind=h-8&bgUrl=https%3A%2F%2Fwallpaper.dog%2Flarge%2F272766.jpg&bgTailwind=bg-blue%20bg-opacity-30&footer=©+OscarBot+2023-2024&footerTailwind=text-grey-600` } }, { upload: conn.waUploadToServer })
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
            {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"SpeedTest\",\"id\":\".speedtest\"}"
              },                          
            ],
          })
       })
    }
  }
}, { quoted: m })

await conn.relayMessage(m.chat, msgs.message, { messageId: m.key.id })
} 
   
handler.help = ['runtime'] 
handler.tags = ['info']
handler.command = ['runtime', 'uptime']
export default handler 

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}