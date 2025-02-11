import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Formato no soportado, verifica la lista de formatos disponibles.');
    }

    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id, title, info } = response.data;
        const { image } = info;
        const downloadUrl = await ddownr.cekProgress(id);
        return { id, image, title, downloadUrl };
      } else {
        throw new Error('Fallo al obtener los detalles del video.');
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
};

const handler = async (m, { conn, text }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🍬 Ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const infoMessage = `🎬 *Título:* ${title}\n\n⏱ *Duración:* ${timestamp}\n👀 *Vistas:* ${vistas}\n📆 *Publicado:* ${ago}\n🔗 *Enlace:* ${url}`;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const buttons = [
      { buttonId: `/ytmp3 ${url}`, buttonText: { displayText: '🎵 Descargar Audio' }, type: 1 },
      { buttonId: `/ytmp4 ${url}`, buttonText: { displayText: '📹 Descargar Video' }, type: 1 },
    ];

    const messageOptions = {
      text: infoMessage,
      footer: 'Starling by Zaphkiel',
      buttons: buttons,
      headerType: 4, // Para usar imagen
      image: { url: thumbnail },
    };

    await conn.sendMessage(m.chat, messageOptions);

  } catch (error) {
    console.error('Error en el comando:', error);
    return m.reply(`⚠️ *Error:* ${error.message}`);
  }
};

handler.command = ['playp', 'play2p', 'ytmp3', 'yta', 'ytmp4', 'ytv'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  return views >= 1000 ? (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')' : views.toString();
}