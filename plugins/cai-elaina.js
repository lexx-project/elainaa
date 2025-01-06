let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);   
  let ouh = await fetch(`https://skizoasia.xyz/api/openai?apikey=zenOfficial&text=${text}&system=Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Elaina, dan kamu adalah karakter dari Anime Majo no Tabitabi. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat baik hati dan suka membantu`)
  let gyh = await ouh.json() 
  await conn.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'Elaina - Ashen Witch',
        body: 'E L A I N A  -  A I',
        thumbnailUrl: 'https://pomf2.lain.la/f/b017mxhv.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VakQMx8Ae5VrlANBXQ1Y',
        mediaType: 1,
        renderLargerThumbnail: false, 
        showAdAttribution: true
      }}
  })}
handler.command = /^(caielaina|elaina|papan)$/i
handler.help = ['caielaina']
handler.tags = ['ai']
handler.premium = false

export default handler;