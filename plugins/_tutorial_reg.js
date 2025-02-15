let handler = async (m, { conn }) => {
  const usuario = m.pushName || 'Usuario';
  const videoPath = './src/tutorial.mp4';

  const texto = `Hola @${m.sender.split('@')[0]} aquí está el tutorial para registrarte en Sumi-zakurazawa.`;
await conn.sendButton(m.chat, texto, wm, img, [['Menu ☄', '/menu'] ], fkontak, m)  
  const options = {
    quoted: m,
    caption: texto,
    mentions: [m.sender]
  };

  await conn.sendMessage(m.chat, { video: { url: videoPath }, ...options });
};

handler.command = ['tutorialreg']

export default handler;