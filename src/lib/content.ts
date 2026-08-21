/**
 * Every word on the homepage lives here, lifted verbatim from the Figma file
 * (Design 2 → "Zeta Technologies — Sovereign Digital Infrastructure").
 * Edit copy here; components only render what they are given.
 */

export type NavItem = {
  label: string;
  href: string;
  menu?: "services" | "products";
};

export const NAV: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services", menu: "services" },
  { label: "Products", href: "/#products", menu: "products" },
  { label: "Blogs & Events", href: "/#insights" },
  { label: "Careers", href: "/contact?topic=careers" },
];

export const CTA_LABEL = "Talk to Zeta";
export const CTA_HREF = "/contact";

/* ---------------- Mega menus ---------------- */

export const SERVICES_MENU = {
  title: "Services",
  description:
    "Optimising operational tasks & infrastructure processes using secure, low-latency AI pipelines.",
  image: "/images/menu/services.webp",
  columnTitle: "Our Services",
  items: [
    { title: "Connectivity", description: "Connectivity infrastructure", href: "/#connectivity" },
    { title: "CPaaS", description: "Communications platform", href: "/#cpaas" },
    { title: "Wholesale Voice", description: "Voice services", href: "/#wholesale-voice" },
    { title: "A2P Messaging", description: "Business messaging", href: "/#a2p-messaging" },
  ],
  featured: {
    title: "Cloud Computing",
    description: "Sovereign Intelligence Stack",
    href: "/#cloud-computing",
    links: [
      { label: "Core Cloud", href: "/#stack" },
      { label: "Data Center", href: "/#stack" },
      { label: "Intelligent Automation", href: "/#intelligent-automation" },
      { label: "Network Intelligence", href: "/#network-intelligence" },
    ],
  },
};

export const PRODUCTS_MENU = {
  title: "Products",
  description:
    "Zeta Technologies delivers cutting-edge telecom, cloud, and cybersecurity solutions that transform how enterprises connect, communicate, and compete in the digital age.",
  image: "/images/menu/products-overlay.webp",
  columnTitle: "Our Products",
  items: [
    { title: "ConnectHub", href: "/#connecthub" },
    { title: "CloudHub", href: "/#cloudhub" },
    { title: "Zekli", href: "/#zekli" },
  ],
  featured: {
    image: "/images/menu/connecthub-feature.webp",
    description:
      "Next-generation software platform for programmatic global connectivity and virtual SD-WAN telemetry control.",
    linkLabel: "Explore ConnectHub",
    href: "https://connecthub.zetatech.com.pk",
  },
};

/* ---------------- Hero ---------------- */

export const HERO = {
  overline: "Telecommunications & Digital Infrastructure",
  /* One word per line, as set in Figma (Heading 1 is 4 × 123px tall) */
  lines: [
    { text: "Powering" },
    { text: "Sovereign" },
    { text: "Digital", accent: true },
    { text: "Infrastructure" },
  ],
  scrollCue: "Scroll through the network",
  tagline:
    "Invisible infrastructure powering visible progress—from terrestrial routes to machine intelligence.",
  coordinates: ["PK / 30.3753° N", "69.3451° E"],
};

/* ---------------- Credentials strip ---------------- */

export const CREDENTIALS = {
  overline: "Network Assurance / Infrastructure Credentials",
  lede: "Trusted foundations for operators, enterprises and institutions.",
  tag: "Sovereign Carrier Foundation",
  stats: [
    { index: "01 / Continuity", value: "Years", prefix: "15+", caption: "Operational experience" },
    { index: "02 / Licensed", value: "LDI Operator", caption: "National carrier layer" },
    { index: "03 / Gateway", value: "T-CLS", caption: "Terrestrial exchange" },
    { index: "04 / Reach", value: "Regional Network", caption: "Connected infrastructure" },
  ],
};

/* ---------------- About ---------------- */

export const ABOUT = {
  overline: "01 — About Zeta",
  headingBefore: "A ",
  headingAccent: "premier",
  headingAfter: " solutions provider",
  body: "Zeta Technologies delivers high-performance telecommunications backbone infrastructure, custom cloud virtualization clusters, and integrated machine intelligence layer solutions. We empower private enterprises, operators, and state agencies with fully custom digital Sovereignty.",
  cta: { label: "About Zeta", href: "/contact" },
  image: { src: "/images/about-fiber.webp", alt: "Bundle of optical fibres lit red at the tips" },
};

