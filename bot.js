const { Telegraf, Markup } = require('telegraf');

// ⚠️ Tus datos
const bot = new Telegraf(process.env.BOT_TOKEN); // Token seguro en Render
const TU_USUARIO = "@Cajicahex"; // Tu usuario de contacto
const TU_ID = 8830576173; // Pon aquí tu ID numérico de Telegram

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
// 💳 BOTONES DE MÉTODOS DE PAGO
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

📋 Escribe cualquiera de estos comandos:
/lista → Ver todos los productos
/paneles → Ver paneles disponibles
/freefire → Cuentas y diamantes
/otros → Bypass, Proxy, Private
/pagos → Ver métodos de pago
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

📩 Para pedidos o dudas: ${TU_USUARIO}

Escribe el nombre del producto para iniciar tu compra`);
});

bot.command('paneles', ctx => {
  ctx.replyWithMarkdown(`${PRODUCTOS.panel_extreme}\n\n${PRODUCTOS.panel_basico}`);
});

bot.command('freefire', ctx => {
  ctx.replyWithMarkdown(`${PRODUCTOS.cuentas_ff}\n\n${PRODUCTOS.diamantes_ff}`);
});

bot.command('otros', ctx => {
  ctx.replyWithMarkdown(`${PRODUCTOS.bypass}\n\n${PRODUCTOS.proxy_ios}\n\n${PRODUCTOS.private}\n\n${PRODUCTOS.proyecto_panel}`);
});

bot.command('pagos', ctx => {
  ctx.replyWithMarkdown(`~*MÉTODOS DE PAGO GHXST HXCK*~
Elige el que te quede más cómodo`, botonesPago);
});

bot.command('contacto', ctx => {
  ctx.replyWithMarkdown(`📞 *ATENCIÓN AL CLIENTE*
Escribe directamente:
👉 ${TU_USUARIO}

⏰ Horario: Todos los días de 8:00 AM a 10:00 PM`);
});

// ──────────────────────────────────────────────
// ✅ FUNCIÓN PRINCIPAL: AL ESCRIBIR EL PRODUCTO
// ──────────────────────────────────────────────
bot.on('text', ctx => {
  const texto = ctx.message.text.toLowerCase().trim();
  let seleccionado = null;

  // Detectar cada producto
  if (texto.includes('panel extreme')) seleccionado = PRODUCTOS.panel_extreme;
  else if (texto.includes('panel básico') || texto.includes('panel basico')) seleccionado = PRODUCTOS.panel_basico;
  else if (texto.includes('bypass')) seleccionado = PRODUCTOS.bypass;
  else if (texto.includes('proxy ios')) seleccionado = PRODUCTOS.proxy_ios;
  else if (texto.includes('cuentas free fire') || texto.includes('cuenta free fire') || texto.includes('cuentas')) seleccionado = PRODUCTOS.cuentas_ff;
  else if (texto.includes('diamantes')) seleccionado = PRODUCTOS.diamantes_ff;
  else if (texto.includes('private')) seleccionado = PRODUCTOS.private;
  else if (texto.includes('proyecto panel')) seleccionado = PRODUCTOS.proyecto_panel;

  // Si coincide, mostrar precio + mensaje + botones
  if (seleccionado) {
    ctx.replyWithMarkdown(`${seleccionado}

✅ *Para finalizar la compra selecciona el método de pago:*`, botonesPago);

    // Aviso para ti
    ctx.telegram.sendMessage(TU_ID, `📥 *NUEVO PEDIDO*
👤 Cliente: ${ctx.from.first_name} (@${ctx.from.username || 'Sin usuario'})
🆔 ID: ${ctx.from.id}
📦 Producto: ${ctx.message.text}`);
  }
});

// ──────────────────────────────────────────────
// 💳 DATOS DE CADA MÉTODO DE PAGO
// ──────────────────────────────────────────────
bot.action('pago_paypal', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💳 *PAYPAL*
🔗 Enlace: https://www.paypal.me/dxntedomina

📌 Realiza el pago y envía aquí la captura o comprobante para confirmar tu pedido.`);
});

bot.action('pago_mexico', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 *TRANSFERENCIA MÉXICO*
🔢 Cuenta: 722969020420777451
👤 Titular: Cristal Castro

📌 Envía el comprobante de pago.`);
});

bot.action('pago_mercadopago', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💵 *MERCADO PAGO*
📩 Escríbeme para enviarte el enlace o datos de cobro.`);
});

