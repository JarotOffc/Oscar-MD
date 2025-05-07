import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk' 
import { fileURLToPath } from 'url' 
import moment from 'moment-timezone'

/*============= WAKTU =============*/
    // let wibh = moment.tz('Asia/Jakarta').format('HH')
    // let wibm = moment.tz('Asia/Jakarta').format('mm')
    // let wibs = moment.tz('Asia/Jakarta').format('ss')
    // let wktuwib = `${wibh} H ${wibm} M ${wibs} S`

    let wktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss') + ' WIB';

    let wktuwita = moment.tz('Asia/Makassar').format('HH:mm:ss') + ' WITA';

    let wktuwit = moment.tz('Asia/Jayapura').format('HH:mm:ss') + ' WIT';

    global.gabung = wktuwib+'\n'+wktuwita+'\n'+wktuwit;

    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
      
global.botdate = `⫹⫺ Day's: ${week} ${date}\nWeton: ${weton}`
global.bottime = `⫹⫺TIME: \nWIB: ${wktuwib}\nWITA: ${wktuwita}\nWIT: ${wktuwit}`

global.info = {
	nomorbot: '6285850539404',
	nomorown: '6285850539404',
	namebot: 'OSCAR MD',
	nameown: 'OSCAR MD',
	channel: '120363320674792053@newsletter',
	namechannel: 'OSCAR MD | Whatsapp Bots'
}
global.owner = [
  ['6285850539404', 'OSCAR', true],
  ['6285169111609'],
  ['6285850539404']
] //Numeros de owner
global.oscarmd = [global.info.nomorown, '6285850539404']
global.mods = [''] 
global.nomorown = ['6285850539404']
global.prems = ['6285850539404', '6285850539404']
global.botNumber = [''] 


//api
global.APIs = { // API Prefix
  // name: 'https://website' 
  jerapi: 'https://jerofc.my.id',
  ryzen: 'https://api.ryzendesu.vip',
  nrtm: 'https://fg-nrtm.ddns.net',
  lol: 'https://api.lolhuman.xyz',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.botcahx.eu.org': 'UKPalYek',
  'https://jerofc.my.id': 'jerofc',
  'https://api.fgmods.xyz': 'fg_9XdnzCdQ' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'OSCAR MD' 
global.wm = 'OSCAR MD'
global.author = '@Oscar' 

//--info FG
global.botName = 'OSCAR MD'
global.ig = 'https://instagram.com/jarotr_' 
global.sc = 'https://github.com/FG98F/JarottOfc' 
global.yt = 'https://youtube.com/OscarOffc'
global.pyp = '_'
global.log = 'https://i.ibb.co/1zdz2j3/logo.jpg' 

//--- Grupos WA
global.id_canal = '120363320674792053@newsletter' //-ID de canal de WhatsApp
global.canal = 'https://whatsapp.com/channel/0029Vafxmss3wtb42PjN371r'
global.bgp = '_'
global.bgp2 = '_'
global.bgp3 = '_' //--GP NSFW


/*=========== TYPE DOCUMENT ===========*/
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'
global.djson = 'application/json'

global.thumbdoc = 'https://telegra.ph/file/6e45318d7c76f57e4a8bd.jpg'


global.flaaa = [
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]
/*=========== FAKE SIZE ===========*/
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'

/*========== HIASAN ===========*/
global.decor = {
	menut: '❏═┅═━–〈',
	menub: '┊•',
	menub2: '┊',
	menuf: '┗––––––––––✦',
	hiasan: '꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷',

	menut: '––––––『',
    menuh: '』––––––',
    menub: '┊☃︎ ',
    menuf: '┗━═┅═━––––––๑\n',
	menua: '',
	menus: '☃︎',

	htki: '––––––『',
	htka: '』––––––',
	haki: '┅━━━═┅═❏',
	haka: '❏═┅═━━━┅',
	lopr: 'Ⓟ',
	lolm: 'Ⓛ',
	htjava: '❃'
}
global.wait = '⌛ _Prosess..._\n*▬▬▬▭*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            level: '📊',
            limit: '🎫',
            health: '❤️',
            exp: '✨',
            atm: '💳',
            money: '💰',
            bank: '🏦',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🛍️',
            mythic: '🎁',
            legendary: '🗃️',
            superior: '💼',
            pet: '🔖',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐴',
            cat: '🐱',
            dog: '🐶',
            fox: '🦊',
            robo: '🤖',
            petfood: '🍖',
            iron: '⛓️',
            gold: '🪙',
            emerald: '❇️',
            upgrader: '🧰',
            bibitanggur: '🌱',
            bibitjeruk: '🌿',
            bibitapel: '☘️',
            bibitmangga: '🍀',
            bibitpisang: '🌴',
            anggur: '🍇',
            jeruk: '🍊',
            apel: '🍎',
            mangga: '🥭',
            pisang: '🍌',
            botol: '🍾',
            kardus: '📦',
            kaleng: '🏮',
            plastik: '📜',
            gelas: '🧋',
            chip: '♋',
            umpan: '🪱',
            skata: '🧩'
        }
        let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
        if (!results.length) return ''
        else return emot[results[0][0]]
    }
}

//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})
