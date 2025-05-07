import fs from "fs"

let handler = async (m, { conn, args }) => {
    if (!m.mentionedJid) return m.reply('Tag pengguna yang ingin ditambahkan saldo banknya.')
    if (isNaN(args[1])) return m.reply('Jumlah yang Anda masukkan bukan angka.')

    let mentionedJid = m.mentionedJid[0]
    if (!(mentionedJid in global.db.data.users)) return m.reply(`Pengguna ${mentionedJid} tidak ditemukan dalam database`)

    let user = global.db.data.users[mentionedJid]
    let amount = parseInt(args[1])

    // Tambahkan saldo bank
    user.bank += amount

    global.db.data.users[mentionedJid] = user
    fs.writeFileSync('./database.json', JSON.stringify(global.db))

    let pp = './OscarBot/bank.jpg'
        
    const caption = `
▧「 *TAMBAH SALDO BANK* 」
│ 👤 Nama: ${user.registered ? user.name : conn.getName(m.sender)}
│ 💰 Saldo Bank: ${user.bank}
└────···
`.trim()

    conn.sendFile(m.chat, pp, 'bank.jpg', caption, m, null, rpl)
}    
handler.help = ['addbank @taguser jumlah']
handler.tags = ['rpg']
handler.command = /^addbank$/i

handler.register = true
handler.group = true
handler.rpg = true

export default handler