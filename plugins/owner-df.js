import { tmpdir } from 'os'
import path, { join } from 'path'
import {
    readdirSync,
    statSync,
    unlinkSync,
    existsSync,
    readFileSync,
    watch
} from 'fs'
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text, usedPrefix, command }) => {
    let setting = global.db.data.settings[conn.user.jid]
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) return m.reply(`uhm.. where the text?\n\nexample:\n${usedPrefix + command} info`)
    if (!ar1.includes(args[0])) return conn.sendMessage(m.chat, { text: `${setting.smlcap ? conn.smlcap("*🗃️ NOT FOUND!*") : "*🗃️ NOT FOUND!"}\n==================================\n\n${ar1.map(v => ' ' + v).join`\n`}` }, { quoted: m })
    const file = join(__dirname, '../plugins/' + args[0] + '.js')
    unlinkSync(file)
    conn.reply(m.chat, `Succes deleted "plugins/${args[0]}.js"`, m)

}
handler.help = ['deletefile']
handler.tags = ['owner']
handler.command = /^(df|deletefile)$/i

handler.mods = true

export default handler