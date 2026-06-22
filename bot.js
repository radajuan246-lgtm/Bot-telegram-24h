const { Telegraf } = require('telegraf');

// ⚠️ Pon AQUÍ tu token entre comillas
const bot = new Telegraf('8456580231:AAG1WSPgxlscVJj__af1xq_W_sANVkIXjpg');

bot.command('start', ctx => ctx.reply('✅ Bot activo 24/7'));
bot.command('hola', ctx => ctx.reply('👋 Hola! Funcionando bien'));
bot.command('estado', ctx => ctx.reply('🟢 En línea'));

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
