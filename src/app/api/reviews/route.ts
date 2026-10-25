export async function GET() {
  const TA_VIEW_URL = "https://www.tripadvisor.com/Attraction_Review-g8055401-d34749047-Reviews-Hero_Shuttles-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html"
  const LOCATION_ID = "34749047"
  const TA_KEY = process.env.TRIPADVISOR_API_KEY || process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY || ""

  // --- 1. TRY AUTOMATIC TERRA API FIRST ---
  if (TA_KEY) {
    try {
      const terraUrl = `https://api.content.tripadvisor.com/api/v1/location/${LOCATION_ID}/reviews?key=${TA_KEY}&language=en`
      const res = await fetch(terraUrl, { next: { revalidate: 3600 } })
      
      if (res.ok) {
        const data = await res.json()
        const apiReviews = data.data || data.reviews || []

        if (Array.isArray(apiReviews) && apiReviews.length > 0) {
          // Terra has migrated! Return automatic reviews - no manual needed ever again
          const mapped = apiReviews.map((r: any, i: number) => ({
            id: r.id || `ta-${i}`,
            author: r.user?.username || r.username || r.author || "Guest",
            username: r.user?.username || r.username || "Guest",
            user_location: r.user?.user_location || r.user_location || "",
            rating: r.rating || 5,
            title: r.title || "",
            text: r.text || r.review_text || r.comment || "",
            review_text: r.text || r.review_text || "",
            date: r.published_date ? `Reviewed on ${r.published_date}` : "Verified review",
            published_date: r.published_date || new Date().toISOString(),
            experience_date: r.travel_date || r.experience_date || "",
            source: "TripAdvisor",
            url: r.url || TA_VIEW_URL
          }))
          return Response.json(mapped)
        }
      }
    } catch (e) {
      console.log("Terra fetch failed, using fallback", e)
    }
  }

  // --- 2. FALLBACK: YOUR 3 REAL REVIEWS (until Terra migrates) ---
  const reviews = [
    {
      id: "driacorrea-2026",
      author: "DRIACORREA",
      username: "DRIACORREA",
      user_location: "Porto, Portugal",
      rating: 5,
      title: "The Best transfer company in Zanzibar",
      text: "The best!!! Hero was our true hero; his team took us all over the island of Zanzibar and was always ready to assist us. Our trip wouldn't have been nearly as perfect without their services!",
      review_text: "The best!!! Hero was our true hero; his team took us all over the island of Zanzibar and was always ready to assist us. Our trip wouldn't have been nearly as perfect without their services!",
      date: "Reviewed yesterday",
      published_date: "2026-08-01",
      experience_date: "August 2026",
      source: "TripAdvisor",
      url: TA_VIEW_URL
    },
    {
      id: "trip13030900935-2026",
      author: "Trip13030900935",
      username: "Trip13030900935",
      user_location: "South Africa",
      rating: 5,
      title: "The best shuttle and tours service by far",
      text: "Hero took great care of us, from the moment he came to the airport to greet us, he was so professional and organised throughout our 7 days in Zanzibar always on time. He took us to the best places in Zanzibar as per our itinerary also made great recommendations that we ended up enjoying, his shuttle was so comfortable it was the best thing to go back to after a long day of activities, I'm definitely using his services again when I go back to Zanzibar. Oh I must say the blue Safari was the best as well as going to different sandbanks loved it.",
      review_text: "Hero took great care of us, from the moment he came to the airport to greet us, he was so professional and organised throughout our 7 days in Zanzibar always on time. He took us to the best places in Zanzibar as per our itinerary also made great recommendations that we ended up enjoying, his shuttle was so comfortable it was the best thing to go back to after a long day of activities, I'm definitely using his services again when I go back to Zanzibar. Oh I must say the blue Safari was the best as well as going to different sandbanks loved it.",
      date: "Reviewed yesterday",
      published_date: "2026-10-01",
      experience_date: "October 2026",
      source: "TripAdvisor",
      url: TA_VIEW_URL
    },
    {
      id: "tamsanqa-2026",
      author: "Tamsanqa James M",
      username: "Tamsanqa James M",
      user_location: "South Africa",
      rating: 5,
      title: "Good Tour Oct 2026 - Exceptional Service in Zanzibar! TZZA",
      text: "You welcomed us with open arms and even surprised us with gifts of our South African national shirts ZA, making us feel incredibly proud, appreciated, and right at home! Your service was exceptional, professional, and reliable. You were always on time, your shuttle was always spotless, and the free Wi-Fi made every journey even more enjoyable. You made exploring the beautiful island of Zanzibar TZ easy, comfortable, and truly memorable. I also really appreciate your 'Pay After Trip' model. It demonstrates trust in your customers and confidence in the quality of your service. If you're visiting Zanzibar and want an amazing, stress-free experience, call Hero! Highly recommended! Much love from South Africa! ZA TZ",
      review_text: "You welcomed us with open arms and even surprised us with gifts of our South African national shirts ZA, making us feel incredibly proud, appreciated, and right at home! Your service was exceptional, professional, and reliable. You were always on time, your shuttle was always spotless, and the free Wi-Fi made every journey even more enjoyable. You made exploring the beautiful island of Zanzibar TZ easy, comfortable, and truly memorable. I also really appreciate your 'Pay After Trip' model. It demonstrates trust in your customers and confidence in the quality of your service. If you're visiting Zanzibar and want an amazing, stress-free experience, call Hero! Highly recommended! Much love from South Africa! ZA TZ",
      date: "Reviewed yesterday",
      published_date: "2026-10-01",
      experience_date: "October 2026",
      source: "TripAdvisor",
      url: TA_VIEW_URL
    }
  ]

  return Response.json(reviews)
}