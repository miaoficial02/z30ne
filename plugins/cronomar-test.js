case 'cronomar':
if (!q) return reply(`⏤͟͟͞͞⃝ Por favor, forneça o tempo para o cronograma.\n\nExemplo: ${prefix + command} 20m`)
try {
const match = q.match(/^(\d+)(m|s)$/)
if (!match) return reply(`❌ Formato inválido!\n\nUse minutos ou segundos, exemplo:\n• ${prefix + command} 20m\n• ${prefix + command} 30s`)
const duration = parseInt(match[1])
const unit = match[2]
const totalMs = unit === 'm' ? duration * 60000 : duration * 1000
const now = new Date()
const endTime = new Date(now.getTime() + totalMs)
const brOptions = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' }
const formattedEndTime = endTime.toLocaleTimeString('pt-BR', brOptions)
let msgText = `⏳ *Cronômetro iniciado!*\n\n⏱️ Tempo restante: *${duration}${unit}*\n🚀 Termina às: *${formattedEndTime}* (Horário de Brasília)`
let sentMsg = await zerotwo.sendMessage(from, { text: msgText }, {quoted: info})
let interval = setInterval(async () => {
try {
const now = new Date()
const remainingMs = endTime - now
if (remainingMs <= 0) {
clearInterval(interval)
return zerotwo.sendMessage(from, { edit: sentMsg.key, text: `✅ *Tempo encerrado!*\n\n🕒 O cronômetro de *${duration}${unit}* acabou.` }, {quoted: info})
}
const remainingMinutes = Math.floor(remainingMs / 60000)
const remainingSeconds = Math.floor((remainingMs % 60000) / 1000)
let countdownText = remainingMinutes > 0 ? `${remainingMinutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
let updatedMsg = `⏳ *Cronômetro em andamento...*\n\n⏱️ Tempo restante: *${countdownText}*\n🚀 Termina às: *${formattedEndTime}* (Horário de Brasília)`
await zerotwo.sendMessage(from, { edit: sentMsg.key, text: updatedMsg }, {quoted: info})
} catch (error) {
console.log(chalk.red('[ERRO] Falha ao atualizar o cronômetro:'), error)
clearInterval(interval)
}
}, 1000)
} catch (e) {
console.log(chalk.red('[ERRO] Ocorreu um erro no comando #cronomar:'), e)
return reply('❌ *Erro ao iniciar o cronômetro.*')
}
break