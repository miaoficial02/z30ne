const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

async function playVideo(m, conn, args, lenguaje) {
    const text = args.join(' ');
    if (!text || text.trim() === '') {
        return m.reply('Por favor, proporciona el nombre o término de búsqueda del video.');
    }

    m.react('⏳'); // Reacción de espera

    let video = {};
    try {
        const yt_play = await yts(text);
        if (!yt_play || yt_play.all.length === 0) {
            return m.reply('No se encontraron resultados para tu búsqueda.');
        }

        const firstResult = yt_play.all[0];
        video = {
            url: firstResult.url,
            title: firstResult.title,
            thumbnail: firstResult.thumbnail || 'default-thumbnail.jpg',
            timestamp: firstResult.duration.seconds,
            views: firstResult.views,
            author: firstResult.author.name,
        };
    } catch (error) {
        console.error(error);
        return m.reply('Ocurrió un error al buscar el video.');
    }

    function formatDuration(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s]
            .map(v => v < 10 ? `0${v}` : v)
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    await conn.sendMessage(m.chat, {
        image: { url: video.thumbnail },
        caption: `╭───≪~*╌◌ᰱ•••⃙❨͟͞P̸͟͞L̸͟A̸͟͞Y̸͟͞❩⃘•••ᰱ◌╌*~*
│║◈ ${lenguaje.descargar.title} ${video.title}
│║◈ ${lenguaje.descargar.duracion} ${formatDuration(video.timestamp || 0)}
│║◈ ${lenguaje.descargar.views} ${video.views || 0}
│║◈ ${lenguaje.descargar.autor} ${video.author || 'Desconocido'}
│║◈ Link: ${video.url}
╰─•┈┈┈•••✦𝒟ℳ✦•••┈┈┈•─╯⟤`,
        footer: "𝙲𝙾𝚁𝚃𝙰𝙽𝙰 𝟸.𝟶",
        buttons: [
            { buttonId: `.musica ${video.url}`, buttonText: { displayText: "🎼AUDIO🎼" }, type: 1 },
            { buttonId: `.video ${video.url}`, buttonText: { displayText: "🎬VIDEO🎬" }, type: 1 },
            { buttonId: `.menu`, buttonText: { displayText: "📘MENU📘" }, type: 1 },
        ],
        viewOnce: true,
        headerType: 4,
        mentions: [m.sender],
    }, { quoted: m });
}

// **Handler al final**
module.exports = {
    name: "pruebap", // Comando que activará este plugin
    aliases: [], // Puedes añadir alias si quieres que funcione con más comandos
    description: "Busca y envía un video de YouTube con botones interactivos.",
    execute: playVideo, // Llama a la función playVideo cuando se activa el comando
};