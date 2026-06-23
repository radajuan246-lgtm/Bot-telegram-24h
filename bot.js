const { Telegraf, Markup } = require('telegraf');

// ⚠️ CONFIGURACIÓN
const bot = new Telegraf(process.env.BOT_TOKEN);
const TU_USUARIO = "@Cajicahex";
const TU_ID = 8830576173; // ✅ Tu ID correcto

// 🛒 LISTA DE PRODUCTOS
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
💲 Precio: A consultar según tiempo y uso`,

  cuentas_ff: `🎮 *CUENTAS FREE FIRE*
💲 Precio: Depende del presupuesto y características
✅ Cuentas seguras y con garantía`,

  diamantes_ff: `💎 *DIAMANTES FREE FIRE*
├─ 5.600 + 560 → 38 USD
├─ 2.180 + 218 → 15 USD
└─ 1.060 + 106 → 7 USD
⚡ Entrega rápida y segura`,

  panel_basico: `📌 *PANEL BÁSICO*
├─ 1 Día → 1 USD
├─ 7 Días → 4 USD
├─ 15 Días → 6,5 USD
├─ 1 Mes → 12 USD
└─ 365 Días → 35 USD`,

  private: `🔒 *SERVICIO PRIVATE*
├─ TEMPORADA → 50 USD
└─ PERMANENTE → 80 USD
✅ Exclusivo y sin compartir`,

  proyecto_panel: `🚀 *PROYECTO PANEL*
├─ Básico → 30 USD
└─ Supreme → 65 USD
⚙️ Configuración y desarrollo completo`
};

// 💳 BOTONES DE PAGO
const botonesPago = Markup.inlineKeyboard([
  [Markup.button.callback('💳 PayPal', 'pago_paypal')],
  [Markup.button.callback('🏦 Transferencia MX', 'pago_mexico')],
  [Markup.button.callback('💵 Mercado Pago', 'pago_mercadopago')],
  [Markup.button.callback('🔵 Zelle', 'pago_zelle')],
  [Markup.button.callback('📱 Nequi', 'pago_nequi')],
  [Markup.button.callback('🏦 Bancolombia', 'pago_bancolombia')],
  [Markup.button.callback('💸 Remitly', 'pago_remitly')],
  [Markup.button.callback('🪙 Binance', 'pago_binance')],
  [Markup.button.callback('🇦🇷 Transferencia Arg', 'pago_argentina')],
  [Markup.button.callback('🇵🇪 Yape', 'pago_yape')],
  [Markup.button.callback('🌍 Western Union', 'pago_western')]
]);

// 📋 COMANDOS GENERALES
bot.command('start', ctx => {
  ctx.replyWithMarkdown(`👋 *¡Bienvenido a Ghxst Hxck Oficial!* 🛒

📋 Comandos:
/lista → Ver todos los productos
/paneles → Ver paneles
/freefire → Cuentas y diamantes
/otros → Bypass, Proxy, Private
/pagos → Métodos de pago
/contacto → Hablar con atención`);
});

bot.command('lista', ctx => {
  ctx.replyWithMarkdown(`📋 *CATÁLOGO COMPLETO* 📦

${PRODUCTOS.panel_extreme}\n\n${PRODUCTOS.panel_basico}\n\n${PRODUCTOS.bypass}\n\n${PRODUCTOS.proxy_ios}\n\n${PRODUCTOS.cuentas_ff}\n\n${PRODUCTOS.diamantes_ff}\n\n${PRODUCTOS.private}\n\n${PRODUCTOS.proyecto_panel}

📩 Dudas: ${TU_USUARIO}

Escribe el nombre del producto para iniciar tu compra`);
});

bot.command('pagos', ctx => ctx.replyWithMarkdown(`~*MÉTODOS DE PAGO GHXST HXCK*~`, botonesPago));

// ✅ AL ESCRIBIR UN PRODUCTO
bot.on('text', ctx => {
  const texto = ctx.message.text.toLowerCase().trim();
  let seleccionado = null;

  if (texto.includes('panel extreme')) seleccionado = PRODUCTOS.panel_extreme;
  else if (texto.includes('panel básico') || texto.includes('panel basico')) seleccionado = PRODUCTOS.panel_basico;
  else if (texto.includes('bypass')) seleccionado = PRODUCTOS.bypass;
  else if (texto.includes('proxy ios')) seleccionado = PRODUCTOS.proxy_ios;
  else if (texto.includes('cuenta') || texto.includes('free fire')) seleccionado = PRODUCTOS.cuentas_ff;
  else if (texto.includes('diamante')) seleccionado = PRODUCTOS.diamantes_ff;
  else if (texto.includes('private')) seleccionado = PRODUCTOS.private;
  else if (texto.includes('proyecto panel')) seleccionado = PRODUCTOS.proyecto_panel;

  if (seleccionado) {
    ctx.replyWithMarkdown(`${seleccionado}\n\n✅ *Para finalizar la compra selecciona el método de pago:*`, botonesPago);
    ctx.telegram.sendMessage(TU_ID, `📥 *NUEVO PEDIDO*
