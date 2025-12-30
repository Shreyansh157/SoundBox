import { Speaker, Music, Mic2, Radio, Headphones, Cable } from "lucide-react";

export const CATEGORIES = [
  { id: 1, name: "Speakers", icon: Speaker, desc: "Active PA systems & subwoofers" },
  { id: 2, name: "Microphones", icon: Mic2, desc: "Wireless & studio mics" },
  { id: 3, name: "DJ Gear", icon: Music, desc: "Mixers, controllers & decks" },
  { id: 4, name: "Lighting", icon: Zap, desc: "Lasers, strobes & spots" }, // Added for demo
];

export const PRODUCTS = [
  // --- SPEAKERS ---
  {
    id: 1,
    category: "Speakers",
    name: "JBL PartyBox 310",
    price: 45,
    image: "https://images.unsplash.com/photo-1621516627083-d021c2ee655a?q=80&w=800",
    tag: "Popular",
    rating: 4.8,
    reviews: 124,
    description:
      "Huge sound, dazzling lights, and unbelievable power set this speaker apart from the crowd. The JBL PartyBox 310 packs a full party into a transportable, splashproof sound machine like no other.",
    specs: { Power: "240W RMS", Battery: "18 Hours", Connectivity: "Bluetooth 5.1, USB, Aux", Weight: "17.4 kg" },
  },
  {
    id: 2,
    category: "Speakers",
    name: "Bose S1 Pro+",
    price: 60,
    image: "https://images.unsplash.com/photo-1545454675-3527b9b9ea1e?q=80&w=800",
    tag: "Pro Choice",
    rating: 4.9,
    reviews: 89,
    description:
      "The ultimate all-in-one PA system. Musicians, DJs, and general presenters can get professional sound instantly. It is ultra-portable and sets up in seconds.",
    specs: { Type: "All-in-one PA", Channels: "3-Channel Mixer", Wireless: "Integrated RF", Battery: "11 Hours" },
  },
  {
    id: 3,
    category: "Speakers",
    name: "QSC K12.2",
    price: 75,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800", // Placeholder
    tag: "Heavy Duty",
    rating: 5.0,
    reviews: 45,
    description:
      "The QSC K.2 Series represents the best-in-class loudspeaker for today’s demanding audio professionals. The perfect combination of elegant design, superior audio performance, and high functionality.",
    specs: { Power: "2000W Peak", SPL: "132 dB", Woofer: "12 Inch", DSP: "Configurable" },
  },
  // --- MICS ---
  {
    id: 4,
    category: "Microphones",
    name: "Shure SM7B",
    price: 35,
    image: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=800",
    tag: "Studio Standard",
    rating: 4.9,
    reviews: 312,
    description:
      "The SM7B dynamic microphone has a smooth, flat, wide-range frequency response appropriate for music and speech in all professional audio applications.",
    specs: { Type: "Dynamic", Pattern: "Cardioid", Connector: "XLR", Shielding: "Electromagnetic" },
  },
  {
    id: 5,
    category: "Microphones",
    name: "Sennheiser e835",
    price: 25,
    image: "https://images.unsplash.com/photo-1558742569-fe6d39d05837?q=80&w=800",
    tag: "Live Vocal",
    rating: 4.7,
    reviews: 150,
    description:
      "Lead vocal stage mic, designed to perform under pressure. Uniform frequency pick-up pattern maintains signal quality when moving on and off axis.",
    specs: { Type: "Dynamic", Pattern: "Cardioid", Body: "Metal", Switch: "Silent On/Off" },
  },
  // --- DJ GEAR ---
  {
    id: 6,
    category: "DJ Gear",
    name: "Pioneer DDJ-1000",
    price: 120,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d58b727d?q=80&w=800",
    tag: "Club Standard",
    rating: 4.9,
    reviews: 67,
    description:
      "The DDJ-1000 offers the ideal solution if you want to play at bigger events and party venues. The interface is similar to the flagship NXS2 setup.",
    specs: { Channels: "4-Channel", "Jog Wheel": "Full Size", Outputs: "XLR Master", Software: "Rekordbox" },
  },
];

