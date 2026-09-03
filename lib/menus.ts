// Auto-generated from source rendered.html - menu data per page.
export type MenuSub = { name: string; price: string };
export type MenuRow = { name?: string; price?: string; subs?: MenuSub[]; desc?: string[] };
export type MenuCat = { title: string; rows: MenuRow[]; id?: string };
export const MENU_MENU: MenuCat[] = [
  { id: "pizza", title: "Pietros Pizzeria", rows: [
    {"name": "Cheese", "subs": [{"name": "12\" Medium", "price": "$12.35"}, {"name": "14\" Large", "price": "$13.35"}, {"name": "16\" X-Large", "price": "$14.35"}]},
    {"name": "Each Topping", "subs": [{"name": "12\" Medium", "price": "$1.50"}, {"name": "14\" Large", "price": "$1.75"}, {"name": "16\" X-Large", "price": "$2.00"}]},
    {"name": "10\\\" GF Cheese", "subs": [{"name": "", "price": "$13.35"}]},
    {"name": "10\\\" GF Cauliflower", "subs": [{"name": "", "price": "$14.35"}]},
    {"name": "INGREDIENTS", "desc": ["Sausage | Pepperoni | Mushrooms | Green Peppers | Green Olives | Black Olives | Bacon | Onions"]},
  ] },
  { id: "deluxe", title: "Pietro's Deluxe", rows: [
    {"subs": [{"name": "12\" Medium", "price": "$21.05"}, {"name": "14\" Large", "price": "$23.05"}, {"name": "16\" X-Large", "price": "$25.05"}]},
    {"desc": ["EVERYTHING ABOVE NO SUBSTITUTIONS ALLOWED"]},
    {"name": "Additional Toppings:", "desc": ["Ham | Anchovies | Pineapple | Spinach | Hamburger | Jalapeno | Shrimp | Tomato | Garlic"]},
    {"name": "Items on the Side:", "subs": [{"name": "Sauce", "price": "$0.90"}, {"name": "Garlic Butter", "price": "$0.90"}, {"name": "Pepperoncini", "price": "$0.90"}, {"name": "Hot Giardiniera", "price": "$1.40"}]},
  ] },
  { id: "thick", title: "Pietro's Thick Pizza", rows: [
    {"name": "Cheese", "subs": [{"name": "12\" Medium", "price": "$13.85"}, {"name": "14\" Large", "price": "$14.85"}, {"name": "16\" X-Large", "price": "$15.85"}]},
    {"name": "Each Topping", "subs": [{"name": "12\" Medium", "price": "$1.75"}, {"name": "14\" Large", "price": "$2.00"}, {"name": "16\" X-Large", "price": "$2.25"}]},
  ] },
  { id: "pan", title: "Pietro's Pan Pizza", rows: [
    {"name": "Cheese", "subs": [{"name": "12\" Medium", "price": "$14.85"}, {"name": "14\" Large", "price": "$15.85"}, {"name": "16\" X-Large", "price": "$16.85"}]},
    {"name": "Each Topping", "subs": [{"name": "12\" Medium", "price": "$1.75"}, {"name": "14\" Large", "price": "$2.00"}, {"name": "16\" X-Large", "price": "$2.25"}]},
  ] },
  { id: "stuffed", title: "Pietro's Stuffed Pizza", rows: [
    {"name": "Cheese", "subs": [{"name": "12\" Medium", "price": "$15.85"}, {"name": "14\" Large", "price": "$16.85"}, {"name": "16\" X-Large", "price": "$17.85"}]},
    {"name": "Each Topping", "subs": [{"name": "12\" Medium", "price": "$1.75"}, {"name": "14\" Large", "price": "$2.00"}, {"name": "16\" X-Large", "price": "$2.25"}]},
  ] },
];

