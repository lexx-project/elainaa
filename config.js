import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.config = {
    /*============== INFO LINK ==============*/
    instagram: 'https://www.instagram.com/lexycuy/',
    github: 'https://github.com/',
    group: 'https://whatsapp.com/channel/0029Vaiy0J69WtCBOqbDfd3n',
    website: 'https://taplink.cc/allsosmedjess',

    /*============== PAYMENT ==============*/
    dana: '0882009391607',
    ovo: '-',
    gopay: '-',
    pulsa: '-',

    /*============== STAFF ==============*/
    owner: [
        ['62882009391607', 'lexx', true]
    ],

    /*============= PAIRING =============*/
    pairingNumber: "628882009391607",
    pairingAuth: true,

    /*============== API ==============*/
    APIs: {
        lol: 'https://api.lolhuman.xyz',
        rose: 'https://api.itsrose.rest',
        xzn: 'https://skizoasia.xyz',
    },

    APIKeys: {
        'https://api.lolhuman.xyz': 'zenOfficial',
        'https://api.itsrose.rest': 'Rk-f5d4b183e7dd3dd0a44653678ba5107c',
        'https://skizoasia.xyz': 'ZenOfficialDev'
    },

    /*============== TEXT ==============*/
    watermark: 'lexx - Ai',
    author: '√lexx',
    loading: 'Mohon ditunggu...',
    errorMsg: 'Error :)',

    stickpack: 'Made With',
    stickauth: 'lexx - Ai, Sewa? Chat : 62882009391607',

    digi: {
        username: "",
        apikey: ""
    },

    OK: {
        ID: "",
        Apikey: ""
    },
    
    taxRate: 0.05,
    taxMax: 2000
}

global.loading = (m, conn, back = false) => {
    if (!back) {
        return conn.sendReact(m.chat, "🕒", m.key)
    } else {
        return conn.sendReact(m.chat, "", m.key)
    }
}

/*============== EMOJI ==============*/
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
            skata: '🧩',
            bitcoin: '☸️',
            polygon: '☪️',
            dogecoin: '☯️',
            etherium: '⚛️',
            solana: '✡️',
            memecoin: '☮️',
            donasi: '💸',
            ammn: '⚖️',
            bbca: '💵',
            bbni: '💴',
            cuan: '🧱',
            bbri: '💶',
            msti: '📡',
            steak: '🥩',
            ayam_goreng: '🍗',
            ribs: '🍖',
            roti: '🍞',
            udang_goreng: '🍤',
            bacon: '🥓',
            gandum: '🌾',
            minyak: '🥃',
            garam: '🧂',
            babi: '🐖',
            ayam: '🐓',
            sapi: '🐮',
            udang: '🦐'
        }
        if (typeof emot[string] !== 'undefined') {
            return emot[string]
        } else {
            return ''
        }
    }
}

//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})