// Re-export constants needed for Home
import { Zap, ShieldCheck, Truck } from "lucide-react";
export const CASES = [
  { id: 1, title: "Neon Festival 2024", type: "Live Event", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800" },
  { id: 2, title: "TechCrunch Disrupt", type: "Conference", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800" },
  { id: 3, title: "Malwis Private Party", type: "Private", image: "https://images.unsplash.com/photo-1514525253440-b393452e8d03?q=80&w=800" },
];
export const TESTIMONIALS = [
  { id: 1, text: "The gear was immaculate and the setup crew was invisible. Perfect execution.", author: "Alex R.", role: "Event Director" },
  { id: 2, text: "Saved our conference when another vendor cancelled. Delivered in 2 hours.", author: "Sarah L.", role: "Operations Lead" },
  { id: 3, text: "Best daily rates in the city for this quality of equipment.", author: "Mike T.", role: "DJ" },
];
export const FEATURES = [
  { title: "Instant Booking", desc: "Real-time availability." },
  { title: "2-Hour Delivery", desc: "On-site setup included." },
  { title: "Insured Gear", desc: "Damage protection plan." },
];
// ... existing exports ...

export const TEAM = [
  {
    id: 1,
    name: "Marcus Thorne",
    role: "Founder & Audio Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
    bio: "Touring engineer for 15 years. Founded SoundBox to bring stadium-quality gear to local creators.",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
    bio: "Former festival director who ensures every cable and speaker arrives exactly when you need it.",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800",
    bio: "System architect specializing in complex RF coordination and large-scale line array deployment.",
  },
];

export const TIMELINE = [
  { year: "2015", title: "The Garage Phase", desc: "Started with 2 speakers and a van in Brooklyn." },
  { year: "2018", title: "First Festival", desc: 'Powered "Neon Nights" for 5,000 attendees.' },
  { year: "2021", title: "Tech Expansion", desc: "Launched our proprietary real-time booking platform." },
  { year: "2024", title: "Citywide Network", desc: "Now operating 3 warehouses with 2-hour delivery." },
];
// ... existing exports ...

export const CLIENTS = [
  { id: 1, name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
  { id: 2, name: "Red Bull", logo: "https://upload.wikimedia.org/wikipedia/en/f/f5/RedBullEnergyDrink.svg" },
  { id: 3, name: "TedX", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/TEDx_logo.svg" },
  { id: 4, name: "Live Nation", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Live_Nation_Entertainment_logo.svg" },
  { id: 5, name: "Sony Music", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Sony_Music_logo.svg" },
  { id: 6, name: "Boiler Room", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Boiler_Room_logo.png" },
];
// ... existing imports and exports ...

export const GOOGLE_REVIEWS = [
  {
    id: 1,
    author: "James Peterson",
    date: "2 months ago",
    rating: 5,
    text: "Rented a full PA system for my wedding. The team was incredibly professional and the sound quality was perfect. Set up and tear down was seamless.",
    avatar: "J", // You can use an image URL here if you have one
    color: "#f97316", // Orange accent for avatar
  },
  {
    id: 2,
    author: "Elena Rodriguez",
    date: "1 week ago",
    rating: 5,
    text: "Saved our corporate event! We had a last-minute mic failure and SoundBox delivered replacements within an hour. unparalleled customer service.",
    avatar: "E",
    color: "#8b5cf6", // Purple accent
  },
  {
    id: 3,
    author: "Mike 'DJ' T.",
    date: "3 weeks ago",
    rating: 4.8, // We'll just show 5 stars visually
    text: "Best rates in the city for Pioneer gear. The equipment is always clean and updated with the latest firmware. Highly recommend for working DJs.",
    avatar: "M",
    color: "#10b981", // Green accent
  },
];
