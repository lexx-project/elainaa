let handler = async (m, { conn, text }) => {
    // Memastikan teks tidak kosong
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: 'Penggunaan: .siapakah (masukkan teks)\nContoh: .siapakah orang terganteng',
        }, { quoted: m });
    }

    // Mengambil daftar anggota grup
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;

    // Memilih anggota secara acak
    const randomMember = participants[Math.floor(Math.random() * participants.length)];

    // Mengirim pesan dengan menyebut anggota
    await conn.sendMessage(m.chat, {
        text: `${text} adalah @${randomMember.id}`,
        mentions: [randomMember.id] // Menyebut anggota yang dipilih
    }, { quoted: m });
};

// Menambahkan informasi tentang perintah
handler.help = ['siapakah <text>'];
handler.tags = ['fun'];
handler.command = /^(siapakah)$/i;

export default handler;