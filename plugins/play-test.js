import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    // Verificación de si hay un término de búsqueda proporcionado.
    if (!text) {
        return conn.reply(m.chat, `🚩 Ingrese el nombre del video de YouTube a buscar.\nEjemplo: ${usedPrefix}${command} Bad Bunny Neverita`, m);
    }
    
    await m.react('⏱️');
    try {
        // Busca el video usando el término proporcionado
        let search = await yts(text);
        if (!search || search.all.length === 0) {
            return conn.reply(m.chat, `*Video no encontrado!* ☹️`, m);
        }

        let { videoId, image, title, views, duration, author, ago, url, description } = search.all[0];
        
        // Crear el mensaje con la información del video.
        let caption = `*\`- Y O U T U B E - A U D I O -\`*\n\n`;
        caption += `🆔 ID: ${videoId}\n`;
        caption += `💬 Título: ${title}\n`;
        caption += `📺 Vistas: ${views}\n`;
        caption += `⏰ Duración: ${duration.timestamp}\n`;
        caption += `▶️ Canal: ${author.name}\n`;
        caption += `📆 Subido: ${ago}\n`;
        caption += `🔗 URL Video: ${url}\n`;
        caption += `📝 Descripción: ${description}`;

        // Enviar la información del video
        await conn.sendMessage(m.chat, {
            image: { url: image },
            caption: caption
        }, { quoted: m });

        // Obtener el audio de la API
        const audioResponse = await fetchJson(`https://api.khaliddesu.my.id/api/savetube?url=${url}&type=audio`);
        if (!audioResponse || !audioResponse.result) {
            return conn.reply(m.chat, `*Audio no encontrado. Intente de nuevo más tarde.* 🙏`, m);
        }

        // Enviar el audio
        await conn.sendMessage(m.chat, {
            audio: { url: audioResponse.result },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            ptt: true
        }, { quoted: m });

        await m.react('✅');
    } catch (err) {
        console.error(err);
        await m.react('✖️');
        conn.reply(m.chat, `*Ocurrió un error!* 😭\n${err.message || err}`, m);
    }
}

handler.help = ['read *<término>*'];
handler.tags = ['dl'];
handler.command = ['read'];

export default handler;

// Función para obtener el buffer
const fetchJson = async (url, options = {}) => {
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.error(`Error al obtener JSON: ${error}`);
        throw error;
    }
};