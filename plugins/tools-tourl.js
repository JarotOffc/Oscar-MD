import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `✳️ Media Nya Mana?`
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  m.reply(`▢ *ukuran:* ${(media.length / (1024 * 1024)).toFixed(2)} MB

▢ ${isTele ? '( DONE )' : '(kadaluarsa)'} 
▢ *URL :* ${link}
  `)
}
handler.help = ['tourl']
handler.tags = ['tools']
handler.command = ['upload', 'tourl']

export default handler