👤 Cliente: ${ctx.from.first_name} (@${ctx.from.username || 'Sin usuario'})
🆔 ID: ${ctx.from.id}
📦 Producto: ${ctx.message.text}`);
  }
});

// 💳 DATOS DE PAGO
bot.action('pago_paypal', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💳 *PAYPAL*
🔗 https://www.paypal.me/dxntedomina
📌 Envía comprobante`);
});

bot.action('pago_mexico', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 *TRANSFERENCIA MÉXICO*
🔢 Cuenta: 722969020420777451
👤 Titular: Cristal Castro
📌 Envía comprobante`);
});

bot.action('pago_mercadopago', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💵 *MERCADO PAGO*
📩 Escríbeme para datos de cobro`);
});

bot.action('pago_zelle', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🔵 *ZELLE*
📱 +1 (703) 232-7619
👤 Jose Martinez
📌 Envía captura`);
});

bot.action('pago_nequi', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`📱 *NEQUI*
📲 3005729890
👤 Cris Ro
📌 Envía comprobante`);
});

bot.action('pago_bancolombia', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 *BANCOLOMBIA*
🔢 Ahorros: 50665712513
👤 Cristian David Romero Oviedo
📌 Envía comprobante`);
});

bot.action('pago_remitly', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💸 *REMITLY*
👤 Cristian David Romero Oviedo
📍 Sincelejo, Sucre
🔢 Cuenta: 50665712513
🏦 Bancolombia
📞 +57 3005729890
📧 kstecri28@gmail.com
📌 Envía comprobante`);
});

bot.action('pago_binance', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🪙 *BINANCE*
👤 Usuario: Dxnte_Ghxst
🆔 ID: 1083850312
📌 Envía captura`);
});

bot.action('pago_argentina', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🇦🇷 *TRANSFERENCIA ARG*
🏷️ Alias: nahuu13.mp
🔢 CVU: 0000003100074597562027
👤 Nahuel Alexis Lattanzio
📌 Envía comprobante`);
});

bot.action('pago_yape', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🇵🇪 *YAPE*
📱 +51 926 720 632
👤 Ramon
📌 Envía captura`);
});

bot.action('pago_western', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🌍 *WESTERN UNION*
👤 Cristian David Romero Oviedo
📍 Colombia, Sincelejo Sucre
📞 +57 3005729890
📧 kstecri28@gmail.com
📌 Envía código de envío`);
});

// 📤 AL RECIBIR COMPROBANTE
bot.on(['photo', 'document'], ctx => {
  const clienteId = ctx.from.id;
  const nombre = ctx.from.first_name;
  const usuario = ctx.from.username || 'Sin usuario';

  ctx.telegram.sendMessage(TU_ID, `📤 *COMPROBANTE RECIBIDO*
👤 ${nombre} (@${usuario})
🆔 ID: ${clienteId}
✅ /Aprobar ${clienteId}
❌ /Rechazar ${clienteId} Motivo`);

  if (ctx.message.photo) ctx.telegram.sendPhoto(TU_ID, ctx.message.photo.slice(-1)[0].file_id);
  if (ctx.message.document) ctx.telegram.sendDocument(TU_ID, ctx.message.document.file_id);

  ctx.reply('✅ Comprobante recibido, en breve confirmamos.');
});

// ✅ COMANDOS DE APROBAR / RECHAZAR (AHORA EXACTOS COMO LOS USAS)
bot.command('Aprobar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso');
  const partes = ctx.message.text.trim().split(' ');
  const idCliente = partes[1];
  if (!idCliente) return ctx.reply('⚠️ Formato: /Aprobar 123456789');

  ctx.telegram.sendMessage(idCliente, `✅ *PAGO APROBADO* 🎉
Tu pedido ha sido confirmado. En breve te enviamos el servicio solicitado. ¡Gracias por tu compra!`);
  ctx.reply(`✅ Pedido aprobado → ID: ${idCliente}`);
});

bot.command('Rechazar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso');
  const partes = ctx.message.text.trim().split(' ');
  const idCliente = partes[1];
  const motivo = partes.slice(2).join(' ') || 'No se pudo verificar la transacción.';
  if (!idCliente) return ctx.reply('⚠️ Formato: /Rechazar 123456789 Motivo');

  ctx.telegram.sendMessage(idCliente, `❌ *PAGO NO APROBADO*
Motivo: ${motivo}
Si crees que hay error, escribe a ${TU_USUARIO}`);
  ctx.reply(`❌ Pedido rechazado → ID: ${idCliente}
Motivo: ${motivo}`);
});

// 🚀 INICIAR BOT
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
