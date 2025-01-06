let handler = async (m, { conn }) => {
    const packages = [
        { type: '15HARI', price: 'Rp 5.000', urlTag: '15Hari', bonus: '' },
        { type: '30HARI', price: 'Rp 10.000', urlTag: '30Hari', bonus: '' },
        { type: '45HARI', price: 'Rp 15.000', urlTag: '45Hari', bonus: '' },
        { type: '60HARI', price: 'Rp 20.000', urlTag: '60Hari', bonus: '' },
        { type: 'PERMANENT', price: 'Rp 30.000', urlTag: 'PERMANENT', bonus: '' },
        { type: 'SPESIAL PAKET', price: 'Rp 50.000', urlTag: 'Spesial Paket', bonus: 'Bonus sewa permanent' },
    ];

    let button = packages.map(pkg => ({
        header: `*PREMIUM🌀 ${pkg.type}*`,
        text: `- Harga: ${pkg.price}\n- Deskripsi: Nikmati pengalaman Premium Akses dengan bot kami. Dapatkan akses All Fiture , fitur eksklusif, dan dukungan penuh 24 jam.`,
        footer: `Bonus: ${pkg.bonus || 'Tidak ada bonus'}\nKlik di bawah untuk sewa.`,
        url: 'https://pomf2.lain.la/f/drjpdlpm.jpg',
        web: [{
            text: 'Owner',
            url: `http://Wa.me/6285879522174?text=Bang+Saya+Mau+Sewa+Botznya+${pkg.urlTag}`
        }]
    }));

    await conn.sendButtonSlide(m.chat, button, m, {
        footer: 'Hubungi Owner untuk info lebih lanjut',
        text: 'Owner ZEN OFFICIAL'
    });
}

handler.help = ['premium2'];
handler.tags = ['main'];
handler.command = /^(premium2)$/i;

export default handler;