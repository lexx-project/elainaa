const handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    const cooldownTime = 3600000; // 1 jam dalam milidetik

    // Cek jika pengguna sudah menggunakan perintah dalam satu jam
    if (new Date - user.lastlont < cooldownTime) {
        let remainingTime = cooldownTime - (new Date - user.lastlont);
        let timers = clockString(remainingTime);
        return conn.reply(m.chat, `*Kamu Sudah Kecapekan*\n*Silahkan Istirahat Dulu Selama* ${timers}`, m);
    }

    // Mengupdate saldo money
    const rewardMoney = 250000;

    // Mengirim pesan awal
    let waitMessage = await conn.sendMessage(m.chat, { text: 'Mencari pelanggan...' }, { quoted: m });

    // Fungsi untuk mengedit pesan
    async function editMessage(newText) {
        await conn.sendMessage(m.chat, { text: newText, edit: waitMessage.key }, { quoted: m });
    }

    // Fungsi untuk menunggu
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    // Menunggu 3 detik sebelum mengedit pesan
    await delay(3000);
    await editMessage('Mendapatkan pelanggan dan pergi ke hotel...');

    await delay(3000);
    await editMessage('Kamu mulai melakukan skidipapap...');

    await delay(3000);
    await editMessage('Ahhh ahhh ahhhh kimochi...');

    await delay(3000);
    await editMessage('Kamu dipaksa melayaninya 24 jam...');

    await delay(3000);
    
    // Mengupdate saldo money dan mengirimkan hasil akhir
    user.money += rewardMoney;
    await editMessage(`Kamu terbaring lemas karena telah melakukan skidipapap dengannya selama 24 jam, tetapi kamu mendapatkan:\nUang: Rp.${rewardMoney}`);

    // Mengupdate waktu terakhir melakukan aksi
    user.lastlont = new Date * 1;
};

// Fungsi untuk mengonversi milidetik ke format waktu
function clockString(ms) {
    let h = Math.floor(ms / 3600000) % 24;
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return `${h.toString().padStart(2, '0')} Jam ${m.toString().padStart(2, '0')} Menit ${s.toString().padStart(2, '0')} Detik`;
}

handler.help = ['ngelont'];
handler.tags = ['rpg'];
handler.command = /^(ngelont)$/i;
handler.group = true;

export default handler;