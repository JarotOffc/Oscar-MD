let handler = async (m, { conn, args, usedPrefix }) => {
const { chats: data } = conn;
const filteredMessages = Object.values(data)
  .flatMap(({ messages }) => Object.entries(messages || {}))
  .filter(([messageId]) => messageId.startsWith('BAE5'))
  .reduce((obj, [messageId, message]) => ({ ...obj, [messageId]: message }), {});

const seenParticipants = new Set();
const filteredParticipants = Object.values(filteredMessages)
  .reduce((arr, { pushName, key: { participant, remoteJid } }) => {
    if (!seenParticipants.has(participant)) {
      seenParticipants.add(participant);
      arr.push({ pushName, participant: participant || remoteJid || '', remoteJid });
    }
    return arr;
  }, []);

const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
const formattedText = filteredParticipants.map(({ pushName, participant, remoteJid }, index) => (
  `*${index + 1}.* ${pushName}\n*Tag:* @${participant.split('@')[0]}\n*ID:* ${remoteJid.split('@')[0]}\n`
)).join('\n');

await conn.sendMessage(m.chat, { text: formattedText, mentions: filteredParticipants.map(({ participant }) => participant) }, { quoted: fkontak });
}
handler.help = ['listbot']
handler.tags = ['group']
handler.command = /^listbot$/i

export default handler