import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🍬 Ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0] || {};
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;

    if (!title || !url) return m.reply('❌ No se pudo obtener información del video.');

    const vistas = formatViews(views || 0);
    const thumb = thumbnail || 'https://via.placeholder.com/300';  // Miniatura por defecto

    const infoMessage = `🎬 *${title}*\n📏 Duración: *${timestamp || '00:00'}*\n👀 Vistas: *${vistas}*\n📺 Canal: *${author?.name || 'Desconocido'}*\n📆 Publicado: *${ago || 'Desconocido'}*\n🔗 [Ver en YouTube](${url})`;

    const buttons = [
      { buttonId: `.musica ${url}`, buttonText: { displayText: "🎼 AUDIO 🎼" }, type: 1 },
      { buttonId: `.video ${url}`, buttonText: { displayText: "🎬 VIDEO 🎬" }, type: 1 },
      { buttonId: `.menu`, buttonText: { displayText: "📘 MENU 📘" }, type: 1 },
    ];

    await conn.sendMessage(m.chat, { 
      image: { url: thumb },
      caption: infoMessage,
      footer: "𝙲𝙾𝚁𝚃𝙰𝙽𝙰 𝟸.𝟶",
      buttons: buttons,
      viewOnce: true,
      headerType: 4,
      mentions: [m.sender],
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    return m.reply(`⚠️ Error: ${error.message || 'Ocurrió un problema.'}`);
  }
};

handler.command = ['pruebap'];  
handler.tags = ['downloader'];
handler.help = ['pruebap'];

export default handler;

function formatViews(views) {
  return views >= 1000 ? (views / 1000).toFixed(1) + 'k' : views.toString();
}