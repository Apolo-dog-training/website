import Image from "next/image";
import { site } from "@/lib/site";
import { MailIcon, PhoneIcon, StarIcon, MapPinIcon } from "./icons";

export default function Hero() {
  return (
    <section id="accueil" className="relative isolate overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/photos/hero.jpg"
          alt="Malinois joyeux courant après un frisbee lors d'une séance d'activité canine"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darker/40 to-transparent" />
      </div>

      <div className="min-h-screen-mobile mx-auto flex max-w-6xl flex-col justify-center px-5 pb-16 pt-28 md:pt-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            <MapPinIcon className="h-4 w-4" />
            {site.area}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold uppercase leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Connaissez-vous le{" "}
            <span className="text-brand">super pouvoir</span>{" "}
            de votre chien&nbsp;?
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            {site.tagline} Éducation, comportement et activités canines à{" "}
            {site.area}.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`tel:${site.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              <PhoneIcon className="h-5 w-5" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-ink"
            >
              <MailIcon className="h-5 w-5" />
              Réserver une étude
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-white/90">
            <div className="flex text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-5 w-5" />
              ))}
            </div>
            <p className="text-sm font-medium">
              {Math.round(site.google.rating)}/5 sur Google · {site.google.count} avis clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
