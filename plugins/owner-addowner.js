let handler = async (m, {
	conn,
	text
}) => {
	let who
	if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
	else who = m.chat
	if (!who) throw `tag orangnya!`
	if (global.oscarmd.some(number => m.sender.includes(number))) {
		if (global.owner.includes(who.split`@` [0])) throw 'dia udah menjadi owner !'
		global.owner.push(`${who.split`@`[0]}`)
		conn.reply(m.chat, `@${who.split`@`[0]} sekarang owner !`, m, {
			contextInfo: {
				mentionedJid: [who]
			}
		})
	} else {
		m.reply('This command is for *R-OWNER* Only')
	}
}
handler.help = ['addowner [@user]']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)owner$/i

handler.rowner = true

export default handler