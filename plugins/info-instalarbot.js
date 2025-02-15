//Hecho zaphkiel




const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var handler = async (m, { conn }) => {
    let texto = `╭─────────────┈⊷
│ *INSTALACIÓN DE SUMI-ZAKURASAWA*
╰┬────────────┈⊷
┌┤ *REQUISITOS PARA LA INSTALACIÓN*
┌┤➳ _Dudas: wa.me/50558124470_
┌┤➳ _1 GB de almacenamiento_
┌┤➳ _Termux: https://www.mediafire.com/file/3hsvi3xkpq3a64o/termux_118.apk/file_
┌┤➳ _GitHub: https://github.com/leoneloficial/Sumi-zakurasawa_
┌┤➳ _Un WhatsApp inmune (secundario)_
┌┤➳ _Un número virtual_
┌┤➳ _2 dispositivos o una PC para escanear_
╰┬────────────┈⊷
  │ *COMANDOS DE INSTALACIÓN EN TERMUX*
  │> termux-setup-storage
  │> apt update -y && apt upgrade -y
  │> pkg install -y git nodejs ffmpeg imagemagick yarn
  │> git clone https://github.com/leoneloficial/Sumi-zakurasawa && cd Sumi-zakurasawa
  │> bash update.sh
  │> npm start
  ╭──────────────────────────────────
  │ Escribe "instalarbot" para enviar estos comandos automáticamente.
  ╰────────────┈⊷`;

    conn.reply(m.chat, texto, m);
};

async function enviarComandos(m, comandos) {
    for (let cmd of comandos) {
        await delay(1500);
        m.reply(cmd);
    }
}

handler.before = async (m) => {
    if (/^instalarbot$/i.test(m.text)) {
        let comandos = [
            'termux-setup-storage',
            'apt update -y && apt upgrade -y',
            'pkg install -y git nodejs ffmpeg imagemagick yarn',
            'git clone https://github.com/leoneloficial/Sumi-zakurasawa && cd Sumi-zakurasawa',
            'bash update.sh',
            'npm start'
        ];
        await enviarComandos(m, comandos);
    }
};

handler.help = ['instalarbot'];
handler.tags = ['info'];
handler.command = /^instalarbot$/i;

export default handler;