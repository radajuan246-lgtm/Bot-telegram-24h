const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => ctx.reply('✅ Bot activo 24/7'));
bot.command('hola', ctx => ctx.reply('👋 Hola! Funcionando sin parar'));
bot.command('estado', ctx => ctx.reply('🟢 En línea todo el tiempo'));

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
