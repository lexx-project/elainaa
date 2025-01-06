import axios from 'axios';
import { Sticker } from 'stickers'; // Pastikan Anda memiliki paket ini

const handler = async (m, args, sendMessage) => {
    const text = args.join(" "); // Menggabungkan argumen menjadi satu string

    if (!text) {
        return sendMessage(m.chat, {
            text: "Gunakan perintah ini dengan format:\n\n*contoh .brat2 <teks>*",
        }, { quoted: m });
    }

    try {
        await sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
        const url = `https://apii.ambalzz.biz.id/api/sticker/brat?text=${encodeURIComponent(text)}`;
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const sticker = new Sticker(response.data, {
            pack: "Stiker By",
            author: "Shikimori Asistent",
            type: "image/png",
        });
        const stikerBuffer = await sticker.toBuffer();
        await sendMessage(m.chat, { sticker: stikerBuffer }, { quoted: m });
    } catch (err) {
        console.error("Error:", err);
        await sendMessage(m.chat, {
            text: "Maaf, terjadi kesalahan saat mencoba membuat stiker brat. Coba lagi nanti.",
        }, { quoted: m });
    }
};

// Menambahkan help, tags, dan command
handler.help = ['brat <text>'];
handler.tags = ['sticker'];
handler.command = /^(brat2)$/i;

export default handler;