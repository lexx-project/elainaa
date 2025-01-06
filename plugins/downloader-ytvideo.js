import ytdl from '@distube/ytdl-core'
import fs from 'fs'
import sharp from "sharp"

let regex = /https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(\?[\w=&-]+)?|https:\/\/(?:www\.)?youtube\.com\/(?:shorts|watch)\/[a-zA-Z0-9_-]+(?:\?si=[a-zA-Z0-9_-]+)?/i
let handler = async (m, { conn, args, command, usedPrefix }) => {
    try {
        if (!conn.youtube) conn.youtube = {}
        if (!args[0]) return m.reply(`Masukan Link Youtube!\n\nContoh :\n${usedPrefix + command} https://youtu.be/Wky7Gz_5CZs`)
        let isLink = args[0].match(regex)
        if (!isLink) return m.reply("Itu bukan link youtube!")
        if (typeof conn.youtube[m.sender] !== "undefined") return m.reply("Kamu masih download!")
        await global.loading(m, conn)
        conn.youtube[m.sender] = "loading"
        let agent = ytdl.createAgent(cookies)
        let { videoDetails } = await ytdl.getInfo(args[0], { agent })
        let caption = `
*Youtube Video Downloader*

❏ Title : ${videoDetails.title}
❏ View : ${toRupiah(videoDetails.viewCount)}
❏ Category : ${videoDetails.category}
❏ Author : ${videoDetails.ownerChannelName}
`.trim()
        let thumbnail = (await conn.getFile(videoDetails.thumbnails.reverse()[0].url)).data
        let filename = "./tmp/" + Date.now() + ".jpg"
        await sharp(thumbnail).toFormat('jpeg').toFile(filename)
        
        let chat = await conn.adReply(m.chat, caption, videoDetails.title, null, filename, args[0], m)
        let video = await getVideo(args[0])
        let sizeMB = video.byteLength / (1024 * 1024)
        if (sizeMB > 80000) return m.reply("Size video terlalu besar!")
        await conn.sendFile(m.chat, video, null, videoDetails.title, chat)
    } finally {
        await global.loading(m, conn, true)
        delete conn.youtube[m.sender]
    }
}
handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = /^(yt(mp4|video)|youtube(mp4|video))$/i
handler.limit = true
export default handler

async function getVideo(url) {
    let randomName = new Date() * 1 + '.mp4'
    let agent = ytdl.createAgent(cookies)
    let stream = ytdl(url, {
        filter: (info) => (info.itag == 22 || info.itag == 18),
        agent
    }).pipe(fs.createWriteStream(`./tmp/${randomName}`))
    await new Promise((resolve, reject) => {
        stream.on('error', reject)
        stream.on('finish', resolve)
    })
    return fs.readFileSync("./tmp/" + randomName)
}

let getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

let toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")

const cookies = [
  { name: "__Secure-1PAPISID", value: "H_2IeDUX5Z7CckgN/AE-X-OcSmHhUDs0f2" },
  { name: "__Secure-1PSID", value: "g.a000qQixZWIZIFjTzOH_1mkOhpxby4XPdp1Z2AiERhCTm_8LbiAOng1TbrfRHXBF9gx0ihKvQAACgYKAS0SARQSFQHGX2Mi19F2KdBiRrcbYU9Oraa0NxoVAUF8yKqP8KiuL8KThKHScKZ_o_Wc0076" },
  { name: "__Secure-1PSIDCC", value: "AKEyXzVuRKSIfoD1KtEdq9DlYatiYpQaXxDeSqNdFiYZZVoGpxo_5aIfPkr7ZyofOC_GPtjG6g" },
  { name: "__Secure-1PSIDTS", value: "sidts-CjEBQT4rXyk6eHqf1odJUs9PNgCgDZsI-1LVDp2Tl8sI6xpVEH5S_FLrCtg2W2vY9hCPEAA" },
  { name: "__Secure-3PAPISID", value: "H_2IeDUX5Z7CckgN/AE-X-OcSmHhUDs0f2" },
  { name: "__Secure-3PSID", value: "g.a000qQixZWIZIFjTzOH_1mkOhpxby4XPdp1Z2AiERhCTm_8LbiAOH_kNy13Vac_jN7WTZYmkcAACgYKAZQSARQSFQHGX2MiJz7IWUCR5lBxtCsHDuABrhoVAUF8yKrYYUMHoWMYV64lM84nlN3V0076" },
  { name: "__Secure-3PSIDCC", value: "AKEyXzW0PwihqH43gSbj3hqqSl2AKr78AmCSpACv3Kh2Zj8QyuIeCiJhZ8db-4AeQ_0lhi2r" },
  { name: "__Secure-3PSIDTS", value: "sidts-CjEBQT4rXyk6eHqf1odJUs9PNgCgDZsI-1LVDp2Tl8sI6xpVEH5S_FLrCtg2W2vY9hCPEAA" },
  { name: "APISID", value: "tsKIe0XwubcRP9oF/AbUexFDZ4zgoi7UgO" },
  { name: "GPS", value: "1" },
  { name: "HSID", value: "AUIqc7JihwALVx4Jf" },
  { name: "LOGIN_INFO", value: "AFmmF2swRQIgZ_mcqDjlI0gs-TGrhgUMogyb-NMilC2Ty6oE48l15C0CIQCvPQZgfct3lKtuSPZYqzZ3WNs7ESJg6On2rY18z3Cqzw:QUQ3MjNmeHdVNTY5Z2hFUmFocGh6el9OZy1MLVduWUd0SC1vZnZqbXhYTmpONXg4M2tKXzJFTjItcVM5VE1pYkhrVWhYdWFweEg1QjdlSUxYancwZ3lrX21OSFRZTExweVBMWHhIZXVTU0Q0V2h6WWhHbHE0RG5sQzhiQkV6b3ZQbm5XRURYVUFyeTgyWEN1NnNuQktETGF5WlBsSnFuMUtB" },
  { name: "PREF", value: "f6=40000000&tz=Asia.Jakarta" },
  { name: "SAPISID", value: "H_2IeDUX5Z7CckgN/AE-X-OcSmHhUDs0f2" },
  { name: "SID", value: "g.a000qQixZWIZIFjTzOH_1mkOhpxby4XPdp1Z2AiERhCTm_8LbiAO9-MYA1dwrovJFMWWurfPPgACgYKAdkSARQSFQHGX2MiG0yi4bMkCiQPzU_oCHCXrhoVAUF8yKo7a0pZgQV27X-vytv7Tx6o0076" },
  { name: "SIDCC", value: "AKEyXzVDtlNl59Z9UD9H1JJ_YcKBFlDFYmB5HOV8H1njsTtQ0Q42zkY9EaEzspgvU-SIc3NQ" },
  { name: "SSID", value: "ABmcpOGj-7pqse2dW" }
]