export const MENU_BROADSTER_CHICKEN: MenuCat[] = [
  { title: "BROASTER CHICKEN", rows: [
    {"name": "Chicken"},
    {"name": "4 pc.", "price": "$9.85"},
    {"name": "8 pc.", "price": "$16.85"},
    {"name": "12 pc.", "price": "$21.85"},
    {"name": "16 pc.", "price": "$27.60"},
    {"name": "20 pc.", "price": "$31.60"},
    {"name": "24 pc.", "price": "$35.60"},
    {"name": "*48 pc.", "price": "$58.10"},
    {"name": "*96 pc.", "price": "$99.10"},
    {"desc": ["*Please notify us 24 hours in advance"]},
  ] },
  { title: "Potato Wedges", rows: [
    {"name": "Lb. Wedges", "price": "$5.85"},
  ] },
];

export const MENU_APPETIZERS: MenuCat[] = [
  { title: "Appetizers", rows: [
    {"name": "Fried Pickles With Chipotle Ranch", "price": "$7.00"},
    {"name": "French Fries", "price": "$3.50"},
    {"name": "Onion Rings", "price": "$5.25"},
    {"name": "Fried Mushrooms", "price": "$5.75"},
    {"name": "Fried Mozzarella Sticks", "price": "$6.75"},
    {"name": "Regular Wings", "price": "$8.45"},
    {"name": "Regular Wings With Fries", "price": "$10.45"},
    {"name": "Hot Wings", "price": "$8.55"},
    {"name": "Hot Wings With Fries", "price": "$10.55"},
    {"name": "Fried Cheese Curds", "price": "$7.25"},
    {"name": "Jalapeno Poppers", "price": "$7.25"},
    {"name": "Chicken Tenders", "price": "$7.95"},
    {"name": "Chicken Tenders With Fries", "price": "$10.05"},
    {"name": "Popcorn Shrimp", "price": "$8.00"},
    {"name": "Garlic Bread", "price": "$3.05"},
    {"name": "Garlic Bread Add Cheese", "price": "$3.75"},
    {"name": "Pizza Bread", "price": "$4.05"},
    {"name": "Bread Sticks", "price": "$5.05", "desc": ["(Cheese Filled)"]},
    {"name": "Fried Ravioli", "price": "$8.45"},
  ] },
];

export const MENU_SANDWICHES: MenuCat[] = [
  { title: "Sandwiches", rows: [
    {"name": "Italian Beef", "price": "$9.35"},
    {"name": "Italian Sausage", "price": "$9.15"},
    {"name": "Italian Meatball", "price": "$9.15"},
    {"name": "Combo Sandwich", "price": "$11.70"},
    {"name": "Fish Sandwich", "price": "$9.60"},
    {"name": "Chicken Sandwich", "price": "$9.60"},
    {"name": "Chicken Parm. Sandwich", "price": "$10.00"},
    {"name": "Hot Calzone", "price": "$9.10", "desc": ["Ham, Pepperoni, Salami, Mozzarella & Special Sauce"]},
    {"name": "Calzone", "subs": [{"name": "Create Your Own — Up to Three Toppings", "price": "$9.60"}, {"name": "Added Topping", "price": "$0.90 each"}]},
  ] },
  { title: "Extras", rows: [
    {"name": "Au Jus", "price": "$1.00"},
    {"name": "Cheese", "price": "$1.65"},
  ] },
];

