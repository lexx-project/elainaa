// cek-kontol.js
export const handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, 'Ketik Namanya Tolol!', m);
  
  conn.reply(m.chat, `
*––––––『 CEK - KON 』––––––*
• Nama : ${text}
• Kontol : ${pickRandom(['ih item', 'Belang wkwk', 'Muluss', 'Putih Mulus', 'Black Doff', 'Pink wow', 'Item Glossy', 'Kecil tapi berbobot', 'Raksasa', 'Besar dan gagah', 'Mini tapi menggoda'])}
• True : ${pickRandom(['perjaka', 'ga perjaka', 'udah pernah dimasukin', 'masih ori', 'jumbo', 'perawan', 'sudah berpengalaman', 'masih fresh', 'sudah banyak yang merasakan'])}
• Jembut : ${pickRandom(['lebat', 'ada sedikit', 'gada jembut', 'tipis', 'muluss', 'rambut halus', 'rambut keriting', 'rambut lurus', 'sangat lebat'])}
`.trim(), m);
};

handler.help = ['cekkontol <nama>'];
handler.tags = ['fun'];
handler.command = /^cekkontol/i;
handler.premium = false;

export default handler; // Ekspor default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}