let handler = async (m) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let untotalreg = Object.values(global.db.data.users).filter(user => user.registered == false).length
    let fitur = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
    let jarot = `⊙─〔 OSCAR MD}─ 〕─⊙
乂 *TOTAL FITUR :  [ ${fitur.length} ]*
乂 *TOTAL USER : [ ${totalreg} ]*
乂 *USER REGISTER: [ ${rtotalreg} ]*
乂 *USER NO REGISTER : [ ${untotalreg} ]*

────────────`
return conn.sendMessage(m.chat, {
 image: { url: "https://i.supa.codes/Un72R8" },
 caption: jarot, 
 footer: "© OSCAR MD",
 buttons: [
   {
     buttonId: '@verify',
     buttonText: {
       displayText: '@VERIFY'
     },
     type: 1
   },
 ],
 headerType: 1,
 viewOnce: true
}, { quoted: m })
}    
handler.help = ['database', 'user']
handler.tags = ['info']
handler.command = /^(database|jumlahdatabase|user)$/i
handler.limit = true

export default handler