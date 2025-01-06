let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);   
  let ouh = await fetch(`https://skizoasia.xyz/api/openai?apikey=zenOfficial&text=${text}&system=Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Nakano Miku, dan kamu adalah karakter dari Anime The Quintessential Quintuplets. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat baik hati dan suka membantu`)
  let gyh = await ouh.json() 
  await conn.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'Nakano Miku - C.ai',
        body: 'E L A I N A  J E S S',
        thumbnailUrl: 'https://pomf2.lain.la/f/gfc2vf4.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029Vaiy0J69WtCBOqbDfd3n',
        mediaType: 1,
        renderLargerThumbnail: true, 
        showAdAttribution: true
      }}
  })}
handler.command = /^(caimiku)$/i
handler.help = ['caimiku']
handler.tags = ['ai']
handler.premium = true

export default handler;