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
let handler = async (m, { conn, command }) => {
    let wm = global.wm
    let _uptime = process.uptime() * 1000
    let uptimex = clockString(_uptime)

    let jarot = `❍─〔 *OSCAR MODE* 〕──❍
✘ *MODE: [ ${global.opts['self'] ? 'Self' : 'publik'} ]* 
✘ *USER : [ ${Object.keys(global.db.data.users).length} ]*
✘ *USER BANNED : [ ${Object.entries(global.db.data.users).filter(user => user[1].banned).length} ]* 
✘ *Fitur Sering Digunakan: [ ${Object.entries(db.data.stats).length} ]*

© Made By ${global.wm}

⛽️ *RUNTIME :* 
*[ ${uptimex} ]*

`.trim();
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
          ...await prepareWAMessageMedia({ image: { url: `https://og.tailgraph.com/og?fontFamily=Poppins&title=OSCAR+MODE&titleTailwind=font-bold%20text-red-600%20text-7xl&stroke=true&text=MODE : ${global.opts['self'] ? 'Self' : 'publik'}&textTailwind=text-red-700%20mt-4%20text-2xl&textFontFamily=Poppins&logoTailwind=h-8&bgUrl=https%3A%2F%2Fwallpaper.dog%2Flarge%2F272766.jpg&bgTailwind=bg-blue%20bg-opacity-30&footer=©+OscarBot+2023-2024&footerTailwind=text-grey-600` } }, { upload: conn.waUploadToServer })
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
            {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Owner\",\"id\":\".owner\"}"
              },                          
            ],
          })
       })
    }
  }
}, { quoted: m })

await conn.relayMessage(m.chat, msgs.message, { messageId: m.key.id })
}
handler.help = ['mode']
handler.tags = ['info']
handler.command = /^(mode)$/i 
handler.limit = false

export default handler

function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Hari " + hours + " Jam " + minutes + " Menit " + sec + " Detik";
}