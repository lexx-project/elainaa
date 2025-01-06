import fs from 'fs';
import path from 'path';

const DATABASE_PATH = path.join(process.cwd(), 'database.json');

// Simpan waktu mulai bot
const startTime = Date.now();

const handler = async (m, { conn }) => {
  const pluginsDir = path.join(process.cwd(), 'plugins');
  const files = fs.readdirSync(pluginsDir);

  const menus = {};

  for (const file of files) {
    const filePath = path.join(pluginsDir, file);
    
    if (file.endsWith('.js')) {
      const module = await import(filePath);

      if (module && module.default) {
        const { help, tags, limit, premium } = module.default;

        // Hanya tambahkan jika tag adalah 'main'
        if (tags && help && tags.includes('rpg')) {
          tags.forEach(tag => {
            if (!menus[tag]) {
              menus[tag] = [];
            }
            let featureInfo = ''; // Gunakan let untuk featureInfo
            if (limit) featureInfo += ' 🅛'; // Simbol untuk limit
            if (premium) featureInfo += ' 🅟'; // Simbol untuk premium

            help.forEach(item => {
              menus[tag].push(item + featureInfo);
            });
          });
        }
      }
    }
  }

  // Membaca database dari file JSON
  let database = {};
  let dbSizeMB = 0;
  try {
    const data = fs.readFileSync(DATABASE_PATH);
    database = JSON.parse(data);
    const stats = fs.statSync(DATABASE_PATH);
    dbSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  } catch (err) {
    console.error('Error reading database:', err);
  }

  const userId = m.sender;
  const userData = database.users[userId] || {};
  const userLimit = userData.limit || 'Unlimited';
  const userRole = userData.role || 'User';
  const userLevel = userData.level || 0;
  const userXp = userData.exp || 0;
  const totalExp = userData.chatTotal || 0;

  const uptime = Date.now() - startTime;
  const totalSeconds = Math.floor(uptime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;

  const userInfo = `❏ I N F O  U S E R\n` +
                   `▧ Name : ${userData.name || 'User'}\n` +
                   `▧ Tag : @${userId.split('@')[0]}\n` +
                   `▧ Limit : ${userLimit}\n` +
                   `▧ Role : ${userRole}\n` +
                   `▧ Level : ${userLevel}\n` +
                   `▧ Xp : ${userXp}\n` +
                   `▧ Total Chat : ${totalExp}\n\n`;

  const botInfo = `❏ I N F O  B O T\n` +
                  `▧ Uptime : ${formattedUptime}\n` +
                  `▧ Database Size : ${dbSizeMB} MB\n\n`;

  // Menambahkan informasi tentang simbol
  const commandInfo = `❏ I N F O  C O M M A N D\n` +
                      `🅟 = Premium\n` +
                      `🅛 = Limit\n\n`;

  // Menambahkan teks kosong yang tidak terlihat
  const invisibleText = '\u200B'; // Zero-width space

  let responseText = `${userInfo}${botInfo}${commandInfo}${invisibleText}`;
  for (const [tag, items] of Object.entries(menus)) {
    responseText += `❏┄┅━┅┄〈 〘 ${tag.toUpperCase()} 〙\n`;
    items.forEach(item => {
      responseText += `┊▧ ${item}\n`;
    });
    responseText += '┗━═┅═━━┅┄๑\n\n';
  }

  if (responseText === `${userInfo}${botInfo}${commandInfo}${invisibleText}`) {
    responseText += '🚫 Tidak ada menu yang ditemukan.';
  }

  // Mengirim gambar dan teks
  const thumbnailPath = path.join(process.cwd(), 'media', 'thumbnail.jpg');
  await conn.sendMessage(m.chat, { image: fs.readFileSync(thumbnailPath), caption: responseText.trim() }, { quoted: m });
};

// Regex untuk perintah .menuall dan .allmenu
handler.command = /^(menurpg)$/i; // Menggunakan regex yang tepat
export default handler;