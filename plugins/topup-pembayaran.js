import { getProduk, orderProduk } from "../lib/digiflazz.js"
import moment from 'moment-timezone'
import fs from 'fs'
let handler = async (m, { conn, usedPrefix, command, text }) => {
    let [code, number, harga, produk, payment, cancel] = text.split("|")
    switch (payment) {
        case 'qris': {
            if (!conn.pembayaran) conn.pembayaran = {}
            if (cancel) {
                if (typeof conn.pembayaran[m.sender] === "undefined") return m.reply("Kamu Tidak Mempunyai Transaksi Yang Berjalan!")
                m.reply("Berhasil Menghapus Transaksi!")
                clearTimeout(conn.pembayaran[m.sender].expired)
                delete conn.pembayaran[m.sender]
                return
            }

            if (typeof conn.pembayaran[m.sender] !== "undefined") return m.reply("Kamu Masih Mempunyai Transaksi Yang Berjalan!")
            let item = await getProduk(code)
            if (!/prem/i.test(code) && !(item.buyer_product_status || item.seller_product_status)) return m.reply("Status item ini Tidak Ready!")
            let randomCode = Math.floor(Math.random() * 100)
            harga = Number(harga) + randomCode
            let refID = generateRefID()

            let caption = `
*TRANSAKSI TELAH DIBUAT*

Produk : ${produk}
Harga : Rp ${toRupiah(harga)}
Dibuat : ${formattedDate(Date.now())}
Expired : 10 Menit

_Silahkan Scan QRIS di atas dengan nominal *Rp.${toRupiah(harga)}* yang telah ditentukan! Jika sudah, transaksi akan otomatis selesai._

_*Note :* Tidak boleh melebihi atau kurang dari nominal tersebut, karena transaksi dicek oleh BOT!_
`.trim()

            await conn.textOptions(m.chat, caption, fs.readFileSync("./media/qris.jpg"), [[`${usedPrefix + command} ${code}|${number}|${harga}|${produk}|qris|cancel`, "Cancel"]], m)
            conn.pembayaran[m.sender] = { chat: m.chat, type: "qris", refID, code, produk, harga, number, time: Date.now(),
                expired: setTimeout(() => {
                    m.reply("Transaksi telah Expired!")
                    delete conn.pembayaran[m.sender]
                }, 600000)
            }
            break
        }
        case 'deposit': {
            let user = global.db.data.users[m.sender]
            let refID = generateRefID()
            let item = await getProduk(code)
            let harga = Number(item.price)

            if (user.deposit < item.price) return m.reply(`Saldo Deposit kamu tidak mencukupi untuk membeli ini! Silahkan deposit dahulu menggunakan command *${usedPrefix}deposit*`)
            if (!/prem/i.test(code) && !(item.buyer_product_status || item.seller_product_status)) return m.reply("Status item ini Tidak Ready!")

            orderProduk(code, refID, number).then(async v => {
                let status = v.data.status
                let caption = await getCaption("Pending", refID, item.product_name, item.price, user.deposit, v.data.sn)
                let image = await imageTransaksi("Pending")
                if (!/Pending|Sukses|Gagal/i.test(status)) {
                    image = await imageTransaksi(status)
                    caption = await getCaption(status, refID, produk, harga, v.data.sn)
                    await conn.adReply(m.chat, caption, `Halo ${name}, ${wish()}`, global.config.watermark, image, global.config.website, m)
                    user.historyTrx.push({ status: false, trxId: refID, nominal: harga, type: "refund", time: Date.now() })
                }
                if (status == "Sukses") {
                    image = await imageTransaksi(status)
                    caption = await getCaption(status, refID, produk, harga, v.data.sn)
                    await conn.adReply(m.chat, caption, `Halo ${name}, ${wish()}`, global.config.watermark, image, global.config.website, m)
                    user.historyTrx.push({ status: true, trxId: refID, nominal: harga, type: produk, time: Date.now() })
                    user.deposit -= harga
                } else if (status == "Gagal") {
                    image = await imageTransaksi(status)
                    caption = await getCaption(status, refID, produk, harga, v.data.sn)
                    await conn.adReply(m.chat, caption, `Halo ${name}, ${wish()}`, global.config.watermark, image, global.config.website, m)
                    user.historyTrx.push({ status: false, trxId: refID, nominal: harga, type: "refund", time: Date.now() })
                }
                await conn.adReply(m.chat, caption, `Halo ${m.name}, ${wish()}`, global.config.watermark, image, global.config.website, m)
                while (status !== "Sukses" && status !== "Gagal") {
                    await delay(5000)
                    let i = await orderProduk(code, refID, number)
                    status = i.data.status
                    if (status == "Sukses") {
                        image = await imageTransaksi(status)
                        caption = await getCaption(status, refID, item.product_name, item.price, user.deposit, i.data.sn)
                        await conn.adReply(m.chat, caption, `Halo ${m.name}, ${wish()}`, global.config.watermark, image, global.config.website, m)
                        user.historyTrx.push({ status: true, trxId: refID, nominal: item.price, type: item.product_name, time: Date.now() })
                        user.deposit -= harga
                        break
                    } else if (status == "Gagal") {
                        image = await imageTransaksi(status)
                        caption = await getCaption(status, refID, item.product_name, item.price, user.deposit, i.data.sn)
                        await conn.adReply(m.chat, caption, `Halo ${m.name}, ${wish()}`, global.config.watermark, image, global.config.website, m)
                        user.historyTrx.push({ status: false, trxId: refID, nominal: item.price, type: "refund", time: Date.now() })
                        break
                    }
                }
            })
            break
        }
        default:
            await conn.textList(m.chat, `Silahkan Pilih Metode Pembayaran Kamu!`, false, [
                [`${usedPrefix + command} ${code}|${number}|${harga}|${produk}|qris`, "1", "QRIS"],
                [`${usedPrefix + command} ${code}|${number}|${harga}|${produk}|deposit`, "2", "Deposit"]
            ], m)
    }
}
handler.command = /(pembayaran)/i
export default handler

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

function toRupiah(number) {
    return new Intl.NumberFormat('id-ID').format(number)
}

function generateRefID() {
    return 'ry-' + Math.random().toString(36).substr(2, 9)
}

function formattedDate(ms) {
    return moment(ms).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm')
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

function getCaption(status, refID, produk, harga, userDeposit, sn) {
    let desc = {
        "Pending": "",
        "Sukses": "_Silahkan Cek Akun Anda, Jika Belum Masuk Hubungi Owner._",
        "Gagal": "_Mohon Maaf, Saldo Anda Sudah Di-Convert Menjadi Saldo Deposit, Silahkan Ulangi Transaksi Atau Hubungi Owner._"
    }
    let caption = `
*TRANSAKSI ${status.toUpperCase()}!*

RefID : ${refID} ${sn ? `
SN : *${sn}*` : ""}
Pembelian : ${produk}
Harga : Rp ${toRupiah(harga)}
Status : ${status} ${status == "Sukses" ? `
Saldo : - Rp ${toRupiah(harga)}
Sisa Saldo : Rp ${toRupiah(userDeposit - harga)}` : ""}
Waktu : ${formattedDate(Date.now())}

_Pembelian ${produk} ${status}!_ ${desc[status]}
`.trim()
    return caption
}

function imageTransaksi(status) {
    let image = {
        "Pending": "pembayaran_diproses.png",
        "Sukses": "pembayaran_berhasil.png",
        "Gagal": "pembayaran_gagal.png"
    }
    return fs.readFileSync(`./media/${image[status]}`)
}