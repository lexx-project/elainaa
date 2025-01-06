let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    if (!isOwner) return m.reply('Perintah Ini Khusus Owner!') // Cek owner
    
    let target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    
    if (!target) return m.reply(`Tag User Atau Masukan Nomornya\n\nContoh :\n${usedPrefix + command} @${m.sender.split('@')[0]} 4`, false, { mentions: [m.sender] })
    
    let user = global.db.data.users[target]
    if (args[1]) {
        if (isNaN(args[1])) return m.reply('Hanya Angka!')
        m.reply(`Sukses Membanned @${target.split('@')[0]} Selama ${args[1]} Hari`, false, { mentions: [target] })
        let jumlahHari = 86400000 * args[1]
        user.bannedTime = Math.max(Date.now(), user.bannedTime) + jumlahHari
        user.banned = true
    } else {
        m.reply(`Sukses Membanned @${target.split('@')[0]}`, false, { mentions: [target] })
        user.bannedTime = 17
        user.banned = true
    }
}

handler.help = ['banned']
handler.tags = ['group'] 
handler.command = /^(ban(user)?|banned(user)?)$/i
handler.owner = true // Set owner true
handler.admin = false

export default handler