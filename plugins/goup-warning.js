let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `✳️ Sebutkon Nama Pengguna\n\n📌 contoh: ${usedPrefix + command} @user`
        if (conn.user.jid.includes(who)) return m.reply(`✳️ tag user yang mau di warning`)
        if (!(who in global.db.data.users)) throw `✳️ Pengguna Tidak Ada Di dalem Database`
        let txt = text.replace('@' + who.split`@`[0], '').trim()
        let name = conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
            m.reply(`
⚠️ *PERINGATAN* ⚠️

▢ *Admin:* ${name}
▢ *User:* @${who.split`@`[0]}
▢ *Peringatan:* ${warn + 1}/${war}
▢ *Alasan:* ${txt}`, null, { mentions: [who] }) 
            m.reply(`
⚠️ *Peringatan* ⚠️
Anda Menerima Peringatan Dari Admin

▢ *Peringatan:* ${warn + 1}/${war} 
Jika Anda menerima *${war}* peringatan, Anda akan otomatis dikeluarkan dari grup`, who)
        } else if (warn == war) {
            global.db.data.users[who].warn = 0
            m.reply(`⛔ Pengguna telah mencapai batas *${war}* peringatan dan akan dikeluarkan`)
            await time(3000)
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
            m.reply(`♻️ Fuiste eliminado del grupo *${groupMetadata.subject}* porque ha sido advertido *${war}* veces`, who)
        }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['warn'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }