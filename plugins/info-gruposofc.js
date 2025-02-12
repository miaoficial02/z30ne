let media = './Menu.jpg'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    await conn.sendMessage(m.chat, { react: { text: '📇', key: m.key } })
let str = `*🔮 GRUPOS OFICIALES*

    *_╭━━━⊜ Sumi*
  *_┃🌩❏ Hola, 
*➤ 𝙶𝚛𝚞𝚙𝚘𝚜 donde puedes encontrar el bot oficial y hablar con amigos*
*1.-*https://chat.whatsapp.com/D9hmosKv0924sPqyXeu1CU_*
*_╰━━━━━━━━━━━━━━━━⊜_*`
await conn.sendFile(m.chat, media, 'imagen', str, fkontak)}

handler.command = /^grupos|linksk|gruposofc|gruposoficiales$/i
handler.register = true
handler.exp = 33

export default handler