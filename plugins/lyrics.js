import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh\n*${usedPrefix}${command} Faded Alan Walker*`
  m.reply(wait)
  try {
    const response = await axios.get(`https://api.giftedtech.web.id/api/search/lyrics?apikey=gifted&query=${encodeURIComponent(text)}`)
    const data = response.data
    if (data && data.result) {
      m.reply(`
*Title:* ${data.result.title}
*Artist:* ${data.result.artist}
*Lyrics:*
${data.result.lyrics}
`.trim())
    } else {
      throw new Error('Lirik tidak ditemukan')
    }
  } catch (error) {
    conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. ${error.message}`, m)
  }
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i
handler.register = true

export default handler
