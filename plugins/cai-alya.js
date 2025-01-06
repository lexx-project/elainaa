let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);   
  let ouh = await fetch(`https://skizoasia.xyz/api/openai?apikey=zenOfficial&text=${text}&system=Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Alya Kujou, dan kamu adalah karakter dari Anime Alya Sometimes Hides Her Feelings in Russian. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat baik hati dan suka membantu`)
  let gyh = await ouh.json() 
  await conn.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'Alya - Kujou',
        body: 'E L A I N A  J E S S',
        thumbnailUrl: 'https://pomf2.lain.la/f/kkayimf3.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029Vaiy0J69WtCBOqbDfd3n',
        mediaType: 1,
        renderLargerThumbnail: false, 
        showAdAttribution: true
      }}
  })}
handler.command = /^(caialya)$/i
handler.help = ['caialya']
handler.tags = ['premium', 'ai']
handler.premium = true

export default handler;