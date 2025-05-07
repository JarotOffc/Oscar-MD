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

let handler = async (m, { conn, usedPrefix, command }) => {
   let jarot = `
⊙─〔 𝚁𝚄𝙻𝙴𝚂 𝙶𝚁𝙾𝚄𝙿 𝙱𝙾𝚃 }─ 〕─⊙
⫹⫺ ɴᴏ ꜱᴩᴀᴍ ᴄᴏᴍᴍᴀɴᴅ ʙᴏᴛ
⫹⫺ ɴᴏ ꜱʜᴀʀᴇ ʟɪɴᴋ
⫹⫺ ɴᴏ ᴄᴀʟʟ ʙᴏᴛ
⫹⫺ ɴᴏ ꜱᴇɴᴅ ʙᴜɢ 
⫹⫺ ɴᴏ ꜱᴇɴᴅ ᴅᴏᴄᴜᴍᴇɴᴛ
⫹⫺ ɴᴏ ꜱᴇɴᴅ ᴠɪʀᴛᴇx
⫹⫺ ɴᴏ ꜱʜᴀʀᴇ 18+

⊙─〔 ꜰɪᴛᴜʀ ʙᴏᴛ ᴀᴋᴛɪꜰ }─ 〕─⊙
⫹⫺ ᴀɴᴛɪ ʙᴏᴛ 
⫹⫺ ᴀɴᴛɪ ʟɪɴᴋ

⊙─〔 ꜰɪᴛᴜʀ ɢᴀᴍᴇ ᴀᴋᴛɪꜰ }─ 〕─⊙
⫹⫺ ʀᴩɢ 
⫹⫺ ɢᴀᴍᴇ

NOTE ⛽️:

ᴊɪᴋᴀ ᴍᴇʟᴀɴɢɢᴀʀ ᴀᴛᴜʀᴀɴ ʀᴜʟᴇꜱ ʙᴏᴛ ᴏᴛᴏᴍᴀᴛɪꜱ ᴀᴋᴀɴ ᴅɪ ᴋɪᴄᴋ ᴅᴀɴ ᴅɪ ʙᴀɴɴᴇᴅ ᴩᴇʀᴍᴀɴᴇɴᴛ

📮 ＬＩＮＫ: Click Tombol Dibawah
`
    let msgs = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: jarot
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false,
          ...await prepareWAMessageMedia({ image: { url: "https://qu.ax/XenZo.jpeg" } }, { upload: conn.waUploadToServer })
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
            {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"GROUP BOT\",\"url\":\"https://chat.whatsapp.com/LEKWi8Z2ziwDDMee0m6ZBi\",\"merchant_url\":\"https://chat.whatsapp.com/LEKWi8Z2ziwDDMee0m6ZBi\"}"
              }, 
{
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"CHANEL INFO BOT\",\"url\":\"https://whatsapp.com/channel/0029Vafxmss3wtb42PjN371r\",\"merchant_url\":\"https://whatsapp.com/channel/0029Vafxmss3wtb42PjN371r\"}"
              },
{
                "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"CHANEL STORY SAD\",\"url\":\"https://whatsapp.com/channel/0029Vb3LoQQGpLHKJWu1p92c\",\"merchant_url\":\"https://whatsapp.com/channel/0029Vb3LoQQGpLHKJWu1p92c\"}"           
              },                         
            ],
          })
       })
    }
  }
}, { quoted: m })

await conn.relayMessage(m.chat, msgs.message, { messageId: m.key.id })
}
handler.help = ['gcbot']
handler.tags = ['info']
handler.command = /^(gcbot)$/i

handler.register = false
handler.premium = false
handler.limit = false

export default handler;

