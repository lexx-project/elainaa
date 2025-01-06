import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return conn.reply(m.chat, `Masukan Text Yang Ingin Dicari\n\nContoh :\n${usedPrefix + command} Kapan Google Dibuat`, m)
        await global.loading(m, conn)
        let url = 'https://google.com/search?q=' + encodeURIComponent(text)
        let { data } = await axios.get(API("https://api.lolhuman.xyz", "/api/gsearch", { query: text }, "apikey"))
        let caption = data.result.map((v, i) => {
            return `*${i + 1}. ${v.title}* \n• _${v.desc.replace(/�/g, "")}_ \n• ${v.link}`.trim()
        }).join("\n\n")
        conn.adReply(m.chat, caption, data.result[0].title, data.result[0].desc, "https://pomf2.lain.la/f/yd8rj0u4.jpg", data.result[0].link, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['google']
handler.tags = ['internet']
handler.command = /^google$/i
handler.limit = true
export default handler