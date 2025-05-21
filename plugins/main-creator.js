function handler(m) {
   let data = global.owner.filter(([id, isCreator]) => id && isCreator);

    let numberowner = data[0]?.[0] || ''
    let gmail = "Jarotr@gmail.com"
    let instagram = ig
    let onum = 'Nomer Jarot Offc'

    const contacts = data.map(([id, name]) => [id, name, numberowner, gmail, instagram, onum])

    this.sendContact(m.chat, contacts, m)
    
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator'] 

export default handler