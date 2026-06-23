const { Telegraf, Markup } = require('telegraf');

// ⚙️ CONFIGURACIÓN
const bot = new Telegraf(process.env.BOT_TOKEN);
const TU_USUARIO = "@Cajicahex";
const TU_ID = 8830576173; // Solo tú puedes aprobar/rechazar

// 🔢 CONTADOR DE PEDIDOS (empieza en 1, va subiendo solo)
let numeroPedido = 1;
const pedidos = {}; // Guarda la relación: número → ID del cliente

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

// ✅ AL ESCRIBIR O COMPRAR UN PRODUCTO
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
  }
});

// 💳 DATOS DE PAGO
bot.action('pago_paypal', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💳 *PAYPAL*
🔗 https://www.paypal.me/dxntedomina
📌 Realiza el pago y envía aquí el comprobante`);
});

bot.action('pago_nequi', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`📱 *NEQUI*
📲 3005729890
👤 Cris Ro
📌 Envía el comprobante aquí mismo`);
});

bot.action('pago_bancolombia', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 *BANCOLOMBIA*
🔢 Cuenta de ahorros: 50665712513
👤 Cristian David Romero Oviedo
📌 Envía el comprobante de pago`);
});

// 📤 AL RECIBIR COMPROBANTE → ASIGNA NÚMERO 1, 2, 3...
bot.on(['photo', 'document'], ctx => {
  const clienteId = ctx.from.id;
  const nombre = ctx.from.first_name;
  const usuario = ctx.from.username || 'Sin usuario';
  const nro = numeroPedido;

  // Guardamos la relación: número → ID del cliente
  pedidos[nro] = clienteId;

  // Enviamos aviso con número simple
  ctx.telegram.sendMessage(TU_ID, `📤 *COMPROBANTE RECIBIDO*
👤 Cliente: ${nombre} (@${usuario})
🔢 N° Pedido: ${nro}
✅ /Aprobar ${nro}
❌ /Rechazar ${nro} Motivo`);

  // Enviamos la foto o documento
  if (ctx.message.photo) ctx.telegram.sendPhoto(TU_ID, ctx.message.photo.slice(-1)[0].file_id);
  if (ctx.message.document) ctx.telegram.sendDocument(TU_ID, ctx.message.document.file_id);

  // Confirmamos al cliente
  ctx.reply('✅ Comprobante recibido, en breve confirmamos tu pedido.');

  // Subimos el contador para el siguiente
  numeroPedido++;
});

// ✅ COMANDOS: /Aprobar 1 → /Rechazar 1
bot.command('Aprobar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso para usar este comando.');
  const partes = ctx.message.text.trim().split(' ');
  const nroPedido = partes[1];

  if (!nroPedido || !pedidos[nroPedido]) {
    return ctx.reply('⚠️ Número de pedido no válido. Usa: /Aprobar 1');
  }

  const idCliente = pedidos[nroPedido];
  ctx.telegram.sendMessage(idCliente, `✅ *PAGO APROBADO* 🎉
Tu pedido N° ${nroPedido} ha sido confirmado. En breve te enviamos el servicio solicitado. ¡Gracias por tu compra!`);
  ctx.reply(`✅ Pedido N° ${nroPedido} APROBADO`);

  // Borramos el registro para no acumular
  delete pedidos[nroPedido];
});

bot.command('Rechazar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso para usar este comando.');
  const partes = ctx.message.text.trim().split(' ');
  const nroPedido = partes[1];
  const motivo = partes.slice(2).join(' ') || 'No se pudo verificar la transacción.';

  if (!nroPedido || !pedidos[nroPedido]) {
    return ctx.reply('⚠️ Número de pedido no válido. Usa: /Rechazar 1 Motivo');
  }

  const idCliente = pedidos[nroPedido];
  ctx.telegram.sendMessage(idCliente, `❌ *PAGO NO APROBADO*
Pedido N° ${nroPedido}
Motivo: ${motivo}
Si crees que hay un error, escríbenos a ${TU_USUARIO}`);
  ctx.reply(`❌ Pedido N° ${nroPedido} RECHAZADO | Motivo: ${motivo}`);

  // Borramos el registro
  delete pedidos[nroPedido];
});

// 🚀 INICIAR BOT
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
