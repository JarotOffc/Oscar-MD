let handler = async (m, { conn, command, text }) => {
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
  conn.reply(m.chat, `
*_🎐Menurut Ramalan Oscar Bot.._*

Masa Depan ${pickRandom(['Anda akan menjadi orang yang Kaya, keluarga yang harmonis, memiliki 2 memiliki anak, memiliki 4 memiliki kendaraan, memiliki 2 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang harmonis, memiliki 3 memiliki anak, memiliki 1 memiliki kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Miskin, keluarga yang Sederhana, memiliki 1 anak, tidak memiliki kendaraan, rumah ngontrak','Anda akan menjadi orang yang Sederhana, keluarga yang dicerai, memiliki 5 anak, memiliki 2 kendaraan, memiliki 2 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang Sederhana, memiliki 2 anak, memiliki 2 kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Miskin, keluarga yang dicerai memiliki 2 anak, memiliki 1 kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Kaya, keluarga yang Sederhana, memiliki 1 anak, memiliki 1 kendaraan, memiliki 2 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang Harmonis, memiliki 1 anak, memiliki 3 kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Miskin, tidak memiliki keluarga (jomblo), tidak memiliki anak, tidak memiliki kendaraan, tidak memiliki rumah','Anda akan menjadi orang yang Sederhana, keluarga yang Sederhana, memiliki 4 anak, memiliki 1 kendaraan, memiliki 2 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang kacau, tidak memiliki anak (Gugur), memiliki 2 kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Sangat Kaya, keluarga yang Sangat Harmonis, memiliki 5 anak, memiliki 7 kendaraan, memiliki 9 rumah','Anda akan menjadi orang yang Sangat Miskin, keluarga yang Sederhana, memiliki 9 anak, tidak memiliki kendaraan, rumah ngontrak','Anda akan menjadi orang yang Kaya, keluarga yang Pelit, memiliki 2 anak, memiliki 2 kendaraan, memiliki 2 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang Pelit, memiliki 1 anak, memiliki 1 kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang dicerai, memiliki 2 anak, memiliki 1 kendaraan, rumah ngontrak','Anda akan menjadi orang yang Sangat Sederhana, keluarga yang Sakinah, memiliki 1 anak, memiliki 1 kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang Sangat Sederhana, memiliki 11 anak, memiliki 1 kendaraan, memiliki 1 rumah','Anda akan menjadi orang yang Sederhana, keluarga yang Sangat Sederhana, memiliki 2 anak kembar, memiliki 3 kendaraan, memiliki 2 rumah','Anda akan menjadi orang yang Sederhana keluarga yang Sederhana, memiliki 2 anak kembar dan 1 anak lagi, memiliki 1 kendaraan, memiliki 1 rumah'])}
`.trim(), fkontak)
}
handler.help = ['masadepan']
handler.tags = ['quotes']
handler.command = /^masadepan/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}