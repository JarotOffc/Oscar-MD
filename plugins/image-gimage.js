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
import fetch from 'node-fetch'

import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} anu`
    m.reply(wait)
    
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
let msgs = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `🔎 *Result: ${text}*\n🌎 *Source : Google*`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false,
          ...await prepareWAMessageMedia({ image: { url: link } }, { upload: conn.waUploadToServer })
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [{
            "name": "quick_reply",
              "buttonParamsJson": `{\"display_text\":\"Next Image ${text}\",\"id\":\".gimage ${text}\"}`
            }],
          })
       })
    }
  }
}, { quoted: m })

await conn.relayMessage(m.chat, msgs.message, { messageId: m.key.id })
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet', 'downloader']
handler.command = /^(gimage|image)$/i

handler.register = true

export default handler 
