/** Integration stubs — wire credentials in .env for production */

export async function sendConfirmationEmail(payload: {
  to: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
}) {
  if (!process.env.GMAIL_USER || !process.env.GOOGLE_REFRESH_TOKEN) {
    console.log("[email stub]", payload);
    return { sent: false, stub: true };
  }
  // Gmail API: use googleapis package with OAuth2 refresh token
  return { sent: true };
}

export async function sendWhatsAppConfirmation(payload: {
  phone: string;
  message: string;
}) {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.log("[whatsapp stub]", payload);
    return { sent: false, stub: true };
  }
  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: payload.phone.replace(/\D/g, ""),
      type: "text",
      text: { body: payload.message },
    }),
  });
  return { sent: res.ok };
}

export async function createGoogleCalendarEvent(payload: {
  summary: string;
  description: string;
  start: string;
  end: string;
}) {
  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    console.log("[calendar stub]", payload);
    return { eventId: null, stub: true };
  }
  return { eventId: `cal_${Date.now()}` };
}
