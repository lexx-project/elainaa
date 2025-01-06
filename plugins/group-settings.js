let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { 
        'open': 'not_announcement',
        'close': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)
        return m.reply(`
*Format Salah! Contoh :*
  *${usedPrefix + command} close*
  *${usedPrefix + command} open*
`.trim())
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group']
handler.tags = ['group']
handler.command = /^(g|group|elainagc)$/i

handler.admin = true
handler.botAdmin = true

export default handler