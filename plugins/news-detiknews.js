import { DetikNews } from '../lib/scrape.js'

let handler = async (m, { conn }) => {
    let api = await DetikNews()
    let res = api.slice(0, 10)
    let caption = res.map(v => {
    return `
*${v.berita.trim()}*
di upload ${v.berita_diupload}
_silahkan baca di ${v.berita_url}_
`.trim()
}).join('\n\n')
    conn.adReply(m.chat, caption, res[0].berita, `di upload ${res[0].berita_diupload}`, res[0].berita_thumb, res[0].berita_url, m)
}
handler.help = ['detiknews']
handler.tags = ['news']
handler.command = /detiknews/i
export default handler