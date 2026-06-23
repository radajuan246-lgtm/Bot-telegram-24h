const { Telegraf, Markup } = require('telegraf');

// ⚙️ CONFIGURACIÓN
const bot = new Telegraf(process.env.BOT_TOKEN);
const TU_ID = 8830576173;
const TU_USUARIO = "@Cajicahex";

// 🔢 NÚMEROS DE PEDIDO SECUENCIALES
let siguientePedido = 1;
const pedidos = {};

// 🛒 PRODUCTOS
const PRODUCTOS = {
  panel_extreme: `📌 *PANEL EXTREME*
├─ 1 Día → 2 USD
├─ 7 Días → 6 USD
├─ 15 Días → 12 USD
├─ 1 Mes → 20 USD
└─ 365 Días → 50 USD`,

  bypass: `⚡ *BYPASS*
├─ Semanal → 8 USD
├─ Mensual → 15 USD
└─ Trimestral → 35 USD`,

  proxy_ios: `🍎 *PROXY iOS*
💲 Precio: A consultar`,

  cuentas_ff: `🎮 *CUENTAS FREE FIRE*
💲 Precio: Según cuenta | Seguras con garantía`,

  diamantes_ff: `💎 *DIAMANTES FF*
├─ 5.600 + 560 → 38 USD
├─ 2.180 + 218 → 15 USD
└─ 1.060 + 106 → 7 USD`,

  panel_basico: `📌 *PANEL BÁSICO*
├─ 1 Día → 1 USD
├─ 7 Días → 4 USD
├─ 15 Días → 6,5 USD
├─ 1 Mes → 12 USD
└─ 365 Días → 35 USD`,

  private: `🔒 *SERVICIO PRIVATE*
├─ TEMPORADA → 50 USD
└─ PERMANENTE → 80 USD`,

  proyecto_panel: `🚀 *PROYECTO PANEL*
├─ Básico → 30 USD
└─ Supreme → 65 USD`
};

// 💳 MÉTODOS DE PAGO
const botonesPago = Markup.inlineKeyboard([
  [Markup.button.callback('💳 PayPal', 'pago_paypal')],
  [Markup.button.callback('📱 Nequi', 'pago_nequi')],
  [Markup.button.callback('🏦 Bancolombia', 'pago_bancolombia')]
]);

// 📋 COMANDOS GENERALES
bot.command('start', ctx => {
  ctx.replyWithMarkdown(`👋 ¡Bienvenido a Ghxst Hxck Oficial! 🛒

📋 Escribe:
/lista → Ver todos los productos
/pagos → Ver métodos de pago`);
});

bot.command('lista', ctx => {
  ctx.replyWithMarkdown(`📋 *CATÁLOGO COMPLETO* 📦

${PRODUCTOS.panel_extreme}\n\n${PRODUCTOS.panel_basico}\n\n${PRODUCTOS.bypass}\n\n${PRODUCTOS.proxy_ios}\n\n${PRODUCTOS.cuentas_ff}\n\n${PRODUCTOS.diamantes_ff}\n\n${PRODUCTOS.private}\n\n${PRODUCTOS.proyecto_panel}

📩 Dudas: ${TU_USUARIO}`);
});

bot.command('pagos', ctx => ctx.reply('Elige tu método de pago:', botonesPago));

// 💳 DATOS DE PAGO
bot.action('pago_paypal', ctx => {
  ctx.answerCbQuery();
  ctx.reply('💳 PayPal: https://www.paypal.me/dxntedomina\n📌 Envía comprobante aquí');
});

bot.action('pago_nequi', ctx => {
  ctx.answerCbQuery();
  ctx.reply('📱 Nequi: 3185949135 | Juan Diego Cajica\n📌 Envía captura');
});

bot.action('pago_bancolombia', ctx => {
  ctx.answerCbQuery();
  ctx.reply('🏦 Bancolombia: Cuenta Ahorros 50665712513 | Cristian David Romero Oviedo');
});

// 📤 AL RECIBIR COMPROBANTE
bot.on(['photo', 'document'], ctx => {
  const idCliente = ctx.from.id;
  const nombre = ctx.from.first_name || 'Sin nombre';
  const nro = siguientePedido;

  pedidos[nro] = idCliente;

  // ✅ MENSAJE CON LOS COMANDOS QUE QUIERES
  ctx.telegram.sendMessage(TU_ID, `📤 *COMPROBANTE RECIBIDO*
👤 Cliente: ${nombre}
🔢 N° Pedido: ${nro}
✅ /aceptar ${nro}
❌ /denegado ${nro} Motivo`);

  if (ctx.message.photo) ctx.telegram.sendPhoto(TU_ID, ctx.message.photo.slice(-1)[0].file_id);
  ctx.reply('✅ Comprobante recibido, en breve te confirmamos.');

  siguientePedido++;
});

// ✅ COMANDOS /aceptar y /denegado
bot.hears(/^\/aceptar (\d+)$/, ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso');

  const nro = ctx.match[1];
  if (!pedidos[nro]) return ctx.reply(`⚠️ Pedido ${nro} no existe o ya fue procesado`);

  ctx.telegram.sendMessage(pedidos[nro], `✅ *PAGO ACEPTADO* 🎉
Tu pedido N° ${nro} está confirmado. Enviamos tu servicio en breve.`);
  ctx.reply(`✅ Pedido N° ${nro} ACEPTADO`);

  delete pedidos[nro];
});

bot.hears(/^\/denegado (\d+)(.*)?$/, ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso');

  const nro = ctx.match[1];
  const motivo = ctx.match[2]?.trim() || 'No se pudo verificar el pago';

  if (!pedidos[nro]) return ctx.reply(`⚠️ Pedido ${nro} no existe o ya fue procesado`);

  ctx.telegram.sendMessage(pedidos[nro], `❌ *PAGO DENEGADO*
Pedido N° ${nro}
Motivo: ${motivo}
Si crees que hay error, escribe a ${TU_USUARIO}`);
  ctx.reply(`❌ Pedido N° ${nro} DENEGADO | Motivo: ${motivo}`);

  delete pedidos[nro];
});

// 🚀 INICIAR BOT
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
