import fs from 'fs'; // Pastikan untuk mengimpor fs jika belum

let alreadySent = new Set(); // Set untuk menyimpan ID pengguna yang telah menerima pesan
let commandCount = 0; // Variabel untuk menyimpan jumlah command yang diterima
let lastResetDate = new Date().toDateString(); // Menyimpan tanggal reset terakhir

const handler = async (m, { conn, usedPrefix, url, title = 'Default Title', thumbnail }) => {
  // Reset jumlah command jika sudah hari baru
  const currentDate = new Date().toDateString();
  if (currentDate !== lastResetDate) {
    commandCount = 0; // Reset jumlah command
    lastResetDate = currentDate; // Update tanggal reset terakhir
  }

  commandCount++; // Increment jumlah command yang diterima

  if (alreadySent.has(m.sender)) {
    return; // Cegah pengiriman ganda untuk pengguna ini
  }

  alreadySent.add(m.sender); // Tandai pengguna ini sebagai sudah menerima pesan

  const userName = m.pushName || 'Bolo';

  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Selamat Pagi';
  } else if (currentHour < 18) {
    greeting = 'Selamat Siang';
  } else {
    greeting = 'Selamat Malam';
  }

  // Mendapatkan ukuran database
  const databasePath = 'database.json'; // Nama file database tanpa path
  let dbSizeMB = 0;
  try {
    const stats = fs.statSync(databasePath);
    dbSizeMB = (stats.size / (1024 * 1024)).toFixed(2); // Mengonversi bytes ke MB
  } catch (error) {
    console.error('Kesalahan saat mendapatkan ukuran database:', error);
    dbSizeMB = 'N/A'; // Jika terjadi kesalahan, set ukuran menjadi 'N/A'
  }

  const botInfo = `
${greeting}, ${userName}
Perkenalkan, saya adalah LEXX BOT AI. Silakan lihat daftar menu di bawah ini untuk mengetahui berbagai fitur yang dapat saya lakukan.

INFO BOT
▧ Name : LEXX BOT AI
▧ Owner : 62882009391607
▧ Database : Local (${dbSizeMB} MB)
▧ Total Fitur : 479
▧ Command Today : ${commandCount} 
▧ Rating Bot : NaN/5.00 ( 0 Users )

`; // Tambahkan baris kosong di sini

  const menuList = `
❏┄┅━┅┄〈 〘 LIST MENU 〙
┊▧ *${usedPrefix}menuall*
┊▧ *${usedPrefix}menumain*
┊▧ *${usedPrefix}menutopup*
┊▧ *${usedPrefix}menuai*
┊▧ *${usedPrefix}menugame*
┊▧ *${usedPrefix}menurpg*
┊▧ *${usedPrefix}menuxp*
┊▧ *${usedPrefix}menusticker*
┊▧ *${usedPrefix}menukerang*
┊▧ *${usedPrefix}menuquotes*
┊▧ *${usedPrefix}menufun*
┊▧ *${usedPrefix}menuanime*
┊▧ *${usedPrefix}menugroup*
┊▧ *${usedPrefix}menupremium*
┊▧ *${usedPrefix}menunsfw*
┊▧ *${usedPrefix}menuinternet*
┊▧ *${usedPrefix}menugenshin*
┊▧ *${usedPrefix}menunews*
┊▧ *${usedPrefix}menudownloader*
┊▧ *${usedPrefix}menusearch*
┊▧ *${usedPrefix}menutools*
┊▧ *${usedPrefix}menuprimbon*
┊▧ *${usedPrefix}menunulis*
┊▧ *${usedPrefix}menuaudio*
┊▧ *${usedPrefix}menumaker*
┊▧ *${usedPrefix}menudatabase*
┊▧ *${usedPrefix}menuquran*
┊▧ *${usedPrefix}menuowner*
┊▧ *${usedPrefix}menuinfo*
┊▧ *${usedPrefix}menusound*
┗━═┅═━━┅┄๑
`;

  try {
    const caption = botInfo + menuList.trim();
    const thumbnailPath = './media/thumbnail.jpg';
    const thumbnailData = fs.existsSync(thumbnailPath) ? await conn.getFile(thumbnailPath) : null;

    const options = [
      [`${usedPrefix}menuall`, "1"],
      [`${usedPrefix}menumain`, "2"],
      [`${usedPrefix}menutopup`, "3"],
      [`${usedPrefix}menuai`, "4"],
      [`${usedPrefix}menugame`, "5"],
      [`${usedPrefix}menurpg`, "6"],
      [`${usedPrefix}menuxp`, "7"],
      [`${usedPrefix}menusticker`, "8"],
      [`${usedPrefix}menukerang`, "9"],
      [`${usedPrefix}menuquotes`, "10"],
      [`${usedPrefix}menufun`, "11"],
      [`${usedPrefix}menuanime`, "12"],
      [`${usedPrefix}menugroup`, "13"],
      [`${usedPrefix}menupremium`, "14"],
      [`${usedPrefix}menunsfw`, "15"],
      [`${usedPrefix}menuinternet`, "16"],
      [`${usedPrefix}menugenshin`, "17"],
      [`${usedPrefix}menunews`, "18"],
      [`${usedPrefix}menudownloader`, "19"],
      [`${usedPrefix}menusearch`, "20"],
      [`${usedPrefix}menutools`, "21"],
      [`${usedPrefix}menuprimbon`, "22"],
      [`${usedPrefix}menunulis`, "23"],
      [`${usedPrefix}menuaudio`, "24"],
      [`${usedPrefix}menumaker`, "25"],
      [`${usedPrefix}menudatabase`, "26"],
      [`${usedPrefix}menuquran`, "27"],
      [`${usedPrefix}menuowner`, "28"],
      [`${usedPrefix}menuinfo`, "29"],
      [`${usedPrefix}menusound`, "30"],
    ];

    await conn.textOptions(m.chat, caption, false, options, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: false,
          mediaType: 1,
          title: title.trim(),
          body: null,
          thumbnail: thumbnailData ? thumbnailData.data : null,
          renderLargerThumbnail: true,
          mediaUrl: url,
          sourceUrl: url
        }
      }
    });
  } catch (e) {
    await conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan.`, m);
  } finally {
    setTimeout(() => {
      alreadySent.delete(m.sender); // Hapus pengguna dari set setelah 30 detik
    }, 30000);
  }
};

// Pastikan handler ini tidak dihapus
handler.command = /^(menu)$/i;

export default handler;