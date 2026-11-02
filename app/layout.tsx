import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import SearchModal from '@/components/layout/SearchModal';
import ConsultationModal from '@/components/layout/ConsultationModal';
import { constructMetadata, generateLocalBusinessSchema } from '@/models/seo';
import { getSettings } from '@/models/content';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/',
    'S.M. Sanjna Interior Designer | Luxury Interiors & Handcrafted Furniture',
    'Transform your space into something extraordinary. Delhi NCR’s premier interior architecture studio and luxury furniture maker.'
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: Record<string, string> = {};
  try {
    settings = await getSettings();
  } catch (e) {
    // Fallback if db is temporarily unreachable
  }

  const announcement = settings.hero_announcement || '✨ Complimentary 3D Spatial Consultation & ₹10,000 Voucher on Complete Full-Home Interiors this Season';
  const phone = settings.contact_phone || '+91 90454 49196';
  const email = settings.contact_email || 'info@smsanjna.com';
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-cream-light text-walnut-dark antialiased min-h-screen flex flex-col justify-between selection:bg-gold selection:text-walnut-dark">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar announcement={announcement} phone={phone} email={email} />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileBottomNav />
              <FloatingWhatsApp />
              <SearchModal />
              <ConsultationModal />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

