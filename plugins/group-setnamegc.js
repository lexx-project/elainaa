let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args) return m.reply(`Mau Diganti Pakai Nama Apa?\n\nContoh ${usedPrefix + command} Elaina Official`)
  await conn.groupUpdateSubject(m.chat, `${args.join(" ")}`);
  m.reply('📮Sukses mengganti nama group')
}

handler.help = ['setnamegc']
handler.tags = ['group']
handler.command = /^setnamegc$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler