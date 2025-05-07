import { tmpdir } from 'os';
import { join } from 'path';
import fs from 'fs';

let handler = async (m, { args, text, conn }) => {
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
  const sessionsDir = join('sessions');

  function deleteFiles(sessions) {
    fs.readdir(sessions, (err, files) => {
      if (err) throw err;
      let deletedFiles = 0;

      for (const file of files) {
        if (file !== 'creds.json') {
          const filePath = join(sessions, file);
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            deletedFiles++;
            if (deletedFiles === files.length - 1) {
              conn.reply(m.chat, 'Berhasil menghapus semua sesi kecuali creds.json', fkontak);
            }
          });
        }
      }
    });
  }

  deleteFiles(sessionsDir);
};

handler.help = ['clearsession'];
handler.tags = ['owner'];
handler.command = /^(c(lear)?)(sessi|session)$/i;
handler.rowner = true;

export default handler;