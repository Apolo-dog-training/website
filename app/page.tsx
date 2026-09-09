import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getReviews } from "@/lib/reviews";
import { services, site } from "@/lib/site";

export default async function Home() {
  const reviews = await getReviews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: `${site.role} à ${site.area}.`,
    url: site.url,
    email: site.email,
    telephone: site.phoneIntl,
    image: `${site.url}/photos/hero.jpg`,
    logo: `${site.url}/logo/logo-full.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bordeaux",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
    },
    areaServed: site.areaLong,
    sameAs: [site.instagram.url],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviews.rating,
      reviewCount: reviews.total,
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Reviews data={reviews} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
