import './config.js';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL): pathURL: pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
import {
    readdirSync,
    statSync,
    unlinkSync,
    existsSync,
    readFileSync,
    watch
} from 'fs'
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import syntaxerror from 'syntax-error';
import chalk from 'chalk';
import { tmpdir } from 'os';
import readline from 'readline';
import { format } from 'util';
import pino from 'pino';
import ws from 'ws';
import pkg from '@whiskeysockets/baileys';
const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    makeCacheableSignalKeyStore,
    PHONENUMBER_MCC
} = pkg;
import { Low, JSONFile } from 'lowdb'
import NodeCache from 'node-cache'
import fs from 'fs'
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import {
    mongoDB,
    mongoDBV2
} from './lib/mongoDB.js';

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name]: name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query, ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name]: name]
    }: {})
})): '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
    start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎\/!#.\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
    /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']): /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
    (opts['mongodbv2'] ? new mongoDBV2(opts['db']): new mongoDB(opts['db'])):
    new JSONFile(`${opts._[0] ? opts._[0] + '_': ''}database.json`)
)


global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
        if (!global.db.READ) {
            clearInterval(this)
            resolve(global.db.data == null ? global.loadDatabase(): global.db.data)
        }
    }, 1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read().catch(console.error)
    global.db.READ = null
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(global.db.data || {})
    }
    global.db.chain = chain(global.db.data)
}
loadDatabase()

//-- SESSION
global.authFile = `JarotOffc`
const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile)
//const msgRetryCounterMap = (MessageRetryMap) => { }
const msgRetryCounterMap = new Map()
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
//const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumber[0]

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
do {
opcion = await question('\n\n\n✳️ Masukan metode koneksi\n\n\n🔺 1 : Via QR\n🔺 2 : pairing code\n\n\n\n')
if (!/^[1-2]$/.test(opcion)) {
console.log('\n\n🔴 masukkan hanya bisa satu opsi \n\n 1 o 2\n\n')
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

console.info = () => {} 

const connectionOptions = {
    logger: pino({ level: 'silent' }),
    printQRInTerminal: opcion === '1' || methodCodeQR,
    mobile: MethodMobile,
    browser: opcion === '1' ? ['Glospot', 'Safari', '2.0.0'] : methodCodeQR ? ['Glospot', 'Safari', '2.0.0'] : ['Ubuntu', 'Chrome', '20.0.04'],
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
    },
    waWebSocketUrl: 'wss://web.whatsapp.com/ws/chat?ED=CAIICA',
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid);
        let msg = await store.loadMessage(jid, key.id);
        return msg?.message || "";
    },
    patchMessageBeforeSending: async (message) => {
        let messages = 0;
        global.conn.uploadPreKeysToServerIfRequired();
        messages++;
        return message;
    },
    msgRetryCounterCache: msgRetryCounterCache,
    userDevicesCache: userDevicesCache,
    //msgRetryCounterMap,
    defaultQueryTimeoutMs: undefined,
    cachedGroupMetadata: (jid) => global.conn.chats[jid] ?? {},
    version: [ 2, 3000, 1023047013 ],
    //userDeviceCache: msgRetryCounterCache <=== quien fue el pendejo?????
};

global.conn = makeWASocket(connectionOptions)

