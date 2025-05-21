import axios from 'axios'

let handler = async (m, { conn, participants, groupMetadata }) => {
  const ppUrls = [
    'https://files.catbox.moe/qwp5qd.jpg',
  ];
  let ppUrl = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null);

  if (!ppUrl) {
  ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
}

  const ppBuffer = await axios.get(ppUrl, { responseType: 'arraybuffer' }).then(res => res.data).catch(_ => null);

  const { isBanned, welcome, detect, captcha, useDocument, nsfw, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  let jarot = `❍─〔 *INFO GROUP* 〕──❍
✘ *ID: [ ${groupMetadata.id} ]* 
✘ *Nama Group : [ ${groupMetadata.subject} ]*  
✘ *Total Member : [ ${participants.length} ]*
✘ *Total Admin : [ ${groupAdmins.length} ]* 

❍─〔 *Settings Bot* 〕──❍
❏ *Welcome:* ${welcome ? '✅' : '❎'}
❏ *Nsfw:* ${nsfw ? '✅' : '❎'}
❏ *Antilink:* ${antiLink ? '✅' : '❎'}
❏ *Captcha:* ${captcha ? '✅' : '❎'}
❏ *Document:* ${useDocument ? '✅' : '❎'}

❍─〔 *Pemilik Bot Oscar* 〕──❍
*📢 Jarot Offc:* [ https://wa.me/6285850539404 ]

© Made By ${global.wm}

▌│█║▌║▌║║▌║▌║█│▌
`.trim();

  if (ppBuffer) {
      conn.sendFile(m.chat, Buffer.from(ppBuffer), 'pp.jpg', jarot, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
  } else {
      conn.reply(m.chat, text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
  }
}

handler.help = ['infogc']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

export default handler