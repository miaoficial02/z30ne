import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, text, command }) => {
  try {
    console.log(`🔍 Comando ejecutado: ${command}`);
    console.log(`📩 Mensaje recibido: ${text}`);

    if (!text.trim()) {
      return conn.reply(m.chat, "⚠️ Ingresa el nombre de la música a buscar.", m);
    }

    console.log("🔎 Buscando en YouTube...");
    const search = await yts(text);

    if (!search.all || search.all.length === 0) {
      console.log("❌ No se encontraron resultados.");
      return m.reply("No se encontraron resultados para tu búsqueda.");
    }

    const videoInfo = search.all[0] || {};
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;

    console.log("🎬 Video encontrado:", title);

    const vistas = formatViews(views || 0);
    const thumb = thumbnail || "https://via.placeholder.com/300"; // Miniatura por defecto

    const infoMessage = `🎬 *${title}*\n📏 Duración: *${timestamp || "00:00"}*\n👀 Vistas: *${vistas}*\n📺 Canal: *${author?.name || "Desconocido"}*\n📆 Publicado: *${ago || "Desconocido"}*\n🔗 [Ver en YouTube](${url})`;

    console.log("📩 Enviando mensaje...");
    await conn.sendMessage(m.chat, { 
      text: infoMessage
    }, { quoted: m });

    console.log("✅ Mensaje enviado con éxito.");

  } catch (error) {
    console.error("⚠️ Error:", error);
    return m.reply(`⚠️ Error: ${error.message || "Ocurrió un problema."}`);
  }
};

handler.command = ['pruebap'];
handler.tags = ['downloader'];
handler.help = ['pruebap'];

export default handler;

function formatViews(views) {
  return views >= 1000 ? (views / 1000).toFixed(1) + "k" : views.toString();
}