if (!fs.existsSync(`./${authFile}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {  
if (MethodMobile) throw new Error('⚠️ Ada kesalahan api dari blayes')

let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
if (!Object.keys(PHONENUMBER_MCC).some(v => addNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.bold.redBright("\n\n✴️ Nomor Anda harus dimulai dengan kode negara")))
process.exit(0)
}} else {
const DEFAULT_MCC = ['1', '44', '62', '91', '81', '55', '33', '49'];

while (true) {
  addNumber = await question(chalk.bgBlack(chalk.bold.greenBright("\n\n✳️ Tuliskan nomer kamu\n\nExample: 6285850539444\n\n")))
  addNumber = addNumber.replace(/[^0-9]/g, '')

  if (
    addNumber.match(/^\d+$/) &&
    DEFAULT_MCC.some(v => addNumber.startsWith(v))
  ) {
    break
  } else {
    console.log(chalk.bgBlack(chalk.bold.redBright("\n\n✴️ Pastikan untuk menambahkan kode negara")))
  }
}
rl.close()  
} 

        setTimeout(async () => {
            let codeBot = await conn.requestPairingCode(addNumber)
            codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
            console.log(chalk.yellow('\n\n🍏 Code Pairing.'))
            console.log(chalk.black(chalk.bgGreen(`\n🟣  Kode Anda Salah: `)), chalk.black(chalk.red(codeBot)))
        }, 3000)
}}
}
conn.isInit = false

if (!opts['test']) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
    if (opts['autocleartmp']) try {
      clearTmp()

    } catch (e) { console.error(e) }
  }, 60 * 1000)
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

/* Clear */
async function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))

  //---
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 1)) return unlinkSync(file) // 1 minuto
    return false
  })
}

setInterval(async () => {
	await clearTmp()
	//console.log(chalk.cyan(`✅  Auto clear  | Se limpio la carpeta tmp`))
}, 60000) //1 munto

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    console.log(await global.reloadHandler(true).catch(console.error))
    global.timestamp.connect = new Date
  }
  
  if (global.db.data == null) loadDatabase()

} //-- cu 

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true;
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) handler = Handler
    } catch (e) {
        console.error(e)
    }
    if (restatConn) {
        const oldChats = global.conn.chats
        try {
            global.conn.ws.close()
        } catch {}
        conn.ev.removeAllListeners()
        global.conn = makeWASocket(connectionOptions, {
            chats: oldChats
        })
        isInit = true
    }
    if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler)
        conn.ev.off('group-participants.update', conn.participantsUpdate)
        conn.ev.off('groups.update', conn.groupsUpdate)
        conn.ev.off('message.delete', conn.onDelete)
        conn.ev.off('connection.update', conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
    }

    conn.welcome = '✧━━━━━━[ Selamat Datang ]━━━━━━✧\nSelamat Datang di grup 👋@user \n@subject\n┗––––––━━┅┅┅\n\n––––┅┅ *DESCRIPTION* ┅┅––––\n@desc'
    conn.bye = '✧━━━━━━[ *Selamat Tinggal* ]━━━━━━✧\nSelamat Tinggal *@user* 👋'
    conn.spromote = '@user sekarang admin!'
    conn.sdemote = '@user sekarang bukan admin!'
    conn.sDesc = 'Deskripsi telah diubah ke \n@desc'
    conn.sSubject = 'Judul grup telah diubah ke \n@subject'
    conn.sIcon = 'Icon grup telah diubah!'
    conn.sRevoke = 'Link group telah diubah ke \n@revoke'
    conn.handler = typeof handler.handler === 'function' ? handler.handler.bind(global.conn) : () => {}
conn.participantsUpdate = typeof handler.participantsUpdate === 'function' ? handler.participantsUpdate.bind(global.conn) : () => {}
conn.groupsUpdate = typeof handler.groupsUpdate === 'function' ? handler.groupsUpdate.bind(global.conn) : () => {}
conn.onDelete = typeof handler.deleteUpdate === 'function' ? handler.deleteUpdate.bind(global.conn) : () => {}

    conn.connectionUpdate = connectionUpdate.bind(global.conn)
    conn.credsUpdate = saveCreds.bind(global.conn)

    conn.ev.on('messages.upsert', conn.handler)
    conn.ev.on('group-participants.update', conn.participantsUpdate)
    conn.ev.on('groups.update', conn.groupsUpdate)
    conn.ev.on('message.delete', conn.onDelete)
    conn.ev.on('connection.update', conn.connectionUpdate)
    conn.ev.on('creds.update', conn.credsUpdate)
    isInit = false
    return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
    for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
        try {
            let file = global.__filename(join(pluginFolder, filename))
            const module = await import(file)
            global.plugins[filename] = module.default || module
        } catch (e) {
            conn.logger.error(e)
            delete global.plugins[filename]
        }
    }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        let dir = global.__filename(join(pluginFolder, filename), true)
        if (filename in global.plugins) {
            if (existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
            else {
                conn.logger.warn(`deleted plugin '${filename}'`)
                return delete global.plugins[filename]
            }
        } else conn.logger.info(`requiring new plugin '${filename}'`)
        let err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true
        })
        if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
        else try {
            const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
            global.plugins[filename] = module.default || module
        } catch (e) {
            conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
        } finally {
            global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
        }
    }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

// Quick Test
async function _quickTest() {
    let test = await Promise.all([
        spawn('ffmpeg'),
        spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        spawn('convert'),
        spawn('magick'),
        spawn('gm'),
        spawn('find', ['--version'])
    ].map(p => {
            return Promise.race([
                new Promise(resolve => {
                    p.on('close', code => {
                        resolve(code !== 127)
                    })
                }),
                new Promise(resolve => {
                    p.on('error', _ => resolve(false))
                })
            ])
        }))
    let [ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find] = test
    console.log(test)
    let s = global.support = {
        ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find
    }
    // require('./lib/sticker').support = s
    Object.freeze(global.support)

    if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
    if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
    if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
.then(() => conn.logger.info('☑️ Quick Test Done'))
.catch(console.error)
