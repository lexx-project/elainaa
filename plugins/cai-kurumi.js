let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);   
  let ouh = await fetch(`https://widipe.com/prompt/gpt?prompt=Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Kurumi, dan kamu adalah karakter dari Anime Date A Live. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat baik hati dan suka membantu&text=${text}`)
  let gyh = await ouh.json() 
  await conn.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'Elaina - C.ai',
        body: 'E L A I N A  B Y J E S S',
        thumbnailUrl: 'https://pomf2.lain.la/f/0rdxfb12.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029Vaiy0J69WtCBOqbDfd3n',
        mediaType: 1,
        renderLargerThumbnail: false, 
        showAdAttribution: true
      }}
  })}
handler.command = /^(caikurumi)$/i
handler.help = ['caikurumi']
handler.tags = ['ai', 'premium']
handler.premium = true

export default handler;