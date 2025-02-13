 let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `DIOMAR ES GAY \n✰ 𝗧𝗶𝗲𝗺𝗽𝗼 𝗔𝗰𝘁𝗶𝘃𝗮: ${rTime(uptime)}``.trim()

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', 'BY RAYO', 'status@broadcast')
}
handler.command = /^(que)$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler 
 
