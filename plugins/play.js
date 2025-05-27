import { youtube } from "@xct007/frieren-scraper";
import axios from 'axios';

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
        throw new Error('Format tidak didukung, periksa kembali daftar format yang tersedia.');
    }

    const config = {
        method: 'GET',
        url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };

    try {
        const response = await axios.request(config);

        if (response.data && response.data.success) {
            const { id, title, info } = response.data;
            const { image } = info;
            const downloadUrl = await ddownr.cekProgress(id);

            return {
                id: id,
                image: image,
                title: title,
                downloadUrl: downloadUrl
            };
        } else {
            throw new Error('Gagal mendapatkan detail video.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
        method: 'GET',
        url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };

    try {
        while (true) {
            const response = await axios.request(config);

            if (response.data && response.data.success && response.data.progress === 1000) {
                return response.data.download_url;
            }           
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args.length < 1) {
        return m.reply(`Masukkan query lagu atau video!\n\nContoh:\n${usedPrefix + command} Grand Escape\n${usedPrefix + command} audio Grand Escape\n${usedPrefix + command} video Grand Escape`);
    }

    const type = args[0].toLowerCase() === 'audio' || args[0].toLowerCase() === 'video' ? args[0].toLowerCase() : 'play';
    const query = type === 'audio' || type === 'video' ? args.slice(1).join(' ') : args.join(' ');

    try {
        // Mencari video berdasarkan query
        const searchResults = await youtube.search(query);
        const video = searchResults?.[0]; // Ambil hasil pertama
        if (!video) {
            return m.reply('Video tidak ditemukan.');
        }

        const { title, url, duration, views, uploaded } = video || {};
        if (!url || !title) {
            return m.reply('Data video tidak lengkap, silakan coba query lain.');
        }

        const thumbnail = video.thumbnail || '';

        if (type === 'play' || type === 'audio') {
            // Mengunduh audio
            const audioData = await ddownr.download(url, 'mp3').catch(() => null); // Download audio in MP3 format
            if (!audioData?.downloadUrl) {
                return m.reply('Gagal mendapatkan data audio, coba lagi nanti.');
            }

            const descriptionMessage = `*––––––『 Y T - P L A Y 』––––––*\n\n🎧 *Title:* ${title}\n📤 *Published:* ${uploaded}\n⏰ *Duration:* ${duration}\n👁️ *Views:* ${views}\n\n🔗 *Url:* ${url}\n\n*L O A D I N G. . .*`;
            await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', descriptionMessage, m);

            await conn.sendMessage(m.chat, {
                audio: { url: audioData.downloadUrl },
                mimetype: 'audio/mpeg',
                fileName: `${title || 'audio'}.mp3`
            }, { quoted: m });
        } else if (type === 'video') {
            // Mengunduh video dengan kualitas 720p
            const videoData = await ddownr.download(url, '720').catch(() => null); // Download video in 720p
            if (!videoData?.downloadUrl) {
                return m.reply('Gagal mendapatkan data video, coba lagi nanti.');
            }

            const descriptionMessage = `*––––––『 Y T - P L A Y 』––––––*\n\n🎧 *Title:* ${title}\n📤 *Published:* ${uploaded}\n⏰ *Duration:* ${duration}\n👁️ *Views:* ${views}\n\n🔗 *Url:* ${url}\n\n*L O A D I N G. . .*`;
            await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', descriptionMessage, m);
            await conn.sendFile(m.chat, videoData.downloadUrl, `${title}_720p.mp4`, '', m);
        } else {
            return m.reply(`Tipe tidak valid! Gunakan 'audio', 'video', atau 'play'.`);
        }
    } catch (error) {
        console.error('Error:', error);
        return m.reply('Terjadi kesalahan saat memproses permintaan. Pastikan query benar dan coba lagi nanti.');
    }
};

handler.help = ['play'].map(v => v + ' <type> <query>');
handler.tags = ['downloader'];
handler.command = /^play$/i;
handler.limit = true;
export default handler;
