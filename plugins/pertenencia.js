let handler = async (m) => {
    let name = "¿Le gustan a ivan al staff?"
    let values = ["Sí", "No", "Que se vaya xd"]
    let selectableCount = 1
    await m.conn.sendMessage(m.chat, { 
        poll: { 
            name, 
            values, 
            selectableCount 
        } 
    }, { quoted: m })
}

handler.help = ['per'];
handler.tags = ['fun'];
handler.command = ['per'];
handler.register = true;

export default handler;