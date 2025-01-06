let handler = async (m, { conn }) => {
  const packages = [
    { type: '10HARI', price: 'Rp 5.000', urlTag: '10Hari', bonus: '' },
    { type: '20HARI', price: 'Rp 10.000', urlTag: '20Hari', bonus: '' },
    { type: '30HARI', price: 'Rp 15.000', urlTag: '30Hari', bonus: '' },
    { type: '40HARI', price: 'Rp 20.000', urlTag: '40Hari', bonus: '' },
    { type: 'PERMANENT', price: 'Rp 30.000', urlTag: 'PERMANENT', bonus: '' },
    { type: 'SPESIAL PAKET', price: 'Rp 50.000', urlTag: 'Spesial Paket', bonus: 'Bonus sewa permanent' },
  ];

  let button = packages.map((pkg) => ({
    text: `Sewa ${pkg.type}`,
    url: `(link unavailable),
  }));

  const caption = `Pilih paket sewa:\n\n` + packages.map((pkg, index) => `• ${pkg.type}: ${pkg.price} (${pkg.bonus || 'Tidak ada bonus'})`).join('\n');

  await conn.sendMessage(m.chat, { text: caption, buttons: button, footer: 'Hubungi Owner untuk info lebih lanjut' }, { quoted: m });
};

handler.help = ['sewa2'];
handler.tags = ['main'];
handler.command = /^(sewa2)$/i;

export default handler;
