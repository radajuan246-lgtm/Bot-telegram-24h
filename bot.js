const { Telegraf } = require('telegraf');

// ⚠️ CONFIGURA AQUÍ TUS DATOS
const bot = new Telegraf('8456580231:AAG1WSPgxlscVJj__af1xq_W_sANVkIXjpg'); // Pon tu token entre comillas
const TU_USUARIO = "@Cajicahex"; // Tu usuario de Telegram para que te contacten
const TU_ID = 8830576173; // Pon tu ID numérico de Telegram para recibir pedidos

// ──────────────────────────────────────────────
// 🛒 LISTA DE PRODUCTOS Y PRECIOS
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
Precio: A consultar según tiempo y uso`,

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

  private: `🔒 *PRIVATE*
├─ TEMPORADA → 50 USD
└─ PERMANENTE → 80 USD
✅ Servicio exclusivo y sin compartir`,

  proyecto_panel: `🚀 *PROYECTO PANEL*
├─ Básico → 30 USD
└─ Supreme → 65 USD
⚙️ Configuración y desarrollo completo`
};

// ──────────────────────────────────────────────
// 📋 COMANDOS Y MENÚS
// ──────────────────────────────────────────────
bot.command('start', ctx => {
  ctx.replyWithMarkdown(`👋 *¡Bienvenido!* 🛒

Aquí encuentras todos los servicios y herramientas que necesitas.

📋 Usa estos comandos para ver todo:
/lista → Ver todos los productos
/panel → Ver paneles disponibles
/ff → Productos de Free Fire
/otros → Bypass, Proxy, Private y Proyectos
/pagos → Métodos de pago
/contacto → Hablar conmigo directamente`);
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

📩 Para pedidos o dudas: ${TU_USUARIO}`);
});

bot.command('panel', ctx => {
  ctx.replyWithMarkdown(`📌 *PANELES DISPONIBLES*

${PRODUCTOS.panel_extreme}

${PRODUCTOS.panel_basico}`);
});

bot.command('ff', ctx => {
  ctx.replyWithMarkdown(`🎮 *FREE FIRE*

${PRODUCTOS.cuentas_ff}

${PRODUCTOS.diamantes_ff}`);
});

bot.command('otros', ctx => {
  ctx.replyWithMarkdown(`🔧 *OTROS SERVICIOS*

${PRODUCTOS.bypass}

${PRODUCTOS.proxy_ios}

${PRODUCTOS.private}

${PRODUCTOS.proyecto_panel}`);
});

bot.command('pagos', ctx => {
  ctx.replyWithMarkdown(`💳 *MÉTODOS DE PAGO* ✅

Aceptamos:
• Nequi
• Bancolombia
• Daviplata
• Transferencia internacional

📌 Al confirmar tu pedido te envío los datos exactos.`);
});

bot.command('contacto', ctx => {
  ctx.replyWithMarkdown(`📞 *ATENCIÓN AL CLIENTE*

Puedes escribirme directamente aquí:
👉 ${TU_USUARIO}

⏰ Horario: Todos los días de 8:00 AM a 10:00 PM`);
});

// ──────────────────────────────────────────────
// 📩 RECIBIR PEDIDOS (AVISO PARA TI)
// ──────────────────────────────────────────────
bot.command('pedido', ctx => {
  const texto = ctx.message.text.split(' ').slice(1).join(' ');
  if (!texto) {
    return ctx.reply('⚠️ Escribe lo que quieres pedir. Ejemplo: /pedido Panel Extreme 1 mes');
  }

  // Avisarte a ti
  ctx.telegram.sendMessage(TU_ID, `📥 *NUEVO PEDIDO*
👤 Usuario: ${ctx.from.first_name} (@${ctx.from.username || 'Sin usuario'})
📝 Pide: ${texto}`);

  // Responder al cliente
  ctx.replyWithMarkdown(`✅ *Pedido recibido correctamente*

En breve te responderé con los datos de pago y confirmación.

Gracias por confiar en nosotros 🤝`);
});

// ──────────────────────────────────────────────
// 🚀 INICIAR EL BOT
// ──────────────────────────────────────────────
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log('✅ Bot de ventas funcionando correctamente');
