const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function seedDB() {
  console.log('Connecting to MySQL svinterior for seeding...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'svinterior',
  });

  try {
    console.log('Clearing old sample records if any...');
    // Disable foreign key checks for clean wipe and re-seed
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    const tables = [
      'product_images', 'product_variants', 'order_items', 'payments', 'orders',
      'cart_items', 'carts', 'wishlist_items', 'wishlists', 'products',
      'subcategories', 'categories', 'project_images', 'projects', 'services',
      'testimonials', 'blogs', 'blog_categories', 'banners', 'homepage_sections',
      'navigation_menus', 'pages', 'seo_metadata', 'faqs', 'inquiries',
      'consultations', 'quotations', 'coupons', 'newsletter_subscribers',
      'settings', 'contact_details', 'admins', 'users', 'roles'
    ];
    for (const table of tables) {
      await connection.query(`TRUNCATE TABLE \`${table}\`;`);
    }
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('1. Seeding Roles & Admins...');
    await connection.query(`
      INSERT INTO roles (name, description) VALUES
      ('superadmin', 'Full system super administrator'),
      ('admin', 'General website & store administrator'),
      ('designer', 'Design staff member'),
      ('customer', 'Store customer');
    `);

    const adminHash = bcrypt.hashSync('admin123', 10);
    await connection.query(`
      INSERT INTO admins (name, email, password_hash, role) VALUES
      ('Sanjna Sharma (Principal Designer)', 'admin@smsanjna.com', ?, 'superadmin');
    `, [adminHash]);

    console.log('2. Seeding Contact Details & Settings...');
    await connection.query(`
      INSERT INTO contact_details (
        company_name, phone_primary, phone_secondary, email_primary, email_support,
        address_line1, address_line2, city, state, postal_code,
        google_maps_url, opening_hours, instagram_url, facebook_url, pinterest_url, linkedin_url, youtube_url
      ) VALUES (
        'S.M. Sanjna Interior Designer',
        '+91 90454 49196',
        '+91 11 4567 8900',
        'info@smsanjna.com',
        'concierge@smsanjna.com',
        'Atelier & Studio, 42 Heritage Grand Boulevard',
        'Near Luxury Promenade, South Extension II',
        'New Delhi',
        'Delhi NCR',
        '110049',
        'https://maps.google.com',
        'Monday – Saturday: 10:00 AM – 8:00 PM | Sunday: By Private Appointment',
        'https://instagram.com',
        'https://facebook.com',
        'https://pinterest.com',
        'https://linkedin.com',
        'https://youtube.com'
      );
    `);

    await connection.query(`
      INSERT INTO settings (setting_key, setting_value, setting_group, description) VALUES
      ('site_name', 'S.M. Sanjna Interior Designer', 'general', 'Public brand name'),
      ('site_tagline', 'Bespoke Luxury Interiors & Fine Handcrafted Furniture', 'general', 'Brand slogan'),
      ('currency_symbol', '₹', 'ecommerce', 'Currency symbol'),
      ('currency_code', 'INR', 'ecommerce', 'ISO currency code'),
      ('enable_cod', 'true', 'ecommerce', 'Allow Cash On Delivery'),
      ('free_shipping_threshold', '25000', 'ecommerce', 'Order value in INR for free white-glove shipping'),
      ('flat_shipping_rate', '1500', 'ecommerce', 'Flat standard shipping fee'),
      ('tax_percentage', '18', 'ecommerce', 'Standard GST percentage for furniture'),
      ('razorpay_key_id', 'rzp_test_placeholder_key', 'payment', 'Razorpay Public Key ID'),
      ('razorpay_key_secret', 'rzp_test_placeholder_secret', 'payment', 'Razorpay Key Secret'),
      ('hero_announcement', '✨ Complimentary 3D Spatial Consultation & ₹10,000 Voucher on Full-Home Turnkey Projects this Season', 'announcement', 'Announcement Bar text');
    `);

    console.log('3. Seeding Categories & Subcategories...');
    const [catResult] = await connection.query(`
      INSERT INTO categories (name, slug, description, image, is_featured, display_order) VALUES
      ('Living Room Furniture', 'living-room-furniture', 'Sculptural sofas, artisan coffee tables, and heirloom entertainment credenzas engineered for luxury living.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', 1, 1),
      ('Bedroom Furniture', 'bedroom-furniture', 'Sanctuary beds, floating nightstands, and dressing suites enveloped in natural oak, brass, and velvet.', 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80', 1, 2),
      ('Modular Kitchens', 'modular-kitchens', 'German-precision hardware, quartz island counters, and custom acrylic or veneer cabinetry designed for gourmet living.', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', 1, 3),
      ('Dining Room Furniture', 'dining-room-furniture', 'Solid Burma teak tables, Italian Carrara marble dining surfaces, and ergonomically tailored host chairs.', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80', 1, 4),
      ('Luxury Wardrobes', 'luxury-wardrobes', 'Walk-in dressing rooms, smoked-glass sliding closets, and integrated warm LED velvet-lined jewelry drawers.', 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80', 1, 5),
      ('Office & Study Furniture', 'office-study-furniture', 'Executive walnut desks, bespoke library shelving, and ergonomic executive leather seating.', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', 1, 6),
      ('Kitchen Hardware & Parts', 'kitchen-hardware-parts', 'Silent soft-close hinges, servo-drive pull-out pantries, designer fluted brass handles, and cutlery inserts.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', 1, 7),
      ('Custom Wooden Craft', 'custom-wooden-furniture', 'Bespoke hand-carved accents, fluted solid wood partition screens, and custom commissioned statement pieces.', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80', 1, 8);
    `);

    // Fetch category IDs
    const [cats] = await connection.query('SELECT id, slug FROM categories');
    const catMap = {};
    cats.forEach(c => { catMap[c.slug] = c.id; });

    await connection.query(`
      INSERT INTO subcategories (category_id, name, slug, description, display_order) VALUES
      (${catMap['living-room-furniture']}, 'Luxury Sofas & Sectionals', 'sofas-sectionals', 'Down-feather plush sectionals and curved bouclé statement sofas', 1),
      (${catMap['living-room-furniture']}, 'Artisan Coffee Tables', 'coffee-tables', 'Travertine, fluted oak, and smoked-mirror coffee tables', 2),
      (${catMap['living-room-furniture']}, 'TV Entertainment Units', 'tv-entertainment-units', 'Floating wall panels, acoustic slatted consoles, and LED backlighting', 3),
      (${catMap['living-room-furniture']}, 'Accent & Lounge Chairs', 'accent-chairs', 'Hand-stitched full-grain leather and organic curved lounge chairs', 4),

      (${catMap['bedroom-furniture']}, 'King & Queen Beds', 'king-queen-beds', 'Upholstered headboards, solid teak platforms, and floating bedframes', 1),
      (${catMap['bedroom-furniture']}, 'Designer Nightstands', 'nightstands', 'Fluted drawer nightstands with wireless charging & brass hardware', 2),
      (${catMap['bedroom-furniture']}, 'Dressers & Vanity Units', 'dressers-vanities', 'Integrated LED halo mirrors and cashmere lacquer finish vanity tables', 3),

      (${catMap['modular-kitchens']}, 'Island Modular Kitchens', 'island-kitchens', 'Spacious chef islands with waterfall quartz and built-in induction', 1),
      (${catMap['modular-kitchens']}, 'L-Shaped Modular Kitchens', 'l-shaped-kitchens', 'Ergonomic corner optimization with premium Blum servo systems', 2),
      (${catMap['modular-kitchens']}, 'Parallel & Gallery Kitchens', 'parallel-kitchens', 'Streamlined dual-counter layout for high efficiency cooking', 3),

      (${catMap['luxury-wardrobes']}, 'Walk-In Dressing Rooms', 'walk-in-dressing-rooms', 'Custom island display cabinets, illuminated hangers, and accessory drawers', 1),
      (${catMap['luxury-wardrobes']}, 'Sliding Glass Wardrobes', 'sliding-glass-wardrobes', 'Aero-light anodized aluminum frames with fluted smoked glass doors', 2),

      (${catMap['kitchen-hardware-parts']}, 'Soft-Close Drawer Systems', 'soft-close-drawers', 'Tandembox runner systems with 50kg load capacity and silent closure', 1),
      (${catMap['kitchen-hardware-parts']}, 'Pantry Pull-Outs & Carousels', 'pantry-pull-outs', 'Blind-corner magic corners, tall larder units, and wire racks', 2),
      (${catMap['kitchen-hardware-parts']}, 'Architectural Knobs & Pulls', 'knobs-pulls', 'Solid milled brushed brass, champagne bronze, and knurled handles', 3),

      (${catMap['custom-wooden-furniture']}, 'Solid Teak Dining Tables', 'teak-dining-tables', 'Hand-selected natural grain slabs with brass inlay details', 1),
      (${catMap['custom-wooden-furniture']}, 'Handcrafted Wooden Partitions', 'wooden-partitions', 'Acoustic fluted batten dividers and rotating louvers', 2);
    `);

    console.log('4. Seeding Products & Images & Variants...');
    const productsData = [
      {
        name: 'The Aurelia Curved Bouclé Sofa',
        slug: 'aurelia-curved-boucle-sofa',
        short_description: 'An organic sculptural centerpiece upholstered in French textured bouclé with a hidden solid kiln-dried birch frame.',
        description: 'Imbue your living sanctum with effortless Parisian elegance. The Aurelia features undulating curvilinear geometry inspired by European mid-century modernism. Built with a heavy-duty kiln-dried hardwood skeleton and layered high-resilience memory foam topped with hypoallergenic goose down, it balances architectural drama with sink-in comfort. Accented with a recessed brushed-brass plinth base that appears to float above the floor.',
        category_slug: 'living-room-furniture',
        base_price: 185000,
        discount_price: 165000,
        sku: 'SMS-SOFA-AUR-01',
        stock: 8,
        featured: 1,
        dimensions: 'W 280cm x D 115cm x H 78cm | Seat Height: 44cm',
        material: 'Premium Textured Italian Bouclé, Solid Kiln-Dried Birch Wood, Brushed Brass Base',
        finish: 'Ivory Cream / Brushed Satin Brass',
        warranty: '10-Year Frame & Structural Warranty',
        delivery_time: '10-15 Business Days (White Glove Assembled)',
        care_instructions: 'Vacuum gently with a soft upholstery brush. Spot clean with dry solvent cleaner. Avoid direct prolonged sunlight exposure.',
        tags: 'living room, luxury sofa, boucle, curved, brass, featured',
        images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Size', value: '3-Seater (240cm)', price_adj: -20000, sku: 'SMS-SOFA-AUR-3' },
          { type: 'Size', value: '4-Seater (280cm)', price_adj: 0, sku: 'SMS-SOFA-AUR-4' },
          { type: 'Color', value: 'Champagne Ivory Bouclé', price_adj: 0, sku: 'SMS-SOFA-AUR-IV' },
          { type: 'Color', value: 'Warm Oatmeal Taupe', price_adj: 5000, sku: 'SMS-SOFA-AUR-TP' }
        ]
      },
      {
        name: 'The Sovereign Solid Teak & Brass Bed',
        slug: 'sovereign-solid-teak-brass-bed',
        short_description: 'Hand-joined plantation Burma teak bedstead featuring an upholstered fluted velvet headboard with inlaid brushed gold brass accents.',
        description: 'Commanding and tranquil, the Sovereign bed is an homage to timeless artisanal woodwork. Each board is hand-milled from sustainable, aged Burma teak wood, celebrating the wood’s natural golden amber grain and aromatic resins. The floating headboard integrates warm 2700K concealed reading lights and dual AC/USB-C charging hubs concealed behind flush teak flaps.',
        category_slug: 'bedroom-furniture',
        base_price: 210000,
        discount_price: 189000,
        sku: 'SMS-BED-SOV-02',
        stock: 5,
        featured: 1,
        dimensions: 'King Size: W 205cm x L 225cm x H 135cm (Mattress fit: 198 x 182 cm)',
        material: '100% Solid Burma Teak Wood, Belgian Velvet Upholstery, PVD Gold Inlay',
        finish: 'Hand-Rubbed Natural Matte Polyurethane & Natural Teak Oil',
        warranty: '15-Year Solid Wood Termite & Structural Guarantee',
        delivery_time: '14-21 Business Days',
        care_instructions: 'Dust regularly with a dry microfiber cloth. Nourish wood twice a year with natural beeswax polish.',
        tags: 'bedroom, teak bed, luxury furniture, king bed, brass inlay, featured',
        images: [
          '/images/products/sovereign-bed-main.jpg',
          '/images/products/sovereign-bed-detail.jpg',
          'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Size', value: 'King Size (78" x 72")', price_adj: 0, sku: 'SMS-BED-SOV-K' },
          { type: 'Size', value: 'Super King (84" x 78")', price_adj: 25000, sku: 'SMS-BED-SOV-SK' },
          { type: 'Headboard Fabric', value: 'Smoked Amber Velvet', price_adj: 0, sku: 'SMS-BED-SOV-AMB' },
          { type: 'Headboard Fabric', value: 'Ecru Linen Bouclé', price_adj: 8000, sku: 'SMS-BED-SOV-ECR' }
        ]
      },
      {
        name: 'The Milano Gourmet Quartz Island Kitchen',
        slug: 'milano-gourmet-quartz-island-kitchen',
        short_description: 'Custom turnkey modular kitchen with Italian Calacatta gold quartz waterfall counters and anti-fingerprint acrylic cabinetry.',
        description: 'The pinnacle of culinary architecture. Designed with a seamless handle-free Gola profile, soft-closing Blumotion hardware, integrated pull-out pantries, spice organizers, and acoustic noise-dampened under-mount Franke sink. Configured with bespoke cabinet internals tailored to Indian gourmet cooking with heavy-load tandem drawers and moisture-resistant Marine Grade BWP ply core.',
        category_slug: 'modular-kitchens',
        base_price: 450000,
        discount_price: 395000,
        sku: 'SMS-KTCH-MIL-03',
        stock: 12,
        featured: 1,
        dimensions: 'Custom Modular Configuration (Standard Island: 300cm x 110cm x 90cm)',
        material: 'IS:710 Marine Grade BWP Plywood, Anti-Fingerprint Thermal Laminate & Acrylic, 20mm Calacatta Quartz',
        finish: 'Cashmere Grey & Fluted Natural Walnut with Gold Accents',
        warranty: '10-Year Water-Resistance & Lifetime Hardware Warranty',
        delivery_time: '25-30 Business Days (Turnkey Installed)',
        care_instructions: 'Clean surfaces with mild soapy water and microfiber cloth. Quartz counters are heat resistant up to 180°C.',
        tags: 'modular kitchen, island kitchen, luxury kitchen, quartz, blum, featured',
        images: [
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Layout', value: 'L-Shaped with Island', price_adj: 0, sku: 'SMS-KTCH-MIL-L' },
          { type: 'Layout', value: 'Parallel Chef Layout', price_adj: -35000, sku: 'SMS-KTCH-MIL-P' },
          { type: 'Countertop', value: 'Calacatta Gold Quartz', price_adj: 0, sku: 'SMS-KTCH-MIL-CAL' },
          { type: 'Countertop', value: 'Nero Marquina Black Quartz', price_adj: 15000, sku: 'SMS-KTCH-MIL-NER' }
        ]
      },
      {
        name: 'The Versailles Carrara Marble 8-Seater Dining Table',
        slug: 'versailles-carrara-marble-dining-table',
        short_description: 'Sculpted dining table featuring a 35mm beveled solid Italian Carrara marble slab atop fluted American walnut twin pedestals.',
        description: 'Create unforgettable banquet memories around the Versailles dining table. The pristine Bianco Carrara marble surface is hand-polished and treated with a nanotech anti-stain hydro-repellent sealant to resist red wine and turmeric. Supported by substantial architectural pedestals hand-clad in solid fluted American black walnut with a brushed champagne-gold collar.',
        category_slug: 'dining-room-furniture',
        base_price: 245000,
        discount_price: 215000,
        sku: 'SMS-DINE-VER-04',
        stock: 4,
        featured: 1,
        dimensions: 'L 240cm x W 110cm x H 76cm | Weight: 185kg',
        material: 'Imported Grade-A Italian Carrara White Marble, Solid American Walnut, Steel Core Skeleton',
        finish: 'Honed Matte Silk Stone Finish / Natural Dark Walnut Stain',
        warranty: '10-Year Marble Structure & Base Stability Guarantee',
        delivery_time: '12-18 Business Days (Includes Specialist Assembly)',
        care_instructions: 'Wipe with pH-neutral stone cleaner. Use coasters and trivets for piping hot cookware.',
        tags: 'dining table, marble dining, 8 seater, luxury, walnut, featured',
        images: [
          'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Size', value: '6-Seater (200cm)', price_adj: -30000, sku: 'SMS-DINE-VER-6' },
          { type: 'Size', value: '8-Seater (240cm)', price_adj: 0, sku: 'SMS-DINE-VER-8' },
          { type: 'Size', value: '10-Seater (290cm)', price_adj: 45000, sku: 'SMS-DINE-VER-10' }
        ]
      },
      {
        name: 'The Lumina Smoked Glass Walk-In Wardrobe',
        slug: 'lumina-smoked-glass-walk-in-wardrobe',
        short_description: 'Haute couture dressing closet with floor-to-ceiling smoked tempered glass, integrated LED mullions, and velvet accessory drawers.',
        description: 'Transform your morning routine into a high-fashion atelier experience. The Lumina walk-in wardrobe system combines aviation-grade ultra-slim black aluminum frames with 8mm tempered grey smoked glass doors. Each interior bay is outfitted with concealed infrared sensor LEDs, genuine suede-lined watch and jewelry drawers, pull-down hydraulic wardrobe lifters, and ventilated shoe gallery shelves.',
        category_slug: 'luxury-wardrobes',
        base_price: 380000,
        discount_price: 340000,
        sku: 'SMS-WARD-LUM-05',
        stock: 6,
        featured: 1,
        dimensions: 'Bespoke Custom Modular Bay (Standard 4-Bay: W 360cm x H 270cm x D 62cm)',
        material: 'Tempered 8mm Smoked Gray Glass, Anodized Powder-Coated Aluminum, Moisture-Resistant HDHMR, Microfiber Suede',
        finish: 'Matte Charcoal & Champagne Bronze Hardware',
        warranty: '10-Year Glass & Hardware Guarantee',
        delivery_time: '20-25 Business Days (Tailored On-Site Installation)',
        care_instructions: 'Clean glass with lint-free microfiber and ammonia-free glass cleaner.',
        tags: 'wardrobe, walk in closet, glass wardrobe, luxury dressing, led, featured',
        images: [
          'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Glass Tint', value: 'Smoked Gray Glass', price_adj: 0, sku: 'SMS-WARD-LUM-GRY' },
          { type: 'Glass Tint', value: 'Fluted Bronze Glass', price_adj: 20000, sku: 'SMS-WARD-LUM-BRZ' },
          { type: 'Interior Finish', value: 'Smoked Oak Veneer', price_adj: 0, sku: 'SMS-WARD-LUM-OAK' },
          { type: 'Interior Finish', value: 'Cashmere Beige Velvet', price_adj: 18000, sku: 'SMS-WARD-LUM-VLV' }
        ]
      },
      {
        name: 'The Artisan Fluted Walnut Credenza & TV Console',
        slug: 'artisan-fluted-walnut-credenza-tv-console',
        short_description: 'Low-slung entertainment console crafted with precision-cut solid wood flutes, acoustic fabric grille, and satin brass feet.',
        description: 'Harmonize your entertainment space with an acoustic-first masterpiece. The Artisan Credenza is hand-assembled with solid American black walnut fluted slats wrapped around gentle radius corners. The center bay features acoustically transparent speaker fabric allowing remotes and soundbars to function without opening doors. Concealed rear cord management conduits keep messy wires totally invisible.',
        category_slug: 'living-room-furniture',
        base_price: 115000,
        discount_price: 98000,
        sku: 'SMS-CRE-ART-06',
        stock: 9,
        featured: 1,
        dimensions: 'W 220cm x D 48cm x H 52cm',
        material: 'Solid American Walnut, Engineered Hardwood Veneer, Acoustic Weave Grille, Cast Brass Legs',
        finish: 'Silk Matte Natural Walnut / Brushed Gold Hardware',
        warranty: '7-Year Craftsmanship Warranty',
        delivery_time: '7-12 Business Days',
        care_instructions: 'Avoid harsh chemical sprays. Polish with soft cloth and lemon oil quarterly.',
        tags: 'tv unit, credenza, walnut console, acoustic console, fluted wood, living room',
        images: [
          'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Length', value: '200cm (For TVs up to 75")', price_adj: -10000, sku: 'SMS-CRE-ART-200' },
          { type: 'Length', value: '240cm (For TVs up to 85")', price_adj: 12000, sku: 'SMS-CRE-ART-240' },
          { type: 'Wood', value: 'Natural Walnut', price_adj: 0, sku: 'SMS-CRE-ART-WAL' },
          { type: 'Wood', value: 'Smoked Ash Charcoal', price_adj: 5000, sku: 'SMS-CRE-ART-ASH' }
        ]
      },
      {
        name: 'The Elysian Sculptural Travertine Coffee Table Set',
        slug: 'elysian-sculptural-travertine-coffee-table',
        short_description: 'Nesting duo of raw-edge Roman travertine marble tables with monolithic pillared bases.',
        description: 'Channeling ancient Mediterranean stonework, the Elysian nesting coffee table set presents two interlocking levels crafted from authentic Italian silver-beige Roman travertine. Unfilled natural pores and softly honed surfaces celebrate the millions-of-years geological beauty of real limestone. A conversation piece in any luxury minimalist living room.',
        category_slug: 'living-room-furniture',
        base_price: 89000,
        discount_price: 79000,
        sku: 'SMS-TBL-ELY-07',
        stock: 7,
        featured: 0,
        dimensions: 'Primary: Dia 90cm x H 38cm | Companion: Dia 65cm x H 44cm',
        material: '100% Natural Italian Beige Roman Travertine Stone',
        finish: 'Honed Matte Unfilled Natural Stone Finish',
        warranty: '5-Year Stone Integrity Warranty',
        delivery_time: '7-10 Business Days',
        care_instructions: 'Sealed against common spills. Wipe clean immediately with moist cloth. Use trivets.',
        tags: 'coffee table, travertine, stone table, nesting table, luxury decor',
        images: [
          'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Stone Tone', value: 'Warm Beige Travertine', price_adj: 0, sku: 'SMS-TBL-ELY-BGE' },
          { type: 'Stone Tone', value: 'Silver Grey Travertine', price_adj: 6000, sku: 'SMS-TBL-ELY-GRY' }
        ]
      },
      {
        name: 'The Chancellor Executive Leather & Rosewood Desk',
        slug: 'chancellor-executive-leather-rosewood-desk',
        short_description: 'Monumental executive desk with inlaid saddle-leather writing pad, wireless power pad, and locking filing bays.',
        description: 'A throne for modern visionaries. The Chancellor executive desk pairs rich Indian rosewood (Sheesham) with hand-stitched cognac full-grain leather. Designed for effortless command, it features an integrated Qi fast-charging hotspot beneath the leather blotter, touch-to-open motorized privacy drawer with biometric fingerprint lock, and discreet ventilation channels for power towers.',
        category_slug: 'office-study-furniture',
        base_price: 195000,
        discount_price: 175000,
        sku: 'SMS-DSK-CHN-08',
        stock: 5,
        featured: 1,
        dimensions: 'L 220cm x W 95cm x H 76cm',
        material: 'Aged Indian Rosewood (Sheesham), Italian Vegetable-Tanned Saddle Leather, Brass Fixtures',
        finish: 'Satin Hand-Rubbed Lacquer / Cognac Leather',
        warranty: '10-Year Woodwork & Mechanism Warranty',
        delivery_time: '14-20 Business Days',
        care_instructions: 'Treat leather with specialized balm every 6 months. Keep wood hydrated with beeswax.',
        tags: 'office desk, executive desk, study, leather desk, rosewood, study room',
        images: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Leather Color', value: 'Vintage Cognac Brown', price_adj: 0, sku: 'SMS-DSK-CHN-CGN' },
          { type: 'Leather Color', value: 'Midnight Onyx Black', price_adj: 5000, sku: 'SMS-DSK-CHN-BLK' }
        ]
      },
      {
        name: 'The Magic Corner Pro Carousel Kitchen Hardware',
        slug: 'magic-corner-pro-carousel-kitchen-hardware',
        short_description: 'Heavy-duty German-engineered blind corner pull-out carousel system with hydraulic soft dampening.',
        description: 'Say goodbye to dead space in your modular kitchen. The Magic Corner Pro brings rear cabinet contents smoothly into the light with a gentle tug. Features titanium-grey anti-slip trays, heavy 35kg carrying capacity per basket, and full synchrony soft-close closing buffers.',
        category_slug: 'kitchen-hardware-parts',
        base_price: 36000,
        discount_price: 29500,
        sku: 'SMS-HDW-CRN-09',
        stock: 25,
        featured: 0,
        dimensions: 'Fits standard 900mm & 1000mm base corner cabinets (Door width min 450mm)',
        material: 'High-Tensile Cold Rolled Steel with Nano-Coated Anthracite Finish & Tempered Solid Bases',
        finish: 'Anthracite Titanium Grey & Polished Chrome Edge',
        warranty: '10-Year Mechanism Replacement Guarantee',
        delivery_time: '3-5 Business Days',
        care_instructions: 'Wipe wire racks with damp cloth. Lubricate moving hinges annually.',
        tags: 'kitchen hardware, magic corner, blind corner, pullout, modular kitchen parts',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Orientation', value: 'Right Opening Mechanism', price_adj: 0, sku: 'SMS-HDW-CRN-R' },
          { type: 'Orientation', value: 'Left Opening Mechanism', price_adj: 0, sku: 'SMS-HDW-CRN-L' }
        ]
      },
      {
        name: 'Bespoke Fluted Teak Rotating Room Divider Screen',
        slug: 'bespoke-fluted-teak-rotating-room-divider',
        short_description: 'Ceiling-to-floor custom architectural room partition with 360-degree rotating solid teak wood acoustic louvers.',
        description: 'An architectural statement that sculpts privacy without blocking daylight. Each vertical slat is milled from single-origin aged Burma teak with rounded aerodynamic edges. Connected to heavy-duty concealed brass pivot bearings at ceiling and floor, the louvers rotate smoothly by hand to modulate light, air, and view angles between dining and formal living areas.',
        category_slug: 'custom-wooden-furniture',
        base_price: 135000,
        discount_price: 120000,
        sku: 'SMS-SCR-DIV-10',
        stock: 10,
        featured: 1,
        dimensions: 'Custom built to ceiling height (Standard 10-Louver Unit: W 180cm x H 280cm)',
        material: 'Solid Burma Teak, Solid Brass Pivot Hardware, Heavy-Duty Floor Bearings',
        finish: 'Natural Matte Teak Polycoat / Satin Brass Hardware',
        warranty: '15-Year Solid Wood & Mechanism Warranty',
        delivery_time: '15-20 Business Days (Includes Site Laser Measurement & Installation)',
        care_instructions: 'Clean with soft feather duster or dry cloth.',
        tags: 'wooden partition, custom woodwork, room divider, teak louver, acoustic screen',
        images: [
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Height Range', value: 'Up to 9 Feet (275cm)', price_adj: 0, sku: 'SMS-SCR-DIV-9F' },
          { type: 'Height Range', value: 'Up to 11 Feet (335cm)', price_adj: 22000, sku: 'SMS-SCR-DIV-11F' }
        ]
      },
      {
        name: 'The Knurled Champagne Brass Architectural Handles (Set of 6)',
        slug: 'knurled-champagne-brass-architectural-handles',
        short_description: 'Milled solid brass luxury cabinet pull bars with diamond diamond-cut tactile knurling and anti-tarnish PVD coating.',
        description: 'Upgrade your kitchen cabinets and bespoke wardrobe doors with jewel-like tactile hardware. CNC-machined from solid naval-grade brass billets, each handle features cross-hatch diamond knurling that provides an unmatched grip and radiant light reflection.',
        category_slug: 'kitchen-hardware-parts',
        base_price: 12500,
        discount_price: 9900,
        sku: 'SMS-HDW-KNR-11',
        stock: 40,
        featured: 0,
        dimensions: 'Hole Centers: 160mm | Overall Length: 224mm | Bar Diameter: 14mm',
        material: '100% Solid Naval Brass with PVD Vacuum Plated Finish',
        finish: 'Champagne Warm Brass (Anti-Fingerprint Sealed)',
        warranty: 'Lifetime Corrosion & Tarnish Warranty',
        delivery_time: '2-4 Business Days',
        care_instructions: 'Clean with warm water and damp cloth. No chemical polish needed due to PVD protection.',
        tags: 'cabinet handles, brass knobs, hardware, knurled brass, luxury kitchen parts',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Length', value: '160mm (Center to Center)', price_adj: 0, sku: 'SMS-HDW-KNR-160' },
          { type: 'Length', value: '256mm (For Tall Wardrobes)', price_adj: 3500, sku: 'SMS-HDW-KNR-256' },
          { type: 'Finish', value: 'Champagne Brass', price_adj: 0, sku: 'SMS-HDW-KNR-BRS' },
          { type: 'Finish', value: 'Matte Gunmetal Black', price_adj: 0, sku: 'SMS-HDW-KNR-GUN' }
        ]
      },
      {
        name: 'The Valhalla Full-Grain Saddle Leather Armchair',
        slug: 'valhalla-full-grain-saddle-leather-armchair',
        short_description: 'Heritage lounge chair with hand-burnished vegetable-tanned leather and an exposed sculpted walnut frame.',
        description: 'An heirloom piece that gains character with every passing year. The Valhalla chair combines a sculpted American walnut structure featuring mortise-and-tenon joinery with thick 4mm saddle leather sling upholstery. The deep, gently reclined angle cradles the body with ergonomic perfection.',
        category_slug: 'living-room-furniture',
        base_price: 94000,
        discount_price: 84000,
        sku: 'SMS-CHR-VAL-12',
        stock: 6,
        featured: 1,
        dimensions: 'W 78cm x D 88cm x H 82cm | Seat Height: 41cm',
        material: 'American Black Walnut, 4mm Italian Full-Grain Vegetable-Tanned Cowhide Leather, Solid Brass Rivets',
        finish: 'Natural Matte Hard-Wax Oil / Hand-Burnished Whiskey Tan',
        warranty: '10-Year Frame & 5-Year Leather Warranty',
        delivery_time: '7-12 Business Days',
        care_instructions: 'Condition with leather wax once a year. Keep away from humid wet areas.',
        tags: 'armchair, leather lounge chair, walnut chair, reading chair, luxury living',
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
        ],
        variants: [
          { type: 'Leather Tone', value: 'Whiskey Tan Leather', price_adj: 0, sku: 'SMS-CHR-VAL-TAN' },
          { type: 'Leather Tone', value: 'Dark Chocolate Leather', price_adj: 3000, sku: 'SMS-CHR-VAL-CHO' }
        ]
      }
    ];

    for (const p of productsData) {
      const catId = catMap[p.category_slug];
      const [prodRes] = await connection.query(`
        INSERT INTO products (
          name, slug, short_description, description, category_id,
          base_price, discount_price, sku, stock_quantity, is_featured, is_in_stock,
          dimensions, material, finish, warranty, delivery_time, care_instructions, tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)
      `, [
        p.name, p.slug, p.short_description, p.description, catId,
        p.base_price, p.discount_price, p.sku, p.stock, p.featured,
        p.dimensions, p.material, p.finish, p.warranty, p.delivery_time, p.care_instructions, p.tags
      ]);

      const productId = prodRes.insertId;

      // Insert images
      for (let i = 0; i < p.images.length; i++) {
        await connection.query(`
          INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order)
          VALUES (?, ?, ?, ?, ?)
        `, [productId, p.images[i], `${p.name} - View ${i + 1}`, i === 0 ? 1 : 0, i]);
      }

      // Insert variants
      if (p.variants && p.variants.length > 0) {
        for (const v of p.variants) {
          await connection.query(`
            INSERT INTO product_variants (product_id, variant_type, variant_value, price_adjustment, sku, stock_quantity)
            VALUES (?, ?, ?, ?, ?, 10)
          `, [productId, v.type, v.value, v.price_adj, v.sku]);
        }
      }
    }

    console.log('5. Seeding All 14 Interior Design Services...');
    const servicesData = [
      {
        name: 'Complete Home Interior Design',
        slug: 'complete-home-interior-design',
        short_description: 'End-to-end turnkey architectural interiors designed, bespoke manufactured, and handed over to perfection.',
        full_description: 'Experience the pinnacle of full-residence transformation. From structural spatial re-planning, 3D photorealistic architectural renders, custom joinery, electrical & mood lighting schemes to soft furnishing curation. Our studio oversees every single detail with dedicated project managers, ensuring zero stress and turnkey handover within guaranteed timelines.',
        icon: 'Home',
        hero_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        starting_price: 750000,
        timeline: '8-16 Weeks',
        features: JSON.stringify([
          'Full 3D Architectural Visualizations & VR Walkthroughs',
          'Complete False Ceiling, HVAC & Multi-Layer Lighting Planning',
          'Bespoke Built-In Woodwork & Walk-in Dressing Suites',
          'Luxury Modular Kitchen & Designer Bathrooms',
          'Curated Imported Wallpaper, Textures & Art Consultation',
          'Dedicated On-Site Project Engineer & Daily WhatsApp Updates'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Consultation & Site Laser Measurement', desc: 'Understanding your lifestyle, aesthetic preference, budget, and architectural mapping.' },
          { step: '02', title: '3D Spatial Concepts & Mood Boards', desc: 'Presenting photorealistic 3D renders, material palettes, and lighting design schemes.' },
          { step: '03', title: 'Precision Joinery & Factory Fabrication', desc: 'Manufacturing high-grade German hardware cabinetry in our precision facility.' },
          { step: '04', title: 'Site Execution & Turnkey Handover', desc: 'Dust-free assembly, quality inspection checklist, and celebration handover.' }
        ])
      },
      {
        name: 'Luxury Interior Design',
        slug: 'luxury-interior-design',
        short_description: 'Opulent, tailored spatial experiences for penthouses, signature villas, and sprawling heritage residences.',
        full_description: 'Tailored for discerning homeowners seeking exclusivity. We source rare Italian marbles, hand-carved teakwood details, exotic veneers, and gold leafing accents to curate one-of-a-kind sanctuaries that mirror your achievements.',
        icon: 'Crown',
        hero_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        starting_price: 1200000,
        timeline: '12-20 Weeks',
        features: JSON.stringify([
          'Italian Marble Flooring & Bookmatched Feature Walls',
          'Custom Commissioned Lighting Chandeliers & Sculptures',
          'Smart Home Automation (Lutron / Crestron Integration)',
          'Climate Controlled Wine Cellars & Private Home Theaters'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Private Creative Discovery', desc: 'In-depth lifestyle mapping and haute design brief development.' },
          { step: '02', title: 'Material Sourcing in Verona & Milan', desc: 'Direct curation of bespoke slabs, fabrics, and European fixtures.' },
          { step: '03', title: 'Master Craftsmanship Execution', desc: 'Artisanal inlay, precision millwork, and flawless acoustic installation.' },
          { step: '04', title: 'White Glove Unveiling', desc: 'Styling, scent profiling, and private unveiling ceremony.' }
        ])
      },
      {
        name: 'Modular Kitchen Design',
        slug: 'modular-kitchen',
        short_description: 'Precision-engineered chef kitchens with smart storage, Blum motion technology, and quartz surfaces.',
        full_description: 'The kitchen is the beating heart of your home. We engineer modular kitchen sanctuaries that pair ergonomic workflow zones (prep, cook, clean, store) with showstopping aesthetic appeal. Built with 100% waterproof BWP marine ply, anti-scratch finishes, and silent soft-close systems.',
        icon: 'ChefHat',
        hero_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        starting_price: 350000,
        timeline: '4-6 Weeks',
        features: JSON.stringify([
          'German Blum / Hettich Soft-Close Hardware Guaranteed for Life',
          'Anti-Termite IS:710 Marine Grade BWP Structural Base',
          'Seamless Calacatta Gold or Black Quartz Waterfall Counters',
          'Concealed Pantry Larders, Spice Racks & Corner Magic Carousels'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Culinary Workflow Analysis', desc: 'Evaluating cooking habits, appliance sizes, and ergonomics.' },
          { step: '02', title: 'Zone Modeling & 3D Renders', desc: 'Optimizing the work triangle with photorealistic visualizations.' },
          { step: '03', title: 'Precision Factory CNC Machining', desc: 'Edge-banded laser sealing for zero water seepage.' },
          { step: '04', title: '48-Hour Rapid Site Installation', desc: 'Trained technicians install and test all moving mechanisms.' }
        ])
      },
      {
        name: 'Bedroom Interior Design',
        slug: 'bedroom-interior',
        short_description: 'Tranquil sanctuary suites with acoustic soundproofing, fluted headboards, and soothing ambient lighting.',
        full_description: 'Reclaim deep rest in a master suite designed as an oasis. We sculpt bedroom interiors that optimize acoustics, circadian lighting rhythms, and tactile comfort with fluted wood paneling, bespoke storage, and plush seating corners.',
        icon: 'BedDouble',
        hero_image: '/images/services/bedroom-interior.jpg',
        starting_price: 280000,
        timeline: '3-5 Weeks',
        features: JSON.stringify([
          'Acoustic Fabric & Fluted Wood Headboard Feature Walls',
          'Concealed Warm 2700K Reading & Mood Lights',
          'Integrated Floating Nightstands with Wireless Power',
          'Custom Dressing Mirror Stations with Anti-Glare Illumination'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Sanctuary Assessment', desc: 'Analyzing natural light, privacy requirements, and bed positioning.' },
          { step: '02', title: 'Custom Joinery Concept', desc: 'Designing headboard architecture, wardrobes, and bedside accents.' },
          { step: '03', title: 'Fabrication & Upholstery', desc: 'Crafting the bedstead and acoustic wall elements with luxury textiles.' },
          { step: '04', title: 'On-Site Fitting & Styling', desc: 'Complete placement with luxury bedding and ambient tuning.' }
        ])
      },
      {
        name: 'Living Room Interior Design',
        slug: 'living-room-interior',
        short_description: 'Conversational formal salons and contemporary family living rooms that make an unforgettable impression.',
        full_description: 'Where hospitality meets relaxed luxury. We craft living spaces featuring dramatic focal walls, acoustic entertainment credenzas, custom-tailored seating clusters, and layered architectural lighting.',
        icon: 'Sofa',
        hero_image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        starting_price: 320000,
        timeline: '4-6 Weeks',
        features: JSON.stringify([
          'Fluted Wall Cladding with Concealed LED Profiles',
          'Custom Acoustic TV Entertainment Consoles',
          'Sculptural Seating Arrangements with Premium Italian Upholstery',
          'Curated Natural Stone Coffee Tables & Accent Lighting'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Spatial Flow Mapping', desc: 'Balancing walking paths, seating capacity, and media viewing angles.' },
          { step: '02', title: '3D Aesthetic Modeling', desc: 'Selecting color palettes, wall treatments, and furniture dimensions.' },
          { step: '03', title: 'Custom Furniture Fabrication', desc: 'Handcrafting statement sofas, credenzas, and marble tables.' },
          { step: '04', title: 'Installation & Lighting Calibration', desc: 'Finishing touches with curated art, cushions, and ambient warmth.' }
        ])
      },
      {
        name: 'Office Interior Design',
        slug: 'office-interior',
        short_description: 'Inspiring executive suites, creative studios, and productive corporate workspaces.',
        full_description: 'Enhance productivity, leadership presence, and company morale with corporate interior architecture. We blend ergonomic task seating with statement boardroom tables, acoustic phone booths, and vibrant breakout lounges.',
        icon: 'Briefcase',
        hero_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        starting_price: 500000,
        timeline: '6-10 Weeks',
        features: JSON.stringify([
          'Executive Leadership Desks with Cable Conduits & Biometric Security',
          'Acoustic Glass Boardrooms & Video-Conference Optimization',
          'Ergonomic BIFMA-Certified Task Chairs',
          'Biophilic Indoor Greenery & Air Purifying Planters'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Capacity & Workflow Planning', desc: 'Mapping departmental adjacencies, collaboration zones, and quiet zones.' },
          { step: '02', title: '3D Floor Plan & Infrastructure Design', desc: 'Integrating high-speed data cabling, HVAC diffusers, and emergency exits.' },
          { step: '03', title: 'Rapid Offsite Modular Production', desc: 'Speedy assembly minimizing business downtime.' },
          { step: '04', title: 'Testing & Handover', desc: 'Complete IT testing and turnkey office walkthrough.' }
        ])
      },
      {
        name: 'Commercial Interior Design',
        slug: 'commercial-interior-design',
        short_description: 'High-impact retail boutiques, fine dining restaurants, luxury salons, and hospitality venues.',
        full_description: 'Commercial spaces engineered to captivate foot traffic, elevate your brand prestige, and drive high average transaction value. Every surface and light beam is calculated for maximum customer dwell time and Instagrammable moments.',
        icon: 'Building2',
        hero_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        starting_price: 650000,
        timeline: '6-12 Weeks',
        features: JSON.stringify([
          'High-Footfall Heavy Duty Commercial Flooring & Finishes',
          'Custom Point-of-Sale Counters with Concealed Cash Drawers',
          'Brand Identity Integration & Experiential Display Vitrines',
          'Compliant Fire, Electrical & Public Safety Certifications'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Brand Vision & Customer Journey', desc: 'Designing the visitor trajectory from storefront entrance to checkout.' },
          { step: '02', title: 'Visual Merchandising & Lighting', desc: 'Calculating Color Rendering Index (CRI > 95) for true product display.' },
          { step: '03', title: 'Fast-Track Fit-Out', desc: '24/7 round-the-clock shift execution to meet commercial mall deadlines.' },
          { step: '04', title: 'Opening Readiness Checklist', desc: 'Complete sparkle clean and launch-ready handover.' }
        ])
      },
      {
        name: 'Residential Interior Design',
        slug: 'residential-interior-design',
        short_description: 'Warm, timeless, and functional living spaces designed specifically for modern family dynamics.',
        full_description: 'Harmonious interiors crafted to nurture family life. We focus on durable, pet-and-child friendly high-performance materials without ever compromising on luxury aesthetics.',
        icon: 'Home',
        hero_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        starting_price: 450000,
        timeline: '6-12 Weeks',
        features: JSON.stringify([
          'Child & Pet-Friendly Stain Resistant Fabrics',
          'Smart Clutter-Free Storage throughout Hallways & Bedrooms',
          'Vastu-Compliant Spatial Orientations upon Request',
          'Energy-Efficient Thermal & Lighting Control'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Family Lifestyle Blueprint', desc: 'Mapping storage needs, hobby spaces, and daily routines.' },
          { step: '02', title: 'Space Plan & Material Selection', desc: 'Balancing warmth, durability, and visual serenity.' },
          { step: '03', title: 'Cabinetry & Wall Finishes', desc: 'Executing custom furniture and elegant wall treatments.' },
          { step: '04', title: 'Final Styling & Move-In', desc: 'Handing over a spotless home ready for your family memories.' }
        ])
      },
      {
        name: 'Furniture Manufacturing',
        slug: 'furniture-manufacturing',
        short_description: 'In-house precision factory crafting contract-grade bespoke luxury furniture and architectural joinery.',
        full_description: 'By operating our own state-of-the-art manufacturing facility, we eliminate middleman markups and maintain absolute control over timber seasoning, joint precision, foam density, and finish longevity.',
        icon: 'Hammer',
        hero_image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
        starting_price: 150000,
        timeline: '2-4 Weeks',
        features: JSON.stringify([
          'Kiln-Dried Hardwood with Moisture Content < 10%',
          'Italian Five-Axis CNC Precision Cutting',
          'Custom Stain Matching & Polyurethane Spray Booths',
          'High Resilience 40-Density Memory Foam Cushioning'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Shop Drawings & CAD Detailing', desc: 'Generating exploded 3D joinery diagrams and hardware specs.' },
          { step: '02', title: 'Timber Inspection & Cutting', desc: 'Selecting flaw-free logs and precision machining.' },
          { step: '03', title: 'Sanding & Multi-Coat Finishing', desc: 'Applying stain, sealer, and protective silk matte topcoats.' },
          { step: '04', title: 'Packaging & Direct Delivery', desc: 'Foam edge protection and wooden crating for safe transport.' }
        ])
      },
      {
        name: 'Custom Wooden Furniture',
        slug: 'custom-wooden-furniture',
        short_description: 'Heirloom solid wood statement dining tables, carved consoles, and teakwood architectural elements.',
        full_description: 'Preserving the art of traditional master joinery. We handcraft bespoke solid wood furniture from Burma Teak, Sheesham, American Walnut, and White Oak tailored to your exact custom dimensions.',
        icon: 'Trees',
        hero_image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80',
        starting_price: 85000,
        timeline: '3-5 Weeks',
        features: JSON.stringify([
          'Sustainable Certified Teak & Walnut Timbers',
          'Hand-Chiseled Mortise & Tenon Structural Joinery',
          'Natural Brass Inlay & Live Edge Slab Options',
          'Non-Toxic Eco-Friendly Organic Wax & Oil Finishes'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Timber Slab Selection', desc: 'Choose your preferred grain pattern and natural wood characteristics.' },
          { step: '02', title: 'Joinery Engineering', desc: 'Traditional woodcraft methods engineered for century-long stability.' },
          { step: '03', title: 'Hand-Finishing & Oil Rubbing', desc: 'Deep grain enhancement through multiple hand-rubbed oil coats.' },
          { step: '04', title: 'Delivery & Care Kit', desc: 'Supplied with a complimentary natural beeswax restoration kit.' }
        ])
      },
      {
        name: 'Wardrobe Design & Dressing Rooms',
        slug: 'wardrobe-design',
        short_description: 'Custom fitted walk-in closets, sliding glass wardrobes, and organizer islands with ambient illumination.',
        full_description: 'Turn wardrobe management into an art form. We design bespoke storage systems with customized hanging heights, velvet watch organizers, concealed safes, illuminated vanity mirrors, and silent sliding mechanisms.',
        icon: 'Layers',
        hero_image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80',
        starting_price: 220000,
        timeline: '3-5 Weeks',
        features: JSON.stringify([
          'Ultra-Slim Anodized Aluminum Frames & Smoked Glass Doors',
          'Infrared Motion-Activated Recessed LED Strip Channels',
          'Microfiber Velvet Lined Jewelry & Sunglass Drawers',
          'Hydraulic Pull-Down Hanging Rails for High Ceilings'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Wardrobe Inventory Audit', desc: 'Cataloging your shoe count, suit lengths, dresses, and accessories.' },
          { step: '02', title: 'Modular Section Schematics', desc: 'Optimizing bay widths, drawer depths, and lighting profiles.' },
          { step: '03', title: 'Laser Measurement & CNC Assembly', desc: 'Precise floor-to-ceiling fitment without unsightly gaps.' },
          { step: '04', title: 'Hardware Tuning & Soft Closing', desc: 'Ensuring whisper-quiet slide and slam-free operation.' }
        ])
      },
      {
        name: 'False Ceiling & Architectural Gypsum',
        slug: 'false-ceiling',
        short_description: 'Modern stepped gypsum ceilings, acoustic wooden rafters, and seamless cove lighting troughs.',
        full_description: 'The ceiling is the fifth wall that defines the room atmosphere. We craft seamless architectural gypsum false ceilings with concealed magnetic track lighting, AC duct disguises, and warm ambient perimeter glow.',
        icon: 'Grid',
        hero_image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        starting_price: 95000,
        timeline: '1-3 Weeks',
        features: JSON.stringify([
          'Saint-Gobain Gyproc Moisture-Resistant Framing',
          'Concealed Magnetic Track Lights & Low-Glare Spotlights',
          'Acoustic Perforated Gypsum for Home Theaters',
          'Seamless Flush Curtain Pockets with LED Backlighting'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Ceiling Laser Level Survey', desc: 'Checking slab drops, duct locations, and fan positions.' },
          { step: '02', title: '3D Reflected Ceiling Plan (RCP)', desc: 'Specifying exact cutouts for speakers, lights, and AC grills.' },
          { step: '03', title: 'Heavy-Gauge GI Framing & Boarding', desc: 'Anti-sagging rigid structure with fiber-tape joint finish.' },
          { step: '04', title: 'Primer, Painting & Luminaire Fitment', desc: 'Mirror-flat satin finish and spotlight testing.' }
        ])
      },
      {
        name: 'Lighting Design & Automation',
        slug: 'lighting-design',
        short_description: 'Layered architectural lighting schemes, mood presets, and smart smartphone/voice automation.',
        full_description: 'Lighting transforms cold spaces into welcoming retreats. We design three layers of illumination: Ambient (diffused warmth), Task (precision reading & kitchen prep), and Accent (highlighting artworks and architectural flutes).',
        icon: 'Sparkles',
        hero_image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        starting_price: 120000,
        timeline: '2-4 Weeks',
        features: JSON.stringify([
          'High Color Rendering Index (CRI > 92) Museum-Grade LEDs',
          'Warm Dimming Technology (3000K down to 1800K Candlelight)',
          'Smart Wireless Scene Control (Welcome, Dinner, Relax, Movie)',
          'Architectural Trimless Plaster-In Downlights'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Lux Level Calculation', desc: 'Simulating foot-candles for each zone to prevent glare.' },
          { step: '02', title: 'Fixture Curation & Luminaire Sourcing', desc: 'Selecting beam angles (15°, 24°, 36°) and optical lenses.' },
          { step: '03', title: 'Low-Voltage Wiring & Dimmer Channels', desc: 'Flicker-free DALI / 0-10V dimming integration.' },
          { step: '04', title: 'Scene Programming & Smartphone Setup', desc: 'Customizing your favorite lighting scenes.' }
        ])
      },
      {
        name: 'Space Planning & 3D Visualization',
        slug: 'space-planning',
        short_description: 'Vastu-conscious spatial floorplans, ergonomics, and photorealistic 4K 3D VR renders.',
        full_description: 'Before breaking a single tile, experience your future dream home in cinematic 4K virtual reality. We identify awkward bottlenecks, optimize natural daylight pathways, and maximize usable square footage.',
        icon: 'Compass',
        hero_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        starting_price: 60000,
        timeline: '1-2 Weeks',
        features: JSON.stringify([
          'Precision CAD 2D Furniture Layouts with Dimensions',
          'Photorealistic 4K Renderings from Multiple Angles',
          '360° Interactive Virtual Reality Mobile Walkthrough',
          'Bill of Quantities (BOQ) with Transparent Material Costs'
        ]),
        process_steps: JSON.stringify([
          { step: '01', title: 'Architectural Blueprint Input', desc: 'Importing DWG floor plans or conducting on-site LiDAR scans.' },
          { step: '02', title: 'Zoning & Circulation Analysis', desc: 'Creating smooth traffic corridors and clear sightlines.' },
          { step: '03', title: 'High-Fidelity 3D Texture Mapping', desc: 'Applying real marble grains, fabrics, and woods.' },
          { step: '04', title: 'Client VR Presentation Session', desc: 'Interactive walkthrough and real-time adjustments.' }
        ])
      }
    ];

    for (let i = 0; i < servicesData.length; i++) {
      const s = servicesData[i];
      await connection.query(`
        INSERT INTO services (
          name, slug, short_description, full_description, icon,
          hero_image, starting_price, timeline, features, process_steps, display_order, is_featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      `, [
        s.name, s.slug, s.short_description, s.full_description, s.icon,
        s.hero_image, s.starting_price, s.timeline, s.features, s.process_steps, i + 1
      ]);
    }

    console.log('6. Seeding Portfolio Projects with Before/After...');
    const projectsData = [
      {
        title: 'The Imperial Villa - Golf Links',
        slug: 'the-imperial-villa-golf-links',
        category: 'Residential',
        client_name: 'Dr. Vikramaditya & Sunaina Singhania',
        location: 'Golf Links, New Delhi',
        completion_year: 2025,
        area_sqft: 6500,
        budget_range: '₹85 Lakhs - ₹1.2 Cr',
        description: 'A sprawling 6,500 sq.ft. neoclassical residence reimagined into a modern serene palace. We integrated warm walnut wood paneling, Italian Statuario marble floors, custom acoustic false ceilings, and handcrafted velvet furniture.',
        hero_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        before_image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        after_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80'
        ]),
        challenges: 'The original layout had dark corridors, rigid compartmentalized rooms, and dated 1990s false ceilings that lowered perceived room heights.',
        solutions: 'We removed non-loadbearing partitions, installed fluted teak acoustic louvers to filter daylight, and elevated the ceiling height with stepped perimeter cove lighting.',
        testimonial_quote: 'S.M. Sanjna Interior transformed our outdated house into an architectural sanctuary that our family takes immense pride in welcoming guests to.'
      },
      {
        title: 'Aura Penthouse - DLF Magnolias',
        slug: 'aura-penthouse-dlf-magnolias',
        category: 'Luxury Villa',
        client_name: 'Rajeev & Natasha Mehra',
        location: 'Sector 42, Gurugram',
        completion_year: 2025,
        area_sqft: 8200,
        budget_range: '₹1.5 Cr - ₹2.2 Cr',
        description: 'An expansive double-height duplex penthouse overlooking the golf greens. Featuring a curved monumental staircase clad in travertine stone, an entertainer chef kitchen with Calacatta quartz waterfall counters, and automated mood lighting.',
        hero_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        before_image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
        after_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80'
        ]),
        challenges: 'Double-height living spaces created substantial echo and cold cavernous reverberation requiring specialized acoustic engineering.',
        solutions: 'We applied custom acoustic fabric wall cladding, textured fluted oak battens, and layered high-pile silk wool rugs to produce intimate, studio-grade acoustics.',
        testimonial_quote: 'The level of craftsmanship and design vision is simply world-class. Every single guest is mesmerized by the double-height living room.'
      },
      {
        title: 'The Minimalist Gourmet Island Kitchen',
        slug: 'minimalist-gourmet-island-kitchen',
        category: 'Modular Kitchen',
        client_name: 'Karan & Rhea Kapadia',
        location: 'Vasant Vihar, New Delhi',
        completion_year: 2024,
        area_sqft: 650,
        budget_range: '₹35 Lakhs - ₹45 Lakhs',
        description: 'A 650 sq.ft. chef kitchen featuring dual parallel preparation counters, a four-meter quartz dining island, motorized servo Blum drawers, and concealed pantry larders.',
        hero_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        before_image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        after_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
        ]),
        challenges: 'Traditional Indian heavy-cooking spices require massive ventilation without creating loud kitchen exhaust noise.',
        solutions: 'We integrated an ultra-silent remote-blower chimney system with commercial baffle filters concealed inside fluted wooden cabinetry.',
        testimonial_quote: 'Cooking here is absolute joy. The Blum hardware and quartz island are flawless.'
      },
      {
        title: 'Veritas Capital Corporate Headquarters',
        slug: 'veritas-capital-headquarters',
        category: 'Office',
        client_name: 'Veritas Asset Management Ltd.',
        location: 'One Horizon Center, DLF Phase 5, Gurugram',
        completion_year: 2024,
        area_sqft: 12000,
        budget_range: '₹1.8 Cr - ₹2.5 Cr',
        description: 'A corporate flagship reflecting financial stability and innovative tech agility. Features walnut executive boardrooms, switchable smart privacy glass, acoustic pod booths, and a panoramic skyline cafe.',
        hero_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        before_image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        after_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
        ]),
        challenges: 'Tight 60-day turnaround deadline to avoid overlapping commercial lease expenses.',
        solutions: 'We ran twin-shift modular offsite fabrication, assembling all workstations, glass partitions, and executive suites within 52 calendar days.',
        testimonial_quote: 'Completed ahead of schedule without a single compromise on finish quality. Our international board was thrilled.'
      }
    ];

    for (let i = 0; i < projectsData.length; i++) {
      const p = projectsData[i];
      await connection.query(`
        INSERT INTO projects (
          title, slug, category, client_name, location, completion_year, area_sqft,
          budget_range, description, hero_image, before_image, after_image,
          gallery_images, challenges, solutions, testimonial_quote, display_order, is_featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      `, [
        p.title, p.slug, p.category, p.client_name, p.location, p.completion_year, p.area_sqft,
        p.budget_range, p.description, p.hero_image, p.before_image, p.after_image,
        p.gallery, p.challenges, p.solutions, p.testimonial_quote, i + 1
      ]);
    }

    console.log('7. Seeding Testimonials...');
    const testimonials = [
      {
        name: 'Sunaina Singhania',
        title: 'Homeowner, The Imperial Villa',
        company: 'Golf Links, New Delhi',
        project: 'Complete Luxury Villa Renovation',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        comment: 'Sanjna and her extraordinary design team exceeded every hope we had. From the bespoke teak wood fluted walls to the handpicked Italian marble, their punctuality and perfectionism are unmatched in Delhi.'
      },
      {
        name: 'Rajeev Mehra',
        title: 'Managing Director, Mehra FinCorp',
        company: 'DLF Magnolias, Gurugram',
        project: 'Double-Height Penthouse Interior',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        comment: 'The level of sophistication and European refinement S.M. Sanjna brought to our DLF Magnolias residence is breathtaking. Their turnkey project management meant we literally handed over keys and walked into paradise.'
      },
      {
        name: 'Rhea Kapadia',
        title: 'Culinary Entrepreneur',
        company: 'Vasant Vihar, New Delhi',
        project: 'Chef Modular Kitchen & Dining Suite',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        comment: 'As someone who cooks professionally, I had demanding ergonomic requirements. Their custom modular kitchen with Calacatta quartz waterfall island and Blum motion is the envy of all our dinner guests!'
      },
      {
        name: 'Arjun Bansal',
        title: 'Partner, Veritas Capital',
        company: 'Cyber City, Gurugram',
        project: '12,000 Sq.Ft. Corporate Headquarters',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        comment: 'Flawless execution. Completed our 12,000 sq.ft. corporate headquarters a week ahead of schedule. The acoustic boardrooms and executive desk craftsmanship are remarkable.'
      }
    ];

    for (let i = 0; i < testimonials.length; i++) {
      const t = testimonials[i];
      await connection.query(`
        INSERT INTO testimonials (client_name, role_or_title, company, project_title, rating, comment, avatar_url, is_featured, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
      `, [t.name, t.title, t.company, t.project, t.rating, t.comment, t.avatar, i + 1]);
    }

    console.log('8. Seeding Blog Categories & Articles...');
    await connection.query(`
      INSERT INTO blog_categories (name, slug) VALUES
      ('Design Trends & Forecasts', 'design-trends'),
      ('Modular Kitchen Guides', 'modular-kitchen-guides'),
      ('Artisan Woodwork & Care', 'woodwork-craft'),
      ('Lighting & Spatial Planning', 'lighting-planning');
    `);

    const [bCats] = await connection.query('SELECT id, slug FROM blog_categories');
    const bCatMap = {};
    bCats.forEach(b => { bCatMap[b.slug] = b.id; });

    const blogs = [
      {
        title: 'The Return of Handcrafted Wood: Why Bespoke Joinery Outlasts Trends',
        slug: 'return-of-handcrafted-wood-bespoke-joinery',
        excerpt: 'In an era dominated by mass-manufactured veneer, solid plantation teak and walnut carpentry offer grounding longevity, sensory warmth, and an irreplaceable organic soul.',
        content: `Solid hardwood has always been the foundation of true luxury homes. Unlike flat synthetic laminate boards that chip and cannot be restored, genuine teak, oak, and Indian rosewood develop a rich, luminous patina that deepens with every decade.\n\n### The Sensory Depth of Solid Woodcraft\nWhen you touch a hand-fluted solid teak partition or run your hand across a 35mm thick beveled dining table, your fingers experience natural wood grain, temperature, and organic micro-textures. This sensory grounding provides an antidote to our screen-dominated lives.\n\n### Traditional Joinery vs. Cheap Fasteners\nAt S.M. Sanjna Interior Designer, our master carpenters utilize time-tested mortise-and-tenon structural joinery. Because solid wood naturally expands and breathes with seasonal monsoon humidity and dry winters, proper joinery allows the wood to flex without cracking or warping.\n\n### Investing for Generations\nA bespoke teakwood wardrobe or dining suite is never an expense—it is a treasured heirloom that is passed down to children and grandchildren with mounting pride.`,
        category_slug: 'woodwork-craft',
        cover_image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
        author: 'Sanjna Sharma',
        read_time: '6 min read'
      },
      {
        title: 'Designing the Ultimate Chef’s Modular Kitchen: Ergonomics Meet Elegance',
        slug: 'designing-ultimate-chefs-modular-kitchen',
        excerpt: 'How to combine the classic culinary golden work triangle with waterfall quartz countertops, concealed spice larders, and whisper-quiet German hardware.',
        content: `A luxury kitchen should feel as effortless during Sunday morning family pancake breakfasts as it does when hosting a catered twenty-person gala dinner.\n\n### Master the Kitchen Work Triangle\nThe core of culinary ergonomics connects three points: the refrigerator (cold storage), the sink (cleaning and prep), and the cooktop (thermal transformation). The perimeter between these three hubs should ideally range between 12 and 26 feet to eliminate wasted steps.\n\n### Choosing Countertops: Quartz vs. Natural Marble\nWhile Italian Carrara marble is peerless in formal living areas, natural stone in the kitchen easily etches with lemon juice, vinegar, and turmeric. We recommend non-porous engineered Calacatta Gold quartz slabs that offer marble’s dramatic veining with 100% stain resistance and heat tolerance up to 180°C.\n\n### Silent Motion Hardware\nOur kitchens utilize German Blum Tandembox drawers with built-in hydraulic dampeners that slide silently even when loaded with 50 kilograms of cast iron Dutch ovens and brass cookware.`,
        category_slug: 'modular-kitchen-guides',
        cover_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        author: 'Ar. Ananya Verma',
        read_time: '8 min read'
      },
      {
        title: 'Mastering Warm Minimalism: How Beige, Cream, and Walnut Create Timeless Homes',
        slug: 'mastering-warm-minimalism-beige-cream-walnut',
        excerpt: 'Move past sterile all-white clinical rooms. Discover how layered textures in oat bouclé, fluted timber, travertine, and brushed brass craft warm serenity.',
        content: `Minimalism was once misunderstood as cold, sparse, and devoid of personality. Warm minimalism shifts the focus from stark emptiness to deliberate tactile richness.\n\n### The Layered Neutrals Palette\nBegin with warm ecru or oatmeal limewash on walls, layer a natural Roman travertine stone coffee table, introduce a curved bouclé sofa in cream, and anchor the composition with rich dark American walnut credenzas and muted champagne-gold reading lamps.\n\n### Texture Over Color Shock\nInstead of jarring neon accents, warm minimalism creates visual fascination through physical texture contrasts: the nubby weave of bouclé against the smooth cool surface of honed stone, contrasted by the sharp vertical rhythm of fluted wood louvers.`,
        category_slug: 'design-trends',
        cover_image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        author: 'Sanjna Sharma',
        read_time: '5 min read'
      }
    ];

    for (const b of blogs) {
      const catId = bCatMap[b.category_slug];
      await connection.query(`
        INSERT INTO blogs (title, slug, excerpt, content, cover_image, category_id, author_name, read_time, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
      `, [b.title, b.slug, b.excerpt, b.content, b.cover_image, catId, b.author, b.read_time]);
    }

    console.log('9. Seeding Hero Banners...');
    await connection.query(`
      INSERT INTO banners (title, subtitle, cta_text, cta_link, secondary_cta_text, secondary_cta_link, background_image, badge_text, display_order, is_active)
      VALUES
      (
        'Transform Your Space Into Something Extraordinary',
        'Bespoke architectural interiors and handcrafted luxury furniture, curated for those who appreciate the poetry of fine living.',
        'Explore Collection',
        '/furniture',
        'Book Free Consultation',
        '/get-quote',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
        'Haute Interior Architecture & Fine Joinery',
        1,
        1
      ),
      (
        'Mastercrafted Teak & Italian Stone Furniture',
        'From monumental marble dining tables to organic curved bouclé sofas, discover heirloom pieces hand-milled in our atelier.',
        'Discover Furniture',
        '/furniture/wooden-furniture',
        'Request Custom Quote',
        '/get-quote',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85',
        'The 2025 Artisan Collection',
        2,
        1
      ),
      (
        'The German-Precision Modular Kitchen Sanctuary',
        'Waterproof marine ply, quartz island counters, and whisper-quiet Blum motion technology engineered for the modern culinary connoisseur.',
        'View Modular Kitchens',
        '/services/modular-kitchen',
        'Design My Kitchen',
        '/get-quote',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=85',
        'Turnkey Culinary Architecture',
        3,
        1
      );
    `);

    console.log('10. Seeding Homepage Sections...');
    const sections = [
      { key: 'hero', title: 'Cinematic Hero Banner', subtitle: 'Primary entrance slider with high-impact visuals' },
      { key: 'about_preview', title: 'The S.M. Sanjna Atelier Story', subtitle: 'Fifteen years of artisanal excellence and turnkey craftsmanship' },
      { key: 'services_showcase', title: 'Our Interior Design Services', subtitle: 'Comprehensive spatial planning from residential to luxury commercial' },
      { key: 'featured_furniture', title: 'Curated Furniture Showcase', subtitle: 'Handcrafted masterpieces for discerning residences' },
      { key: 'wooden_furniture', title: 'Solid Burma Teakwood Collection', subtitle: 'Time-honored hand joinery and fragrant natural resins' },
      { key: 'modular_kitchens', title: 'Modular Kitchen Innovations', subtitle: 'Where high gastronomy meets architectural ergonomics' },
      { key: 'portfolio_highlights', title: 'Flagship Interior Projects', subtitle: 'Take a virtual tour through our recently completed residences' },
      { key: 'before_after', title: 'Before & After Transformations', subtitle: 'Witness how thoughtful spatial design elevates daily living' },
      { key: 'working_process', title: 'Our Seamless Five-Step Method', subtitle: 'From initial consultation to white-glove turnkey handover' },
      { key: 'why_choose_us', title: 'The Sanjna Distinct Advantage', subtitle: 'Why elite homeowners trust our studio implicitly' },
      { key: 'testimonials', title: 'Words From Our Discerning Patrons', subtitle: 'Real reviews from verified villa and penthouse owners' },
      { key: 'blog_insights', title: 'The Design Editorial Journal', subtitle: 'Insights on architecture, materials, and luxury styling' },
      { key: 'newsletter', title: 'Private Atelier Newsletter', subtitle: 'Receive exclusive invitations to private collection previews' }
    ];

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      await connection.query(`
        INSERT INTO homepage_sections (section_key, title, subtitle, is_enabled, display_order)
        VALUES (?, ?, ?, 1, ?)
      `, [s.key, s.title, s.subtitle, i + 1]);
    }

    console.log('11. Seeding FAQs...');
    const faqs = [
      {
        category: 'Interior Design',
        q: 'How does the turnkey interior design process work at S.M. Sanjna?',
        a: 'Our turnkey service covers every stage from initial site laser measurement, 3D architectural renders, false ceilings, electrical rewiring, custom joinery fabrication in our factory, to final decor placement. You have a single dedicated project engineer with weekly progress reviews.'
      },
      {
        category: 'Modular Kitchens',
        q: 'What materials do you use for modular kitchen carcases and countertops?',
        a: 'We use IS:710 Marine Grade BWP (Boiling Water Proof) plywood with 1mm anti-fingerprint acrylic or thermal laminate. For countertops, we recommend 20mm engineered quartz (such as Calacatta Gold) which is stain-resistant, antimicrobial, and impervious to turmeric or citrus acid.'
      },
      {
        category: 'Furniture & Customization',
        q: 'Can I customize dimensions, fabrics, and wood finishes on furniture pieces?',
        a: 'Yes, absolutely. Because we operate our own precision woodcraft atelier, any bed, dining table, sofa, or console can be modified to your exact floorplan dimensions, choice of fabric (bouclé, linen, velvet, saddle leather), and wood stain.'
      },
      {
        category: 'Warranty & Delivery',
        q: 'What warranties and delivery terms do you provide?',
        a: 'All our custom woodwork and modular cabinetry carry a 10-Year Structural & Water-Resistance Warranty, while hardware (Blum / Hettich) includes lifetime manufacturer replacement. We deliver with white-glove inside placement and professional assembly.'
      },
      {
        category: 'Pricing & Quotations',
        q: 'How do you calculate interior design and furniture quotations?',
        a: 'We provide completely transparent itemized Bill of Quantities (BOQ) with zero hidden costs. You can schedule a complimentary design consultation or use our online Get a Quote form to receive a detailed preliminary estimate.'
      }
    ];

    for (let i = 0; i < faqs.length; i++) {
      const f = faqs[i];
      await connection.query(`
        INSERT INTO faqs (category, question, answer, display_order, is_active)
        VALUES (?, ?, ?, ?, 1)
      `, [f.category, f.q, f.a, i + 1]);
    }

    console.log('12. Seeding SEO Metadata for All 27 Core Pages...');
    const seoPages = [
      { route: '/', title: 'S.M. Sanjna Interior Designer | Luxury Interiors & Handcrafted Furniture', desc: 'Transform your space into something extraordinary. Premium interior design studio and luxury furniture maker in Delhi NCR. Book a free consultation.', h1: 'Transform Your Space Into Something Extraordinary' },
      { route: '/about', title: 'About Us | S.M. Sanjna Interior Designer Studio & Atelier', desc: 'Discover our 15-year heritage in luxury architecture, turnkey residential transformations, and bespoke solid wood furniture craftsmanship.', h1: 'Crafting Haute Spaces & Timeless Furniture' },
      { route: '/services', title: 'Interior Design Services | Turnkey Residential & Commercial', desc: 'Explore full home interiors, modular kitchens, luxury bedrooms, office fit-outs, and bespoke joinery with 10-year warranty.', h1: 'Our Bespoke Interior Design Services' },
      { route: '/services/residential-interior-design', title: 'Residential Interior Design | S.M. Sanjna Interior Designer', desc: 'Warm, timeless, and functional home interiors crafted for modern living and family comfort.', h1: 'Residential Interior Architecture' },
      { route: '/services/commercial-interior-design', title: 'Commercial & Retail Interior Design | S.M. Sanjna Interior Designer', desc: 'High-impact retail showrooms, fine dining hospitality, and executive corporate interiors.', h1: 'Commercial & Retail Interior Architecture' },
      { route: '/services/modular-kitchen', title: 'Luxury Modular Kitchen Design | S.M. Sanjna Interior Designer', desc: 'German Blum hardware, marine grade BWP ply, and Italian quartz islands designed for gourmet living.', h1: 'Modular Kitchen Sanctuary' },
      { route: '/services/bedroom-interior', title: 'Luxury Bedroom Interior Design | S.M. Sanjna Interior Designer', desc: 'Acoustic headboards, circadian ambient lighting, and serene master suites.', h1: 'Master Suite & Bedroom Architecture' },
      { route: '/services/living-room-interior', title: 'Luxury Living Room Interior Design | S.M. Sanjna Interior Designer', desc: 'Statement formal salons, fluted wall cladding, and conversational seating arrangements.', h1: 'Living Room Architecture & Styling' },
      { route: '/services/office-interior', title: 'Executive Office Interior Design | S.M. Sanjna Interior Designer', desc: 'Inspiring corporate workspaces, walnut executive suites, and acoustic boardrooms.', h1: 'Executive Office & Corporate Interior Architecture' },
      { route: '/furniture', title: 'Luxury Furniture Collection | S.M. Sanjna Interior Designer', desc: 'Shop heirloom sofas, marble dining tables, teak beds, and custom credenzas.', h1: 'The Haute Furniture Collection' },
      { route: '/furniture/wooden-furniture', title: 'Solid Burma Teak & Walnut Wooden Furniture | S.M. Sanjna', desc: 'Handcrafted solid wood dining tables, louvers, and bespoke cabinetry.', h1: 'Handcrafted Solid Wooden Furniture' },
      { route: '/furniture/kitchen-accessories', title: 'Modular Kitchen Hardware & Parts | S.M. Sanjna', desc: 'German soft-close drawers, blind corner carousels, and knurled brass pull handles.', h1: 'Kitchen Hardware, Parts & Organizers' },
      { route: '/furniture/wardrobes', title: 'Luxury Walk-in Closets & Wardrobes | S.M. Sanjna', desc: 'Floor-to-ceiling smoked glass wardrobes and illuminated dressing islands.', h1: 'Bespoke Wardrobes & Dressing Rooms' },
      { route: '/furniture/custom-furniture', title: 'Custom-Made Furniture & Joinery | S.M. Sanjna', desc: 'Commission one-of-a-kind furniture built to your exact room dimensions and materials.', h1: 'Bespoke Commissioned Furniture' },
      { route: '/projects', title: 'Interior Design Portfolio & Projects | S.M. Sanjna', desc: 'Explore our completed luxury villas, penthouses, modern modular kitchens, and corporate suites.', h1: 'Our Signature Portfolio' },
      { route: '/gallery', title: 'Interior Design Photo Gallery | S.M. Sanjna', desc: 'High-resolution photo gallery of living rooms, bedrooms, kitchens, and wooden joinery.', h1: 'Curated Visual Gallery' },
      { route: '/blog', title: 'Interior Design Journal & Articles | S.M. Sanjna', desc: 'Expert guides on interior trends, modular kitchen ergonomics, and heirloom furniture care.', h1: 'The Design Journal' },
      { route: '/contact', title: 'Contact S.M. Sanjna Interior Designer | Studio & Atelier', desc: 'Visit our New Delhi studio or get in touch for consultations, site visits, and project queries.', h1: 'Connect With Our Design Studio' },
      { route: '/get-quote', title: 'Request a Free Quotation & Spatial Estimate | S.M. Sanjna', desc: 'Submit your floorplan and room dimensions for a comprehensive, transparent interior quotation.', h1: 'Request a Bespoke Quotation' },
      { route: '/wishlist', title: 'Your Curated Wishlist | S.M. Sanjna Interior Designer', desc: 'Save your favorite luxury furniture pieces and design inspirations.', h1: 'Your Curated Wishlist' },
      { route: '/cart', title: 'Shopping Cart | S.M. Sanjna Interior Designer', desc: 'Review your selected furniture items, verify dimensions, and proceed to checkout.', h1: 'Your Shopping Cart' },
      { route: '/checkout', title: 'Secure Checkout | S.M. Sanjna Interior Designer', desc: 'Complete your furniture order with white-glove delivery and secure payment.', h1: 'Secure Checkout' },
      { route: '/privacy-policy', title: 'Privacy Policy | S.M. Sanjna Interior Designer', desc: 'Our commitment to protecting your personal data and privacy.', h1: 'Privacy Policy' },
      { route: '/terms', title: 'Terms & Conditions | S.M. Sanjna Interior Designer', desc: 'Terms of service, warranty conditions, and delivery guidelines.', h1: 'Terms & Conditions' }
    ];

    for (const p of seoPages) {
      await connection.query(`
        INSERT INTO seo_metadata (
          page_route, page_title, meta_title, meta_description, meta_keywords,
          canonical_url, og_title, og_description, og_image, h1_heading
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        p.route, p.title, p.title, p.desc,
        'interior designer, luxury furniture, modular kitchen, delhi ncr, sm sanjna, home interiors',
        `https://smsanjna.com${p.route}`, p.title, p.desc,
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        p.h1
      ]);
    }

    console.log('13. Seeding Coupons...');
    await connection.query(`
      INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount)
      VALUES
      ('WELCOME10', 'percentage', 10.00, 25000.00, 15000.00),
      ('LUXURY5000', 'fixed', 5000.00, 50000.00, 5000.00),
      ('FESTIVE15', 'percentage', 15.00, 100000.00, 30000.00);
    `);

    console.log('Database seeded successfully with rich luxury content!');
  } catch (err) {
    console.error('Error during database seed:', err);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedDB();

