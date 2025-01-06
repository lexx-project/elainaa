import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let bot = global.db.data.bots
    let user = global.db.data.users[m.sender]
    let name = user.registered ? user.name : conn.getName(m.sender)
    let invest = Object.entries(user.invest).filter(v => v[1].stock != 0)
    const hargaSebelumnyas = await Hitung(invest)
    const hargaSekarangs = await HitungProfit(invest, bot)

    const keuntungans = ((hargaSekarangs - hargaSebelumnyas) / hargaSebelumnyas) * 100;
    let cap = invest.length > 0 ? `
*Market Bot ${conn.user.name}*
*Investor :* ${user.registered ? user.name : await conn.getName(m.sender)}

*Total Investasi :* ${toRupiah(hargaSebelumnyas)}
*Total Investasi Sekarang :* ${toRupiah(hargaSekarangs)}
*Total Profit :* ${(hargaSekarangs - hargaSebelumnyas) > 0 ? `+${toRupiah(hargaSekarangs - hargaSebelumnyas)}` : toRupiah(hargaSekarangs - hargaSebelumnyas)} ( ${keuntungans.toFixed(2)}% )

${invest.map((v, i) => {
    const hargaSebelumnya = v[1].harga;
    const hargaSekarang = bot.invest.item[v[0]].harga;

    const keuntungan = ((hargaSekarang - hargaSebelumnya) / hargaSebelumnya) * 100;
    const profit = bot.invest.item[v[0]].harga - v[1].harga
    return `
*${i + 1}.* ${global.rpg.emoticon(v[0])} ${capitalize(v[0])} 
Avarage : ${toRupiah(v[1].harga)}
Harga : ${toRupiah(bot.invest.item[v[0]].harga)}
Stock : ${toRupiah(v[1].stock)}
Investasi : ${toRupiah(v[1].stock * v[1].harga)}
Investasi Sekarang : ${toRupiah(v[1].stock * bot.invest.item[v[0]].harga)}
Profit : ${profit > 0 ? `+${toRupiah(profit * v[1].stock)}` : toRupiah(profit * v[1].stock)} ( ${keuntungan.toFixed(2)}% )
` .trim()
}).join("\n\n")}
`.trim() : ""
    await conn.sendFile(m.chat, "https://pomf2.lain.la/f/205w4rkj.jpg", null, cap, m)
    //conn.adReply(m.chat, cap, `Halo ${name}, ${wish()}`, global.config.watermark, "https://pomf2.lain.la/f/205w4rkj.jpg", global.config.website, m)
}
handler.help = ["mycoin"]
handler.tags = ["rpg"]
handler.command = /^(mycoin)$/i
handler.rpg = true
handler.group = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")

async function Hitung(invest) {
    let result = 0
    for (let v of invest) {
        result += v[1].stock * v[1].harga
    }
    return result
}

async function HitungProfit(invest, investBot) {
    let result = 0
    for (let v of invest) {
        result += v[1].stock * investBot.invest.item[v[0]].harga
    }
    return result
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1)
}

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}