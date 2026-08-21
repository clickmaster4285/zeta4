import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Credentials from "@/components/sections/Credentials";
import About from "@/components/sections/About";
import Partners from "@/components/sections/Partners";
import Services from "@/components/sections/Services";
import Stack from "@/components/sections/Stack";
import Products from "@/components/sections/Products";
import Insights from "@/components/sections/Insights";
import ClosingCta from "@/components/sections/ClosingCta";
import { SITE, SITE_URL } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/zeta-logo-white.png`,
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: SITE.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector I-10/3",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  sameAs: ["https://connecthub.zetatech.com.pk", "https://cloudhub.zetatech.com.pk", "https://zekli.com"],
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Credentials />
        <About />
        <Partners />
        <Services />
        <Stack />
        <Products />
        <Insights />
        <ClosingCta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
    </>
  );
}
