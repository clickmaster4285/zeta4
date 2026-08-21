export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://zetatech.com.pk").replace(/\/$/, "");

export const SITE = {
  name: "Zeta Technologies",
  legalName: "Zeta Technologies (Pvt.) Ltd.",
  tagline: "Invisible infrastructure powering visible progress.",
  description:
    "Zeta Technologies delivers sovereign digital infrastructure for Pakistan and the region — licensed LDI connectivity, terrestrial cable landing gateway, sovereign cloud and data centres, and carrier-grade platforms: ConnectHub, CloudHub and Zekli.",
  email: "info@zetatech.com.pk",
  phone: "+92 313 8180038",
  phoneHref: "tel:+923138180038",
  address: "Sector I-10/3, Islamabad, Pakistan",
  coordinates: "PK / 30.3753° N 69.3451° E",
  founded: "2011",
} as const;
