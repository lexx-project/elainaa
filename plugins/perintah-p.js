const handler = async (m, { conn }) => {
    const responseText = "papepape salam kocakk!!"; // Teks yang akan dikirim
    conn.sendMessage(m.chat, { text: responseText }, { quoted: m });
  };
  
  handler.customPrefix = /^p$/i; // Mengatur prefix untuk huruf "p"
  handler.command = new RegExp(); // Mengatur command untuk regex kosong
  export default handler;