/* ---------------- Partners ---------------- */

export const PARTNERS = {
  line1: "Trusted",
  line2: "Partners.",
  logos: [
    { src: "/images/partners/partner-01.png", alt: "Zong 4G", width: 188, height: 60 },
    { src: "/images/partners/partner-02.png", alt: "Telenor", width: 207, height: 60 },
    { src: "/images/partners/partner-03.png", alt: "REDtone", width: 180, height: 60 },
    { src: "/images/partners/partner-04.png", alt: "PTCL", width: 144, height: 60 },
    { src: "/images/partners/partner-05.svg", alt: "Partner logo", width: 114, height: 60 },
    { src: "/images/partners/partner-06.png", alt: "Acmetel", width: 80, height: 80 },
    { src: "/images/partners/partner-07.png", alt: "Transworld Home", width: 210, height: 60 },
  ],
};

/* ---------------- Services ---------------- */

export type Service = {
  id: string;
  cap: string;
  title: string;
  description: string;
  area: "connectivity" | "cloud" | "automation" | "network" | "voice" | "a2p" | "cpaas";
  image?: { src: string; alt: string; width: number; height: number; opacity?: number; mirror?: boolean };
};

export const SERVICES = {
  overline: "02 — Our Services",
  headingBefore: "End-to-end ",
  headingAccent: "infrastructure",
  headingAfter: ". Intelligent solutions.",
  items: [
    {
      id: "connectivity",
      cap: "CAP / 01",
      title: "Connectivity",
      description:
        "Secure global fibers, IP transit, LDI operations, and private networks engineered for maximum uptime.",
      area: "connectivity",
      image: { src: "/images/services/connectivity.webp", alt: "", width: 527, height: 225 },
    },
    {
      id: "cloud-computing",
      cap: "CAP / 02",
      title: "Cloud Computing",
      description:
        "Sovereign data centers, cloud infrastructure hosts, intelligent orchestrators, and virtualized pipelines.",
      area: "cloud",
      image: { src: "/images/services/cloud.webp", alt: "", width: 380, height: 264, opacity: 0.67 },
    },
    {
      id: "intelligent-automation",
      cap: "CAP / 03",
      title: "Intelligent Automation",
      description:
        "Optimizing operational tasks & infrastructure processes using secure, low-latency AI pipelines.",
      area: "automation",
      image: { src: "/images/services/automation.webp", alt: "", width: 265, height: 240, opacity: 0.82 },
    },
    {
      id: "network-intelligence",
      cap: "CAP / 04",
      title: "Network Intelligence",
      description:
        "Deep packet telemetry, proactive traffic shaping, diagnostics, and ML-driven threat modeling.",
      area: "network",
      image: {
        src: "/images/services/network-intelligence.webp",
        alt: "",
        width: 322,
        height: 322,
        opacity: 0.8,
        mirror: true,
      },
    },
    {
      id: "wholesale-voice",
      cap: "CAP / 05",
      title: "Wholesale Voice",
      description: "Enterprise-scale termination and originations across resilient carrier routes.",
      area: "voice",
      image: {
        src: "/images/services/wholesale-voice.webp",
        alt: "",
        width: 172,
        height: 157,
        opacity: 0.86,
        mirror: true,
      },
    },
    {
      id: "a2p-messaging",
      cap: "CAP / 06",
      title: "A2P Messaging",
      description: "Application communication relays and security APIs.",
      area: "a2p",
      image: { src: "/images/services/a2p.webp", alt: "", width: 230, height: 154, opacity: 0.9 },
    },
    {
      id: "cpaas",
      cap: "CAP / 07",
      title: "CPaaS",
      description:
        "Programmable developer APIs for voice, video, and messaging—connected directly to Zeta's carrier infrastructure.",
      area: "cpaas",
      image: { src: "/images/services/cpaas.webp", alt: "", width: 606, height: 240, opacity: 0.88 },
    },
  ] satisfies Service[],
};

