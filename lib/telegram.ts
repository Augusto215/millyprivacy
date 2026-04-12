const BOT_TOKEN = "8277771041:AAFAcOyoWFl-SGoO1MfHjZwWabuTXTjI4OY";
const CHAT_ID = "-1003628669885";

export async function sendSaleNotification(amount: number, identifier: string, page: string | null, plan: string | null = null) {
  const text =
    `💰 *Nova venda!*\n` +
    (page ? `📄 Página: *${page}*\n` : "") +
    (plan ? `🎯 Plano: *${plan}*\n` : "") +
    `🔑 Código: \`${identifier}\`\n` +
    `💵 Valor: *R$ ${amount.toFixed(2).replace(".", ",")}*`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "Markdown",
    }),
  });
}
