import fs from "fs"
let handler = async (m, { conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
    if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`)
    let user = global.db.data.users[who]
    const caption = `
▧「 *BANK CEK* 」
│ 👤 Name: ${user.registered ? user.name: conn.getName(m.sender)}
│  Atm: ${user.atm > 0 ? 'Level ' + user.atm: '✖️'}
│ Bank: ${user.bank} / ${user.fullatm}
│ Money: ${user.money}
│ Chip: ${user.chip}
│ 🤖 Robo: ${user.robo > 0 ? 'Level ' + user.robo: '✖️'}
│ 🌟 Status: ${who.split`@`[0] == global.nomorown ? 'Developer': user.premiumTime >= 1 ? 'Premium User': user.level >= 1000 ? 'Elite User': 'Free User'}
│ 📑 Registered: ${user.registered ? 'Yes': 'No'}
└────···
`.trim()
 //   await conn.adReply(m.chat, caption, '', '', fs.readFileSync('./media/bank.jpg'), '', m)
    await conn.sendFile(m.chat, fs.readFileSync('./OscarBot/bank.jpg'), null, caption, m)
}
handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^bank$/i

handler.register = true
handler.group = true
handler.rpg = true

export default handler