let handler = async (m, { conn, command }) => {

let grupos =  `Hola, 
*➤ 𝙶𝚛𝚞𝚙𝚘𝚜 donde puedes encontrar el bot oficial y hablar con amigos*
*1.-*https://chat.whatsapp.com/D9hmosKv0924sPqyXeu1CU
`
await m.react('🌟')
await conn.sendFile(m.chat, imagen1, "hutao.jpg", grupos, fkontak, null, rcanal)}
                      
handler.command = ['grupos','linksk','gruposofc','gruposoficiales']
handler.register = false

export default handler
