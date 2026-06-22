export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  blurb: string;
  badge?: string;
};

export const CATEGORIES = [
  "Boxes & Mailers",
  "Tape & Wrap",
  "Pallets & Handling",
  "Storage & Handling",
  "Labels & Printing",
];

export const PRODUCTS: Product[] = [
  { id: 1, title: "Corrugated Shipping Boxes, 25 Pack", category: "Boxes & Mailers", price: 24.99, listPrice: 32.99, rating: 4.7, reviews: 1432, image: "/shop/boxes.jpg", badge: "Best Seller", blurb: "Double-wall corrugated boxes built to take a beating in transit. Flat-packed and ready to assemble in seconds." },
  { id: 2, title: "Fragile-Safe Moving Boxes, 10 Pack", category: "Boxes & Mailers", price: 18.49, listPrice: 23.0, rating: 4.6, reviews: 980, image: "/shop/moving.jpg", blurb: "Reinforced corners and clear fragile marking keep delicate cargo protected from dock to doorstep." },
  { id: 3, title: "Pro Tape Gun & Packing Tape, 6 Pack", category: "Tape & Wrap", price: 21.99, listPrice: 27.99, rating: 4.8, reviews: 2103, image: "/shop/tapegun.jpg", badge: "Best Seller", blurb: "Industrial dispenser with a steel blade and six rolls of heavy-duty tape. Seal a hundred boxes without a refill." },
  { id: 4, title: "Box Sealing Tape Kit", category: "Tape & Wrap", price: 12.99, listPrice: 16.99, rating: 4.5, reviews: 760, image: "/shop/sealing.jpg", blurb: "Quiet-release acrylic tape that holds in heat, cold, and humidity. Crystal clear and residue free." },
  { id: 5, title: "Bubble Cushion Wrap Roll, 175 ft", category: "Tape & Wrap", price: 19.99, listPrice: 27.99, rating: 4.8, reviews: 1640, image: "/shop/bubblewrap.jpg", blurb: "Lightweight perforated cushioning that tears clean every 12 inches. Maximum protection, minimum dunnage weight." },
  { id: 6, title: "Standard Wooden Pallets, 48 x 40", category: "Pallets & Handling", price: 14.0, rating: 4.3, reviews: 210, image: "/shop/pallets.jpg", blurb: "Kiln-dried four-way entry pallets rated for 2,500 lb. Compatible with every forklift and jack in your fleet." },
  { id: 7, title: "Barcoded Export Pallets, 5 Pack", category: "Pallets & Handling", price: 89.0, listPrice: 109.0, rating: 4.7, reviews: 88, image: "/shop/barcoded.jpg", badge: "GRS Prime", blurb: "ISPM-15 certified and pre-barcoded for instant scan-in at any GRS hub. Built for international freight." },
  { id: 8, title: "Stretch Wrap Film, 4 Rolls", category: "Pallets & Handling", price: 22.5, listPrice: 29.0, rating: 4.4, reviews: 405, image: "/shop/stretchwrap.jpg", blurb: "High-cling 80-gauge film that locks loads to the pallet and resists punctures on rough freight runs." },
  { id: 9, title: "Powered Pallet Stacker", category: "Pallets & Handling", price: 1299.0, listPrice: 1499.0, rating: 4.9, reviews: 36, image: "/shop/forklift.jpg", badge: "Best Seller", blurb: "Electric walk-behind stacker that lifts a full pallet to 130 inches. Charges overnight, runs a full shift." },
  { id: 10, title: "Heavy-Duty Pallet Racking", category: "Storage & Handling", price: 279.0, listPrice: 329.0, rating: 4.7, reviews: 142, image: "/shop/shelving.jpg", blurb: "Bolt-together steel racking with a powder-coat finish. Each beam level holds a full loaded pallet." },
  { id: 11, title: "Last-Mile Delivery Totes, 12 Pack", category: "Storage & Handling", price: 39.99, listPrice: 49.0, rating: 4.5, reviews: 318, image: "/shop/lastmile.jpg", blurb: "Stackable, nestable totes that keep parcels sorted on the van and snap shut for secure last-mile runs." },
  { id: 12, title: "Pre-Printed Shipping Labels, 1000", category: "Labels & Printing", price: 16.99, rating: 4.8, reviews: 1290, image: "/shop/labels.jpg", blurb: "Smudge-proof thermal labels with a permanent adhesive that sticks to cardboard, poly, and shrink wrap." },
  { id: 13, title: "Thermal Shipping Label Printer", category: "Labels & Printing", price: 169.99, listPrice: 199.99, rating: 4.6, reviews: 540, image: "/shop/printer.jpg", badge: "GRS Prime", blurb: "Print razor-sharp 4 by 6 labels at 200 per minute. No ink, no toner, just direct-thermal speed." },
];

export const money = (n: number) => `$${n.toFixed(2)}`;
export const discountPct = (p: Product) =>
  p.listPrice ? Math.round((1 - p.price / p.listPrice) * 100) : 0;
export const findProduct = (id: number) => PRODUCTS.find((p) => p.id === id);
