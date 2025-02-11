import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  try {
    const query = args[0];
    if (!query) return m.reply('🤍 *Ejemplo:* .ytmp3 <URL de YouTube>');

    // Notificar al usuario que se está obteniendo el audio
    await m.reply('🔍 *Obteniendo detalles del audio...*');

    // URL de la API para descargar el audio
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);

    // Comprobar si la respuesta es correcta
    if (!response.ok) throw new Error('Error al obtener datos de la API');

    const data = await response.json();

    // Comprobar si los datos de respuesta contienen download_url
    if (!data.result?.download_url) {
      return m.reply('🚫 *Error al obtener el audio.* Verifica la URL o intenta nuevamente más tarde.');
    }

    // Extraer detalles del audio
    const { title, quality, thumbnail, download_url } = data.result;

    // Preparar el texto para el audio
    const caption = `🔥 *\`Título:\`* ${title}\n🍁 *\`Calidad:\`* ${quality}`;

    // Enviar el audio directamente
    await conn.sendMessage(m.chat, {
      audio: { url: download_url },
      mimetype: 'audio/mpeg',
      title: title,
      thumbnail: await (await fetch(thumbnail)).buffer(), // Opcional: obtener el thumbnail como buffer
    }, { quoted: m });

    // Notificar al usuario sobre la finalización exitosa
    await m.reply('✅ *¡Audio enviado con éxito!*');

  } catch (error) {
    console.error('Error en el comando ytmp3:', error.message);
    m.reply('⚠️ *Ocurrió un error al procesar tu solicitud.* Por favor, intenta nuevamente más tarde.');
  }
};

handler.help = ['ytmp3docc'];
handler.tags = ['descargar'];
handler.command = /^ytmp3docc$/i;

export default handler;