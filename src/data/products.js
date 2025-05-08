export const products = [
  // New living-room items

  {
    id: 28,
    name: "Scandinavian Solid Oak Sofa Set",
    category: "living-room",
    itemType: "sofa-set",
    price: 2999.99,
    description:
      "Scandinavian-inspired solid oak sofa set with plush upholstered cushions",
    modelUrl: "/models/solid_oak_sofa_set.glb",
    images: [
      "/images/solid_oak_sofa_set.png",
      "/images/solid-oak-sofa-set-2.jpg",
    ],
    specs: {
      dimensions: "250x100x85 cm",
      material: "Solid oak, polyester upholstery",
      color: "Natural Oak/Beige",
      weight: "120 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 29,
    name: "Solid Oak Coffee Table",
    category: "living-room",
    itemType: "table",
    price: 399.99,
    description: "Solid oak coffee table with lower storage shelf",
    modelUrl: "/models/solid_oak_coffee_table.glb",
    images: [
      "/images/solid_oak_coffee_table.png",
      "/images/solid-oak-coffee-table-2.jpg",
    ],
    specs: {
      dimensions: "120x60x45 cm",
      material: "Solid oak wood",
      color: "Natural Oak",
      weight: "30 kg",
    },
    inStock: true,
    featured: false,
  },
  {
    id: 30,
    name: "Scandinavian Wooden Armchair",
    category: "living-room",
    itemType: "chair",
    price: 499.99,
    description: "Scandinavian-style wooden armchair with linen cushion",
    modelUrl: "/models/scandi_wooden_armchair.glb",
    images: [
      "/images/scandi_wooden_armchair.png",
      "/images/scandi-wooden-armchair-2.jpg",
    ],
    specs: {
      dimensions: "70x85x75 cm",
      material: "Oak wood, linen fabric",
      color: "Natural/Light Gray",
      weight: "15 kg",
    },
    inStock: true,
    featured: true,
  },

  // New dining-room items
  {
    id: 25,
    name: "Scandinavian Oak Dining Table with 4 Chairs",
    category: "dining-room",
    itemType: "table-set",
    price: 799.99,
    description: "Solid oak dining table paired with four upholstered chairs",
    modelUrl: "/models/scandi_oak_dining_set.glb",
    images: [
      "/images/scandi_oak_dining_set.png",
      "/images/scandi_oak_dining_set-2.jpg",
    ],
    specs: {
      dimensions: "180x90x75 cm",
      material: "Oak wood, fabric",
      color: "Natural Oak/Grey",
      weight: "60 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 26,
    name: "Modern Ash Wood Dining Set",
    category: "dining-room",
    itemType: "table-set",
    price: 1199.99,
    description: "Modern ash wood dining table with six curved-back chairs",
    modelUrl: "/models/ash_wood_dining_set.glb",
    images: [
      "/images/ash_wood_dining_set.png",
      "/images/ash_wood_dining_set-2.jpg",
    ],
    specs: {
      dimensions: "200x100x75 cm",
      material: "Ash wood",
      color: "Light Wood",
      weight: "80 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 27,
    name: "Round Pedestal Dining Table",
    category: "dining-room",
    itemType: "table-set",
    price: 599.99,
    description: "Round pedestal dining table with four matching chairs",
    modelUrl: "/models/round_pedestal_table.glb",
    images: [
      "/images/round_pedestal_table.png",
      "/images/round_pedestal_table-2.jpg",
    ],
    specs: {
      dimensions: "120x120x75 cm",
      material: "MDF, oak veneer",
      color: "White/Oak",
      weight: "50 kg",
    },
    inStock: true,
    featured: true,
  },

  // New bedroom items

  {
    id: 22,
    name: "Solid Wood Storage Bed",
    category: "bedroom",
    itemType: "bed",
    price: 1499.99,
    description:
      "Solid wood storage bed with headboard and two spacious drawers",
    modelUrl: "/models/wooden_storage_bed.glb",
    images: [
      "/images/wooden_storage_bed.png",
      "/images/wooden-storage-bed-2.jpg",
    ],
    specs: {
      dimensions: "160x200x100 cm",
      material: "Solid oak wood",
      color: "Natural Wood",
      weight: "100 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 23,
    name: "Three-Door Wardrobe",
    category: "bedroom",
    itemType: "wardrobe",
    price: 1199.99,
    description:
      "Spacious three-door wardrobe with adjustable shelves and hanging rods",
    modelUrl: "/models/three_door_wardrobe.glb",
    images: [
      "/images/three_door_wardrobe.png",
      "/images/three-door-wardrobe-2.jpg",
    ],
    specs: {
      dimensions: "200x60x220 cm",
      material: "MDF with oak veneer",
      color: "White",
      weight: "75 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 24,
    name: "Bedroom Study Desk with Chair",
    category: "bedroom",
    itemType: "desk",
    price: 399.99,
    description:
      "Compact study desk with integrated drawer and matching ergonomic chair",
    modelUrl: "/models/bedroom_study_desk.glb",
    images: [
      "/images/bedroom_study_desk.png",
      "/images/bedroom-study-desk-2.jpg",
    ],
    specs: {
      dimensions: "120x60x75 cm",
      material: "Engineered wood, metal legs",
      color: "Gray",
      weight: "25 kg",
    },
    inStock: true,
    featured: true,
  },
];

export const categories = [
  {
    id: "living-room",
    name: "Living Room",
    description: "Sofas, coffee tables, and entertainment units",
    image: "/images/living_room.png",
    info: "Explore our exquisite living room furniture collection, featuring luxurious sofas, elegant coffee tables, and entertainment units crafted from premium materials. Transform your home with timeless designs that blend comfort and style.",
  },
  {
    id: "dining-room",
    name: "Dining Room",
    description: "Tables, chairs, and storage solutions",
    image: "/images/dining_room.png",
    info: "Discover modern dining room sets and storage solutions, including solid wood tables and ergonomic chairs, perfect for gathering and entertaining guests. Crafted with meticulous attention to detail for lasting elegance.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    description: "Beds, wardrobes, and nightstands",
    image: "/images/bedroom.png",
    info: "Reimagine your bedroom with our range of platform beds, spacious wardrobes, and bedside tables offering functional storage and sophisticated design. Create a serene retreat with quality furniture pieces.",
  },
];
