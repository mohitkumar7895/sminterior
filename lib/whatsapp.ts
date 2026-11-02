export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919045449196';
export const DISPLAY_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 9045449196';

/**
 * Returns a wa.me URL with pre-filled message
 */
export function getWhatsAppUrl(message: string, phone: string = WHATSAPP_PHONE): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Open WhatsApp with a pre-filled formatted lead/inquiry message
 */
export function openWhatsAppLead(message: string, phone: string = WHATSAPP_PHONE): string {
  const url = getWhatsAppUrl(message, phone);
  if (typeof window !== 'undefined') {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    // If popup was blocked by browser, we can also provide the url for direct linking
    if (!win) {
      window.location.href = url;
    }
  }
  return url;
}
