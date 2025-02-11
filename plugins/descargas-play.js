import fetch from 'node-fetch';
import yts from 'yt-search';  

let handler = async (m, { conn, args }) => {
  console.log('Ejecutando el comando play...');
  
  let username = m.pushName || 'User';
  let pp = 'https://qu.ax/hMOxx.jpg';
  let thumbnail = await (await fetch(pp)).buffer();

  // Mensaje de depuración para verificar si entra correctamente
  await conn.sendMessage(m.chat, { text: 'Debug: El comando se ejecutó correctamente.' });

  if (!args[0]) {
    let txt = `✦ *Ingresa el nombre de lo que quieres buscar*`;

    const anu = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net"
      },
      message: {
        groupInviteMessage: {
          groupJid: "6285240750713-1610340626@g.us",
          inviteCode: "mememteeeekkeke",
          groupName: "P",
          caption: "Itsuki",
          jpegThumbnail: thumbnail
        }
      }
    };

    await conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: '✦ ᥴᥲᥒᥲᥣ ძᥱ іᥲᥒᥲᥣᥱȷᥲᥒძr᥆᥆k15᥊',
          serverMessageId: -1
        }
      }
    }, { quoted: anu });

    return;
  }

  await m.react('✅');

  try {
    let query = args.join(" ");
    console.log('Buscando en YouTube:', query);

    // Usamos yt-search para obtener resultados
    let searchResults = await yts(query);
    console.log('Resultados obtenidos:', searchResults);

    if (!searchResults || !searchResults.videos || searchResults.videos.length === 0) {
      console.log('No se encontraron resultados.');

      await conn.sendMessage(m.chat, { text: `No se encontraron resultados, ${username}.` });

      await m.react('✖️');
      return;
    }

    let video = searchResults.videos[0];  // Tomamos el primer video de los resultados
    let videoImg = await (await fetch(video.thumbnail)).buffer();

    let txt = `*\`Y O U T U B E - P L A Y\`*\n\n`;
    txt += `*\`Título:\`* ${video.title}\n`;
    txt += `*\`Duración:\`* ${parseDuration(video.timestamp)}\n`;
    txt += `*\`Canal:\`* ${video.author.name || 'Desconocido'}\n`;
    txt += `*\`Url:\`* ${video.url}\n\n`;

    console.log('Enviando resultados...');

    await conn.sendMessage(m.chat, {
      image: videoImg,
      caption: txt,
      footer: 'Selecciona una opción',
      buttons: [
        {
          buttonId: `/ytmp3 ${video.title}`,
          buttonText: {
            displayText: '✦ Audio',
          },
        },
        {
          buttonId: `/ytmp4 ${video.title}`,
          buttonText: {
            displayText: '✦ Video',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    });

    console.log('Mensaje enviado correctamente.');
    await m.react('✅');

  } catch (e) {
    console.error('Error en el handler:', e);
    await m.react('✖️');

    await conn.sendMessage(m.chat, {
      text: `Error al buscar el video, ${username}. Verifica la consulta o inténtalo de nuevo.`
    });
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['playp', 'play2p'];

export default handler;

function parseDuration(duration) {
  let parts = duration.split(':').reverse();
  return parts.reduce((total, part, index) => total + parseInt(part) * Math.pow(60, index), 0);
}