import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* .celaina *[on/off]*`;

  if (text === "on") {
    conn.alyatsundere = conn.alyatsundere || {};
    conn.alyatsundere[m.sender] = true;
    m.reply("[ ✓ ] Success create session chat");
  } else if (text === "off") {
    if (conn.alyatsundere && conn.alyatsundere[m.sender]) {
      delete conn.alyatsundere[m.sender];
      m.reply("[ ✓ ] Success delete session chat");
    }
  }
};

handler.before = async (m, { conn }) => {
  conn.alyatsundere = conn.alyatsundere || {};

  if (m.isBaileys && m.fromMe) return;
  if (!m.text || !conn.alyatsundere[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  try {
    const response = await fetch(`https://skizoasia.xyz/api/openai?apikey=zenOfficial&text=${encodeURIComponent(m.text)}&system=Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Elaina, dan kamu adalah karakter dari Anime Majo no Tabitabi. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat baik hati dan suka membantu, kamu adalah istrinya Alip, kamu sangat menyayangi Alip dan sangat mencintai Alip, kamu tidak akan berselingkuh dari Alip, kamu sangat mencintai Alip, Alip adalah seorang raja iblis yang baik hati, kamu memanggil Alip dengan kata Alip, sayang dan Alip-kun, kamu dan Alip menikah pada tanggal 29 Juli 2019`);
    
const data = await response.json();
    await conn.sendMessage(m.chat, {text: `${data.result}`,
    contextInfo: {
      externalAdReply: {
        title: 'Elaina - Ashen Witch',
        body: 'E L A I N A  -  A I',
        thumbnailUrl: 'https://pomf2.lain.la/f/pwj4yszb.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VakQMx8Ae5VrlANBXQ1Y',
        mediaType: 1,
        renderLargerThumbnail: false, 
        showAdAttribution: true
      }
    }
  }, {quoted: m})
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

handler.command = ['celaina'];
handler.tags = ["ai"];
handler.help = ['celaina'].map(a => a + " *[on/off]*");
handler.owner = true

export default handler