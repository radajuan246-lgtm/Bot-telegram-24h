const { Telegraf, Markup } = require('telegraf');

// ⚙️ CONFIGURACIÓN
const bot = new Telegraf(process.env.BOT_TOKEN);
const TU_USUARIO = "@Cajicahex";
const TU_ID = 8830576173; // Tu ID para administrar

// 🔢 NÚMEROS DE PEDIDO SECUENCIALES
let siguienteNumero = 1;
const listaPedidos = {}; // Guarda: número → ID del cliente

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

📋 Escribe:
/lista → Ver todos los productos
/pagos → Ver métodos de pago`);
});

bot.command('lista', ctx => {
  ctx.replyWithMarkdown(`📋 *CATÁLOGO COMPLETO* 📦

${PRODUCTOS.panel_extreme}\n\n${PRODUCTOS.panel_basico}\n\n${PRODUCTOS.bypass}\n\n${PRODUCTOS.proxy_ios}\n\n${PRODUCTOS.cuentas_ff}\n\n${PRODUCTOS.diamantes_ff}\n\n${PRODUCTOS.private}\n\n${PRODUCTOS.proyecto_panel}

📩 Dudas: ${TU_USUARIO}`);
});

bot.command('pagos', ctx => ctx.replyWithMarkdown(`💳 *MÉTODOS DE PAGO*`, botonesPago));

// ✅ AL ESCRIBIR PRODUCTO
bot.on('text', ctx => {
  const texto = ctx.message.text.toLowerCase().trim();
  let seleccionado = null;

  if (texto.includes('panel extreme')) seleccionado = PRODUCTOS.panel_extreme;
  else if (texto.includes('panel basico') || texto.includes('panel básico')) seleccionado = PRODUCTOS.panel_basico;
  else if (texto.includes('bypass')) seleccionado = PRODUCTOS.bypass;
  else if (texto.includes('proxy ios')) seleccionado = PRODUCTOS.proxy_ios;
  else if (texto.includes('cuenta') || texto.includes('free fire')) seleccionado = PRODUCTOS.cuentas_ff;
  else if (texto.includes('diamante')) seleccionado = PRODUCTOS.diamantes_ff;
  else if (texto.includes('private')) seleccionado = PRODUCTOS.private;
  else if (texto.includes('proyecto panel')) seleccionado = PRODUCTOS.proyecto_panel;

  if (seleccionado) {
    ctx.replyWithMarkdown(`${seleccionado}\n\n✅ Elige método de pago:`, botonesPago);
  }
});

// 💳 DATOS DE PAGO
bot.action('pago_paypal', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💳 PayPal: https://www.paypal.me/dxntedomina\n📌 Envía captura del pago`);
});

bot.action('pago_nequi', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`📱 Nequi: 3005729890\n👤 Cris Ro\n📌 Envía captura`);
});

bot.action('pago_bancolombia', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 Bancolombia: 50665712513\n👤 Cristian David Romero Oviedo\n📌 Envía comprobante`);
});

// 📤 AL RECIBIR COMPROBANTE → ASIGNA NÚMERO 1, 2, 3...
bot.on(['photo', 'document'], ctx => {
  const idCliente = ctx.from.id;
  const nombre = ctx.from.first_name;
  const numero = siguienteNumero;

  // Guardamos el vínculo
  listaPedidos[numero] = idCliente;

  // Mensaje que te llega a TI con NÚMERO SIMPLE
  ctx.telegram.sendMessage(TU_ID, `📤 *COMPROBANTE RECIBIDO*
👤 Cliente: ${nombre}
🔢 N° Pedido: ${numero}
✅ /Aprobar ${numero}
❌ /Rechazar ${numero} Motivo`);

  // Enviamos la imagen
  if (ctx.message.photo) {
    ctx.telegram.sendPhoto(TU_ID, ctx.message.photo.slice(-1)[0].file_id);
  }
  if (ctx.message.document) {
    ctx.telegram.sendDocument(TU_ID, ctx.message.document.file_id);
  }

  // Confirmación al cliente
  ctx.reply('✅ Comprobante recibido, en breve te confirmamos.');

  // Preparamos el siguiente número
  siguienteNumero++;
});

// ✅ COMANDOS QUE FUNCIONAN CON NÚMERO SIMPLE
bot.command('Aprobar', ctx => {
  // Solo tú puedes usarlo
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ Sin permiso');

  const partes = ctx.message.text.trim().split(' ');
  const nro = partes[1];

  if (!nro || !listaPedidos[nro]) {
    return ctx.reply('⚠️ Pedido no existe. Usa: /Aprobar 1');
  }

  // Enviamos mensaje al cliente
  ctx.telegram.sendMessage(listaPedidos[nro], `✅ *PAGO APROBADO* 🎉
Tu pedido N° ${nro} está confirmado. Enviamos tu servicio en breve.`);

  ctx.reply(`✅ Pedido N° ${nro} APROBADO`);

  // Borramos para que no se repita
  delete listaPedidos[nro];
});

bot.command('Rechazar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ Sin permiso');

  const partes = ctx.message.text.trim().split(' ');
  const nro = partes[1];
  const motivo = partes.slice(2).join(' ') || 'No se pudo verificar el pago';

  if (!nro || !listaPedidos[nro]) {
    return ctx.reply('⚠️ Pedido no existe. Usa: /Rechazar 1 Motivo');
  }

  ctx.telegram.sendMessage(listaPedidos[nro], `❌ *PAGO RECHAZADO*
Pedido N° ${nro}
Motivo: ${motivo}
Dudas: ${TU_USUARIO}`);

  ctx.reply(`❌ Pedido N° ${nro} RECHAZADO`);

  delete listaPedidos[nro];
});

// 🚀 INICIAR BOT
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
                           
