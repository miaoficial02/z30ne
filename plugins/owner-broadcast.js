import fs from 'fs';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lista de números autorizados (máximo 3)
const allowedUsers = [
    '521XXXXXXXXXX@s.whatsapp.net', // Número 1 (reemplázalo con el real)
    '521XXXXXXXXXX@s.whatsapp.net', // Número 2
    '521XXXXXXXXXX@s.whatsapp.net'  // Número 3
];

const handler = async (m, { conn, text, participants }) => {
    if (!allowedUsers.includes(m.sender)) {
        return m.reply('❌ *No tienes permiso para usar este comando.*');
    }

    if (!text) return m.reply('[❗] Debes proporcionar un mensaje para transmitir.');

    const fkontak = {
        key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
        message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Bot;Official;;;\nFN:Bot Oficial\nEND:VCARD` } }
    };

    const chats = Object.keys(await conn.groupFetchAllParticipating());
    const privateChats = Object.keys(global.db.data.users).filter(user => user.endsWith('@s.whatsapp.net'));

    await m.reply('📢 *Enviando mensaje a todos los chats...*');

    let totalSent = 0;

    // Envío a grupos
    for (let group of chats) {
        await delay(4000);
        await conn.sendMessage(group, { text: `📢 *Mensaje Oficial:*\n\n${text}`, mentions: participants.map(u => u.id) }, { quoted: fkontak });
        totalSent++;
    }

    // Envío a chats privados
    for (let user of privateChats) {
        await delay(2000);
        await conn.sendMessage(user, { text: `📢 *Mensaje Oficial:*\n\n${text}` }, { quoted: fkontak });
        totalSent++;
    }

    await m.reply(`✅ *Mensaje enviado a ${totalSent} chats en total.*`);
};

handler.help = ['broadcast', 'bc'].map(v => v + ' <mensaje>');
handler.tags = ['owner'];
handler.command = /^(comunicar|comunicado|broadcastall|bc)$/i;

export default handler;