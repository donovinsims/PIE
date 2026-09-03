export const SITE = {
  name: "Pietro's Pizzeria",
  phone: "(815) 623-2112",
  phoneHref: "tel:(815) 623-2112",
  orderUrl: "https://pietrospizza.toast.site/order?diningOption=takeout&rwg_token=AE37R_gxC-2M9RWv5tYaFuz34rd_ERnjpXZ0CVny-2XX5C7BaRyYCUMATVx6dMnwDwZsAmtnn3Y3ExQzvR2wSW-ZULc8IQKokg%3D%3D",
  email: "myaunke75@gmail.com",
  address: "5724 Elevator RD, Roscoe, IL 61073",
  addressShort: "5724 Elevator RD",
  directions: "https://www.google.com/maps?daddr=5724+Elevator+RD++Roscoe+IL+61073+US",
  mapPin: "https://www.google.com/maps?q=5724+Elevator+RD+Roscoe+IL+61073",
  facebook: "https://www.facebook.com/259108440870825",
  messenger: "http://m.me/259108440870825",
  rating: "4.3",
  ratingTotal: "(783 Reviews)",
  tagline: "Homemade Food | Fresh Ingredients | Delivery and Carry Out",
  topbarTagline: "Carry Out-Delivery & Dining Area Available!",
  hoursLine: "Hours: Mon - Thu, Sun until 9:45 pm · Fri, Sat until 10:45 pm",
  hoursWeekly: [
    ["Monday", "10:00 am - 9:45 pm"],
    ["Tuesday", "10:00 am - 9:45 pm"],
    ["Wednesday", "10:00 am - 9:45 pm"],
    ["Thursday", "10:00 am - 9:45 pm"],
    ["Friday", "10:00 am - 10:45 pm"],
    ["Saturday", "10:00 am - 10:45 pm"],
    ["Sunday", "10:00 am - 9:45 pm"],
  ],
  hoursShort: "Mon - Thu, Sun 10:00 am - 9:45 pm · Fri, Sat 10:00 am - 10:45 pm",
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Menu",
    href: "/menu",
    children: [
      { label: "Pizza", href: "/menu" },
      { label: "Broaster Chicken", href: "/broadster-chicken" },
      { label: "Appetizers", href: "/appetizers" },
      { label: "Sandwiches", href: "/sandwiches" },
      { label: "Dinners", href: "/dinners" },
      { label: "Desserts", href: "/desserts" },
    ],
  },
  { label: "Family or Party Trays", href: "/family-or-party-trays" },
  { label: "Lunch Specials", href: "/lunch-specials" },
  { label: "Gallery", href: "/gallery" },
  { label: "Employment", href: "/employment" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const MENU_CHILD_PATHS = ["/menu", "/broadster-chicken", "/appetizers", "/sandwiches", "/dinners", "/desserts"];
