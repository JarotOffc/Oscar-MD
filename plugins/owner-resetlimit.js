let {
	proto
} = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, args }) => {
    if (global.owner.some(number => m.sender.includes(number))) {
	let list = Object.entries(global.db.data.users)
	let lim = !args || !args[0] ? 3 : isNumber(args[0]) ? parseInt(args[0]) : 3
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		conn.reply(m.chat, `*berhasil direset ${lim} / user*`, m)
		await sendMessage(`\`[ Reset Limit Notification ]\`\n\n* *Bot Name:* ${global.info.namebot}\n* *Bot Number:* ${global.info.nomorbot}\n* *Reset Status:* Sukses\n* *Reset Limit:* ${lim} / Users\n* *Link Group Bot:* \n\n https://chat.whatsapp.com/LEKWi8Z2ziwDDMee0m6ZBi \n\n> *Notes:* Limit di reset setiap hari`)
		} else {
    m.reply('This command is for *R-OWNER* Only')
    }
}
handler.help = ['limit'].map(v => 'reset' + v)
handler.tags = ['owner']
handler.command = /^(resetlimit)$/i

handler.owner = true

export default handler 

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}

function sendMessage(teks) {
	const msg = {
		conversation: teks
	};
	const plaintext = proto.Message.encode(msg).finish();
	const plaintextNode = {
		tag: 'plaintext',
		attrs: {},
		content: plaintext,
	};
	const node = {
		tag: 'message',
		attrs: {
			to: global.info.channel,
			type: 'text'
		},
		content: [plaintextNode],
	};

	conn.query(node);
}