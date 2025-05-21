import fs from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  global.ftoko = {
       key: {
                   fromMe: false,
                   participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "6285850539404@s.whatsapp.net" } : {})
               },
               message: {
                   "productMessage": {
                       "product": {
                           "productImage":{
                               "mimetype": "image/jpeg",
                               "jpegThumbnail": fs.readFileSync('./OscarBot/menu.jpg') //Gambarnye
                           },
                           "title": wm, //Terserah Di Isi apa
                           "description": wm, 
                           "currencyCode": "USD",
                           "priceAmount1000": "20000000",
                           "retailerId": "Ghost",
                           "productImageCount": 1
                       },
                           "businessOwnerJid": `0@s.whatsapp.net`
               }
           }
       }
  let data = await (
    await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json')
  ).json()
  let cita = data[Math.floor(Math.random() * data.length)]

  let cowi = await (await fetch(cita.cowo)).buffer()
  await conn.sendFile(m.chat, cowi, '', '♂️', ftoko)
  let ciwi = await (await fetch(cita.cewe)).buffer()
  await conn.sendFile(m.chat, ciwi, '', '♀️', ftoko)
}
handler.help = ['ppcouple', 'ppcp']
handler.tags = ['tools', 'internet']
handler.command = ['ppcp', 'ppcouple']

handler.limit = true

export default handler
