let handler = async (m, { conn, text }) => {
    if (!text) throw 'Siapa Yang Mau Di Berhentikan Sebagai User Premium?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Masukan Nomor/Tag Orangnya'
    let users = global.db.data.users
    users[who].premium = false
    users[who].premiumTime = 0
    let nama = conn.getName(who)
    conn.reply(m.chat, 'Sukses Sayang', m)
    conn.sendMessage(who, {
                text: `Hai Kak ${nama}
Masa Premium Kamu Telah Di Hapus
Jika Ada Kesalahan Harap Lapor Owner`,})
}
handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^delprem(user)?$/i
handler.rowner = true

export default handler