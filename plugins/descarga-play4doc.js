/*Créditos A Quien Correspondan 
Play Traido y Editado 
Por Cuervo-Team-Supreme*/
import axios from 'axios';

let handler = async (m, { conn, args }) => {
    m.react('🕓');
    if (!args[0]) {
        return conn.reply(m.chat, '🍟 Por favor, ingresa un enlace de YouTube válido.', m, rcanal);
    }

    try {
        const apiUrl = `https://api.agungny.my.id/api/youtube-video?url=${encodeURIComponent(args[0])}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status === "true") {
            const { title, duration, resolution, downloadUrl } = response.data.result;
            const message = `🎥 *Título:* ${title}\n🔥 *Duración:* ${duration}\n📺 *Resolución:* ${resolution}`;
            
            await conn.sendMessage(m.chat, {
                document: { url: downloadUrl }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`,
                caption: message
            }, { quoted: m });
            
            await m.react('✅');
        } else {
            await conn.reply(m.chat, `❌ No se pudo obtener el video. Asegúrate de que el enlace sea correcto.`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `❌ Ocurrió un error al intentar descargar el video. Inténtalo más tarde.`, m);
        await m.react('✖️');
    }
};

handler.help = ['ytmp4doc *<url>*', 'ytvdoc *<url>*', 'videoytdoc *<url>*', 'ytddoc *<url>*', 'ytviddoc *<url>*'];
handler.command = ['ytmp4doc', 'ytvdoc', 'videoytdoc', 'ytddoc', 'ytviddoc'];
handler.tags = ['dl'];

export default handler;