/* ---------------- Sovereign Intelligence Stack ---------------- */

export const STACK = {
  overline: "03 — Core Ecosystem",
  headingBefore: "The Sovereign ",
  headingAccent: "Intelligence",
  headingAfter: " Stack",
  lede: "Core telecommunications and machine intelligence unified inside one secure ecosystem.",
  cta: { label: "Explore the stack", href: "/#stack" },
  image: { src: "/images/stack-core.webp", alt: "Isometric rendering of a layered infrastructure core" },
  layers: [
    { name: "Connectivity", detail: "Fiber & gateways" },
    { name: "Core Cloud", detail: "Virtualized hosts" },
    { name: "Data Centre", detail: "Regional compounds" },
    { name: "Data", detail: "Secure telemetry", plane: "Data Streams" },
    { name: "Intelligence", detail: "Automation & analysis" },
  ],
};

/* ---------------- Products ---------------- */

export type Product = {
  id: string;
  kicker: string;
  name: string;
  description: string;
  href: string;
  image: { src: string; alt: string; mirror?: boolean };
  dark?: boolean;
};

export const PRODUCTS = {
  overline: "04 — Zeta Products",
  headingBefore: "Purpose-built ",
  headingAccent: "platforms",
  headingAfter: " powered by Zeta infrastructure.",
  items: [
    {
      id: "connecthub",
      kicker: "Communication Infrastructure / 01",
      name: "ConnectHub",
      description:
        "Application communication relays and security APIs engineered for reliable, high-volume delivery.",
      href: "https://connecthub.zetatech.com.pk",
      image: { src: "/images/products/connecthub.webp", alt: "Hand interacting with a red-lit control surface", mirror: true },
    },
    {
      id: "cloudhub",
      kicker: "Sovereign Compute / 02",
      name: "CloudHub",
      description:
        "A sovereign orchestration plane for deploying hyper-localized, automated, secure virtualization clusters.",
      href: "https://cloudhub.zetatech.com.pk",
      image: { src: "/images/products/cloudhub.webp", alt: "Data-centre corridor lit by red routing signals" },
    },
    {
      id: "zekli",
      kicker: "Network Intelligence / 03",
      name: "Zekli",
      description:
        "An integrated developer security suite for real-time intelligence, proactive diagnostics, and telemetry pipeline models.",
      href: "https://zekli.com",
      image: { src: "/images/products/zekli.webp", alt: "Network topology over a fibre backdrop" },
      dark: true,
    },
  ] satisfies Product[],
};

/* ---------------- Insights ---------------- */

export const INSIGHTS = {
  overline: "05 — Field Intelligence",
  headingBefore: "Signals from the ",
  headingAccent: "network",
  headingAfter: " edge.",
  lede: "Perspectives on sovereign infrastructure, regional connectivity, and secure intelligent systems.",
  items: [
    {
      category: "Research Note",
      title: "Sovereign cloud is an operating model, not a location.",
      tag: "Cloud",
      href: "/#insights",
    },
    {
      category: "Infrastructure",
      title: "Why terrestrial routes matter to regional resilience.",
      tag: "Connectivity",
      href: "/#insights",
    },
    {
      category: "Engineering",
      title: "Turning network telemetry into operational intelligence.",
      tag: "Intelligence",
      href: "/#insights",
    },
  ],
};

/* ---------------- Closing CTA ---------------- */

export const CLOSING = {
  overline: "Build with Zeta",
  heading: "Infrastructure for what comes next.",
  lede: "Connect with our infrastructure team to design your sovereign digital foundation.",
  cta: { label: "Talk to Zeta", href: "/contact" },
};

/* ---------------- Footer ---------------- */

export const FOOTER = {
  tagline: "Invisible infrastructure powering visible progress.",
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "About", href: "/#about" },
        { label: "Services", href: "/#services" },
        { label: "Products", href: "/#products" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Blogs & Events", href: "/#insights" },
        { label: "Careers", href: "/contact?topic=careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  // Terms and Privacy become links once those pages exist.
  legal: [
    { label: "Terms & Conditions" },
    { label: "Privacy" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ] as { label: string; href?: string }[],
};
