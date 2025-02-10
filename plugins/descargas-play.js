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
    const infoMessage = `🎬 *${title}*\n📏 Duración: *${timestamp || "00:00"}*\n👀 Vistas: *${vistas}*\n📺 Canal: *${author?.name || "Desconocido"}*\n📆 Publicado: *${ago || "Desconocido"}*\n🔗 [Ver en YouTube](${url})`;

    console.log("📩 Enviando mensaje sin botones para probar...");

    // PRIMERO PROBAMOS SIN BOTONES
    await conn.sendMessage(m.chat, { text: infoMessage }, { quoted: m });

    console.log("✅ Mensaje básico enviado con éxito.");

    // SI FUNCIONA, PROBAMOS CON BOTONES
    const buttons = [
      { buttonId: `.musica ${url}`, buttonText: { displayText: "🎼 AUDIO 🎼" }, type: 1 },
      { buttonId: `.video ${url}`, buttonText: { displayText: "🎬 VIDEO 🎬" }, type: 1 },
      { buttonId: `.menu`, buttonText: { displayText: "📘 MENU 📘" }, type: 1 },
    ];

    const buttonMessage = {
      text: infoMessage,
      footer: "𝙲𝙾𝚁𝚃𝙰𝙽𝙰 𝟸.𝟶",
      buttons: buttons,
      headerType: 1, // Cambiado a 1 para evitar errores
      mentions: [m.sender],
    };

    console.log("📩 Enviando mensaje con botones...");

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

    console.log("✅ Mensaje con botones enviado con éxito.");

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