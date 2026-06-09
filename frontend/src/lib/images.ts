/**
 * Local images — filename matches dish / chef / section name.
 * All files live in /public/images/
 */

const local = (path: string) => path;

export const MENU_ITEM_IMAGES: Record<string, string> = {
  "Mutton Karahi": local("/images/menu/mutton-karahi.jpg"),
  "Chicken Handi": local("/images/menu/chicken-handi.jpg"),
  "Seekh Kebab Platter": local("/images/menu/seekh-kebab-platter.jpg"),
  // User-uploaded dish (add the actual image file at public/images/menu/user-dish-1.jpg)
  "User Dish": local("/images/menu/user-dish-1.jpg"),
  "Beef Bihari Boti": local("/images/menu/beef-bihari-boti.jpg"),
  "Dragon Chicken": local("/images/menu/dragon-chicken.jpg"),
  "Szechuan Noodles": local("/images/menu/szechuan-noodles.jpg"),
  "Grilled Atlantic Salmon": local("/images/menu/grilled-salmon.jpg"),
  "Beef Tenderloin Steak": local("/images/menu/beef-steak.jpg"),
  "Gulab Jamun Trio": local("/images/menu/gulab-jamun.jpg"),
  "Chocolate Lava Cake": local("/images/menu/chocolate-lava-cake.jpg"),
  "Fresh Mint Margarita": local("/images/menu/mint-margarita.jpg"),
  "Karak Chai": local("/images/menu/karak-chai.jpg"),
  Chusci: local("/images/menu/chusci.png"),
};

export const CHEF_IMAGES = {
  aliRaza: local("/images/chefs/ali-raza.jpg"),
  mariaSantos: local("/images/chefs/maria-santos.jpg"),
  liWei: local("/images/chefs/li-wei.jpg"),
} as const;

export const GALLERY_IMAGES = [
  { type: "Food", src: local("/images/gallery/food-platter.jpg"), alt: "Signature food platter" },
  { type: "Interior", src: local("/images/gallery/interior-dining.jpg"), alt: "Fine dining interior" },
  { type: "Rooftop", src: local("/images/gallery/rooftop-view.jpg"), alt: "Rooftop dining" },
  { type: "Food", src: local("/images/gallery/premium-steak.jpg"), alt: "Premium steak" },
  { type: "Interior", src: local("/images/gallery/ambiance.jpg"), alt: "Restaurant ambiance" },
  { type: "Rooftop", src: local("/images/gallery/skyline.jpg"), alt: "Skyline view" },
] as const;

export const HERO_POSTER = local("/images/hero/restaurant-hero.png");
export const ABOUT_HERO = local("/images/hero/about-banner.jpg");
export const EVENTS_HERO = local("/images/hero/events-banner.jpg");
export const CTA_BG = local("/images/hero/cta-bg.jpg");

export const FOOD_IMAGES = {
  default: MENU_ITEM_IMAGES["Mutton Karahi"],
  platter: local("/images/gallery/food-platter.jpg"),
} as const;

export const PROJECT_IMAGES = [
  { src: HERO_POSTER, alt: "Restaurant entrance" },
  ...GALLERY_IMAGES,
  ...Object.entries(MENU_ITEM_IMAGES).map(([name, src]) => ({ src, alt: name })),
  ...Object.entries(CHEF_IMAGES).map(([key, src]) => ({ src, alt: key.replace(/([A-Z])/g, " $1").trim() })),
];

export function getMenuImage(name: string): string {
  return MENU_ITEM_IMAGES[name] ?? FOOD_IMAGES.default;
}

export function getMenuImagePath(slug: string): string {
  const map: Record<string, string> = {
    "mutton-karahi": MENU_ITEM_IMAGES["Mutton Karahi"],
    "chicken-handi": MENU_ITEM_IMAGES["Chicken Handi"],
    "seekh-kebab-platter": MENU_ITEM_IMAGES["Seekh Kebab Platter"],
    "beef-bihari-boti": MENU_ITEM_IMAGES["Beef Bihari Boti"],
    "dragon-chicken": MENU_ITEM_IMAGES["Dragon Chicken"],
    "szechuan-noodles": MENU_ITEM_IMAGES["Szechuan Noodles"],
    "grilled-atlantic-salmon": MENU_ITEM_IMAGES["Grilled Atlantic Salmon"],
    "beef-tenderloin-steak": MENU_ITEM_IMAGES["Beef Tenderloin Steak"],
    "gulab-jamun-trio": MENU_ITEM_IMAGES["Gulab Jamun Trio"],
    "chocolate-lava-cake": MENU_ITEM_IMAGES["Chocolate Lava Cake"],
    "fresh-mint-margarita": MENU_ITEM_IMAGES["Fresh Mint Margarita"],
    "karak-chai": MENU_ITEM_IMAGES["Karak Chai"],
    chusci: MENU_ITEM_IMAGES["Chusci"],
  };
  return map[slug] ?? FOOD_IMAGES.default;
}