bot.action('pago_zelle', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🔵 *ZELLE*
📱 Número: +1 (703) 232-7619
👤 Nombre: Jose Martinez

📌 Envía captura de la transacción.`);
});

bot.action('pago_nequi', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`📱 *NEQUI*
📲 Número: 3005729890
👤 Titular: Cris Ro

📌 Envía el comprobante aquí mismo.`);
});

bot.action('pago_bancolombia', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🏦 *BANCOLOMBIA*
🔢 Cuenta de ahorros: 50665712513
👤 Titular: Cristian David Romero Oviedo

📌 Envía el comprobante de pago.`);
});

bot.action('pago_remitly', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`💸 *REMITLY*
👤 Titular: Cristian David Romero Oviedo
📍 Ciudad: Sincelejo, Sucre - Colombia
🔢 Cuenta: 50665712513 (Ahorros)
🏦 Banco: Bancolombia
📞 Teléfono: +57 3005729890
📧 Correo: kstecri28@gmail.com

📌 Envía el comprobante de envío.`);
});

bot.action('pago_binance', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🪙 *BINANCE*
👤 Usuario: Dxnte_Ghxst
🆔 ID: 1083850312

📌 Envía captura de la transacción.`);
});

bot.action('pago_argentina', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🇦🇷 *TRANSFERENCIA ARGENTINA*
🏷️ Alias: nahuu13.mp
🔢 CVU: 0000003100074597562027
👤 Titular: Nahuel Alexis Lattanzio

📌 Envía el comprobante.`);
});

bot.action('pago_yape', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🇵🇪 *YAPE*
📱 Número: +51 926 720 632
👤 Titular: Ramon

📌 Envía captura del pago.`);
});

bot.action('pago_western', ctx => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🌍 *WESTERN UNION*
👤 Nombre: Cristian David Romero Oviedo
📍 País: Colombia
🏙️ Ciudad: Sincelejo, Sucre
📞 Teléfono: +57 3005729890
📧 Correo: kstecri28@gmail.com

📌 Envía el código de envío.`);
});

// ──────────────────────────────────────────────
// 📤 AVISO AL RECIBIR COMPROBANTE
// ──────────────────────────────────────────────
bot.on(['photo', 'document'], ctx => {
  const clienteId = ctx.from.id;
  const clienteNombre = ctx.from.first_name;
  const clienteUsuario = ctx.from.username || 'Sin usuario';

  ctx.telegram.sendMessage(TU_ID, `📤 *COMPROBANTE RECIBIDO*
👤 Cliente: ${clienteNombre} (@${clienteUsuario})
🆔 ID: ${clienteId}
✅ Para aprobar: /Aprobar ${clienteId}
❌ Para rechazar: /Rechazar ${clienteId} Motivo`);

  if (ctx.message.photo) {
    ctx.telegram.sendPhoto(TU_ID, ctx.message.photo[ctx.message.photo.length - 1].file_id);
  }
  if (ctx.message.document) {
    ctx.telegram.sendDocument(TU_ID, ctx.message.document.file_id);
  }

  ctx.reply('✅ Comprobante recibido correctamente. En breve revisaremos tu pago y te confirmaremos.');
});

// ──────────────────────────────────────────────
// ✅ COMANDOS DE ADMINISTRADOR
// ──────────────────────────────────────────────
bot.command('Aprobar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso para usar este comando.');
  const idCliente = ctx.message.text.split(' ')[1];
  if (!idCliente) return ctx.reply('⚠️ Usa así: /Aprobar ID_DEL_CLIENTE');
  ctx.telegram.sendMessage(idCliente, `✅ *PAGO APROBADO* 🎉
Tu pedido ha sido confirmado. En breve te enviaremos el servicio o los datos correspondientes.

¡Gracias por tu compra! 🤝`);
  ctx.reply(`✅ Pedido aprobado al usuario ID: ${idCliente}`);
});

bot.command('Rechazar', ctx => {
  if (ctx.from.id !== TU_ID) return ctx.reply('❌ No tienes permiso para usar este comando.');
  const partes = ctx.message.text.split(' ');
  const idCliente = partes[1];
  const motivo = partes.slice(2).join(' ') || 'No se pudo verificar la transacción.';
  if (!idCliente) return ctx.reply('⚠️ Usa así: /Rechazar ID_DEL_CLIENTE Motivo');
  ctx.telegram.sendMessage(idCliente, `❌ *PAGO NO APROBADO*
Motivo: ${motivo}

Si crees que hay un error, escríbenos a ${TU_USUARIO}`);
  ctx.reply(`❌ Pedido rechazado al usuario ID: ${idCliente}
Motivo: ${motivo}`);
});

// ──────────────────────────────────────────────
// 🚀 INICIAR EL BOT
// ──────────────────────────────────────────────
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
