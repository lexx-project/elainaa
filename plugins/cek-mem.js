// cek-mem.js
export const handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, '*Ketik Namanya!*', m);
  
  let mek = `
*––––––『 CEK - MEM 』––––––*
• Nama : ${text}
• Memek : ${pickRandom(['Ih item', 'Belang wkwk', 'Muluss', 'Putih Mulus', 'Black Doff', 'Pink wow', 'Item Glossy', 'Kusam', 'Bau tak sedap', 'Banyak bekas', 'Nggak terawat'])}
• Lubang : ${pickRandom(['Perawan', 'Udah dimasukin', 'Masih rapet', 'Tembem', 'Longgar', 'Kotor', 'Nggak menarik', 'Bau'])}
• Jembut : ${pickRandom(['Lebat', 'Ada sedikit', 'Gada jembut', 'Tipis', 'Mulus', 'Berantakan', 'Bau', 'Nggak terawat'])}
`.trim();

  conn.reply(m.chat, mek, m);
};

handler.help = ['cekmemek'];
handler.tags = ['fun'];
handler.command = /^cekmemek/i;
handler.limit = true;

export default handler; // Ekspor default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}