export const MENU_DINNERS: MenuCat[] = [
  { title: "Dinners", rows: [
    {"name": "Spaghetti", "price": "$9.85"},
    {"name": "Mostaccoli", "price": "$9.85"},
    {"name": "Meat Lasagna", "price": "$11.35"},
    {"name": "Meat Tortellini", "price": "$11.35"},
    {"name": "Meat Ravioli", "price": "$11.35"},
    {"name": "Cheese Ravioli", "price": "$11.35"},
    {"name": "Chicken Parm.", "price": "$11.35", "desc": ["(Spaghetti or Mostaccoli)"]},
    {"name": "Veal Parm.", "price": "$11.35", "desc": ["(Spaghetti or Mostaccoli)"]},
    {"name": "Shrimp Parm.", "price": "$12.85", "desc": ["(Spaghetti or Mostaccoli)"]},
    {"name": "1/2 Fried Chicken", "price": "$11.60", "desc": ["(Served with Fries)"]},
    {"name": "Fried Cod", "price": "$13.75", "desc": ["(Served with Fries)"]},
    {"name": "Fried Shrimp", "price": "$12.85", "desc": ["(Served with Fries)"]},
  ] },
  { title: "Extras", rows: [
    {"name": "One Meatball", "price": "$2.45"},
    {"name": "One Sausage", "price": "$3.20"},
    {"desc": ["All Dinners Are Served With Salad and Bread"]},
    {"name": "Family Trays Available"},
    {"name": "Pepsi Cans Available"},
  ] },
  { title: "Salad Dressings", rows: [
    {"name": "Ranch, Italian & Thousand Island"},
  ] },
  { title: "Pietro's Salad", rows: [
    {"price": "$9.85", "desc": ["Sausage, Pepperoni, Ham, Green & Black Olives, Romano, Mozzarella & Italian Dressing"]},
  ] },
];

export const MENU_DESSERTS: MenuCat[] = [
  { title: "Desserts", rows: [
    {"name": "Cannoli Cake", "price": "$6.00"},
    {"name": "Red Velvet Cake", "price": "$6.00"},
    {"name": "Vanilla Confetti Cake", "price": "$6.00"},
    {"name": "Black & White Cake", "price": "$6.00"},
    {"name": "Brownie Bites", "price": "$4.95"},
    {"name": "Carrot Cake", "price": "$6.00"},
    {"name": "Vanilla Rainbow Cake", "price": "$6.00"},
    {"name": "Chocolate Fudge Cake", "price": "$6.00"},
    {"name": "Lava Cake", "price": "$4.95"},
  ] },
];

export const MENU_FAMILY_OR_PARTY_TRAYS: MenuCat[] = [
  { title: "FAMILY / PARTY TRAYS", rows: [
  ] },
  { title: "Full Trays Include Salad and Bread. Serves 16-20", rows: [
    {"name": "Lasagna", "price": "$85"},
    {"name": "Meat or Cheese Ravioli", "price": "$85"},
    {"name": "Meat Tortellini", "price": "$85"},
    {"name": "Spaghetti or Mosaccoli", "price": "$65"},
  ] },
  { title: "Half Trays Include Salad and Bread. Serves 8-10", rows: [
    {"name": "Lasagna", "price": "$45"},
    {"name": "Meat or Cheese Ravioli", "price": "$45"},
    {"name": "Meat Tortellini", "price": "$45"},
    {"name": "Spaghetti or Mosaccoli", "price": "$35"},
  ] },
  { title: "Pietro's Italian Beef", rows: [
    {"name": "(1 lb. serves about 4)", "price": "$12.50/lb"},
  ] },
  { title: "Pietro's Salad", rows: [
    {"name": "Full Tray", "price": "$34", "desc": ["Serves 16 - 20"]},
    {"name": "Half Tray", "price": "$18", "desc": ["Serves 8 - 10"]},
  ] },
];

export const MENU_LUNCH_SPECIALS: MenuCat[] = [
  { title: "LUNCH SPECIALS", rows: [
  ] },
  { title: "Personal Pizza", rows: [
    {"name": "With 1 Topping and a Pop", "price": "$5.50"},
    {"name": "Additional Toppings", "price": "$.50/ea"},
  ] },
  { title: "Large Pizza", rows: [
    {"name": "With 1 Topping", "price": "$14.60"},
  ] },
  { title: "Pizza by the Slice", rows: [
    {"name": "1 Slice With a Pop", "price": "$4.20"},
    {"name": "2 Slices With a Pop", "price": "$7.20", "desc": ["(Choice of Sausage, Pepperoni, Cheese)"]},
  ] },
  { title: "1/2 Order of Spaghetti or Mostaccoli", rows: [
    {"name": "1/2 Loaf of Bread and Pop", "price": "$5.50"},
  ] },
  { title: "1/2 Sandwich and 1/2 Fries", rows: [
    {"name": "With Pop", "price": "$5.50"},
  ] },
];
