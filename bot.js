const { Telegraf, Markup } = require('telegraf');

// ⚠️ CONFIGURACIÓN - EL TOKEN VA SOLO EN RENDER
const bot = new Telegraf(process.env.BOT_TOKEN);
const TU_USUARIO = "@Cajicahex"; // Tu usuario de contacto
const TU_ID = 8830576173; // Pon aquí tu ID numérico

// ──────────────────────────────────────────────
// 🛒 LISTA DE PRODUCTOS
// ──────────────────────────────────────────────
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
💲 Precio: Depende del presupuesto y características de la cuenta
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
✅ Servicio exclusivo y sin compartir`,

  proyecto_panel: `🚀 *PROYECTO PANEL*
├─ Básico → 30 USD
└─ Supreme → 65 USD
⚙️ Configuración y desarrollo completo`
};

// ──────────────────────────────────────────────
// 💳 BOTONES DE PAGO
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// 📋 COMANDOS
// ──────────────────────────────────────────────
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

${PRODUCTOS.panel_extreme}

${PRODUCTOS.panel_basico}

${PRODUCTOS.bypass}

${PRODUCTOS.proxy_ios}

${PRODUCTOS.cuentas_ff}

${PRODUCTOS.diamantes_ff}

${PRODUCTOS.private}

${PRODUCTOS.proyecto_panel}

📩 Dudas: ${TU_USUARIO}

Escribe el nombre del producto para comprar`);
});

bot.command('paneles', ctx => ctx.replyWithMarkdown(`${PRODUCTOS.panel_extreme}\n\n${PRODUCTOS.panel_basico}`));
bot.command('freefire', ctx => ctx.replyWithMarkdown(`${PRODUCTOS.cuentas_ff}\n\n${PRODUCTOS.diamantes_ff}`));
bot.command('otros', ctx => ctx.replyWithMarkdown(`${PRODUCTOS.bypass}\n\n${PRODUCTOS.proxy_ios}\n\n${PRODUCTOS.private}\n\n${PRODUCTOS.proyecto_panel}`));
bot.command('pagos', ctx => ctx.replyWithMarkdown(`~*MÉTODOS DE PAGO GHXST HXCK*~`, botonesPago));
bot.command('contacto', ctx => ctx.replyWithMarkdown(`📞 Atención: ${TU_USUARIO} | 8AM - 10PM`));

// ──────────────────────────────────────────────
// ✅ AL ESCRIBIR PRODUCTO
// ──────────────────────────────────────────────
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
    ctx.replyWithMarkdown(`${seleccionado}

✅ *Para finalizar la compra selecciona el método de pago:*`, botonesPago);
    ctx.telegram.sendMessage(TU_ID, `📥 *NUEVO PEDIDO*
👤 ${ctx.from.first_name} (@${ctx.from.username || 'Sin usuario'})
🆔 ${ctx.from.id}
📦 ${ctx.message.text}`);
  }
});

// ──────────────────────────────────────────────
// 💳 DATOS DE PAGO
// ──────────────────────────────────────────────
bot.action('pago_paypal', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💳 PayPal: https://www.paypal.me/dxntedomina\n📌 Envía comprobante`);
});

bot.action('pago_mexico', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 Transferencia MX: 722969020420777451 | Cristal Castro\n📌 Envía comprobante`);
});

bot.action('pago_mercadopago', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💵 Mercado Pago: Escríbeme para datos`);
});

bot.action('pago_zelle', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🔵 Zelle: +1 (703) 232-7619 | Jose Martinez\n📌 Envía captura`);
});

bot.action('pago_nequi', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`📱 Nequi: 3005729890 | Cris Ro\n📌 Envía comprobante`);
});

bot.action('pago_bancolombia', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 Bancolombia: Ahorros 50665712513 | Cristian David Romero Oviedo\n📌 Envía comprobante`);
});

bot.action('pago_remitly', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💸 Remitly: Cristian David Romero Oviedo | Sincelejo, Sucre | Cuenta 50665712513 | 📞 +57 3005729890 | 📧 kstecri28@gmail.com\n📌 Envía código`);
});

bot.action('pago_binance', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🪙 Binance: Usuario Dxnte_Ghxst | ID 1083850312\n📌 Envía captura`);
});

bot.action('pago_argentina', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🇦🇷 Transferencia Arg: Alias nahuu13.mp | CVU 0000003100074597562027 | Nahuel Alexis Lattanzio\n📌 Envía comprobante`);
});

bot.action('pago_yape', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🇵🇪 Yape: +51 926 720 632 | Ramon\n📌 Envía captura`);
});

bot.action('pago_western', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🌍 Western Union: Cristian David Romero Oviedo | Colombia, Sincelejo Sucre | 📞 +57 3005729890 | 📧 kstecri28@gmail.com\n📌 Envía código`);
});

// ──────────────────────────────────────────────
// 📤 COMPROBANTES
// ──────────────────────────────────────────────
bot.on(['photo', 'document'], ctx => {
  const id = ctx.from.id;
  const nombre = ctx.from.first_name;
  const usuario = ctx.from.username || 'Sin usuario';

  ctx.telegram.sendMessage(TU_ID, `📤 *COMPROBANTE RECIBIDO*
👤 ${nombre} (@${usuario})
🆔 ${id}
✅ /Aprobar ${id}
❌ /Rechazar ${id} Motivo`);

  if (ctx.message.photo) ctx.telegram.sendPhoto(TU_ID, ctx.message.photo.slice(-1)[0].file_id);
  if (ctx.message.document) ctx.telegram.sendDocument(TU_ID, ctx.message.document.file_id);

  ctx.reply('✅ Comprobante recibido, en breve confirmamos.');
});

// ──────────────────────────────────────────────
// ✅ APROBAR / RECHAZAR
// ──────────────────────────────────────────────
bot.command('Aprobar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ Sin permiso');
  const id = ctx.message.text.split(' ')[1];
  if (!id) return ctx.reply('⚠️ Usa: /Aprobar ID');
  ctx.telegram.sendMessage(id, `✅ *PAGO APROBADO* 🎉 Enviamos tu servicio en breve.`);
  ctx.reply(`✅ Aprobado a ID: ${id}`);
});

bot.command('Rechazar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ Sin permiso');
  const partes = ctx.message.text.split(' ');
  const id = partes[1];
  const motivo = partes.slice(2).join(' ') || 'No se pudo verificar';
  if (!id) return ctx.reply('⚠️ Usa: /Rechazar ID Motivo');
  ctx.telegram.sendMessage(id, `❌ *PAGO NO APROBADO* Motivo: ${motivo} | Duda: ${TU_USUARIO}`);
  ctx.reply(`❌ Rechazado a ID: ${id}`);
});

// ──────────────────────────────────────────────
// 🚀 INICIAR
// ──────────────────────────────────────────────
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
