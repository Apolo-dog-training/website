import { site } from "./site";

export type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
  profilePhoto?: string;
};

export type ReviewsData = {
  rating: number;
  total: number;
  reviews: Review[];
  live: boolean; // true = récupéré en direct depuis Google, false = repli statique
};

/**
 * Avis de repli affichés tant que la clé Google n'est pas configurée
 * (ou si l'API est indisponible). Extraits réels de la fiche Google.
 */
const FALLBACK: Review[] = [
  {
    author: "Client vérifié",
    rating: 5,
    text: "Frédéric a fait preuve d'une énorme patience et d'une vraie compréhension avec mon Akita Inu, une race réputée particulière. On sent la passion et une réelle expertise.",
    relativeTime: "il y a 2 mois",
  },
  {
    author: "Client vérifié",
    rating: 5,
    text: "Après une dizaine de séances avec Frédéric, j'ai un chien très sociable avec un rappel exceptionnel, tout en ayant préservé son caractère et son naturel.",
    relativeTime: "il y a 3 mois",
  },
  {
    author: "Client vérifié",
    rating: 5,
    text: "Séances menées avec patience, pédagogie et bienveillance. Même mes enfants ont pu participer pour apprendre les bases avec le chien. Je recommande à 100%.",
    relativeTime: "il y a 1 mois",
  },
];

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  try {
    const res = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id",
        },
        body: JSON.stringify({
          textQuery: "Apolo Dog Training Bordeaux Bassens",
          languageCode: "fr",
        }),
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.places?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function getReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const fallback: ReviewsData = {
    rating: site.google.rating,
    total: site.google.count,
    reviews: FALLBACK,
    live: false,
  };

  if (!apiKey) return fallback;

  try {
    const placeId = await resolvePlaceId(apiKey);
    if (!placeId) return fallback;

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 }, // 1 jour de cache
      }
    );
    if (!res.ok) return fallback;

    const data = await res.json();
    const reviews: Review[] = (data.reviews ?? [])
      .filter((r: { text?: { text?: string } }) => r?.text?.text)
      .map(
        (r: {
          authorAttribution?: { displayName?: string; photoUri?: string };
          rating?: number;
          text?: { text?: string };
          relativePublishTimeDescription?: string;
        }) => ({
          author: r.authorAttribution?.displayName ?? "Client Google",
          rating: r.rating ?? 5,
          text: r.text?.text ?? "",
          relativeTime: r.relativePublishTimeDescription,
          profilePhoto: r.authorAttribution?.photoUri,
        })
      );

    if (reviews.length === 0) return fallback;

    return {
      rating: data.rating ?? site.google.rating,
      total: data.userRatingCount ?? site.google.count,
      reviews,
      live: true,
    };
  } catch {
    return fallback;
  }
}
