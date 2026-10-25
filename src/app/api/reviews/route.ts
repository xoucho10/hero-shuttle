export async function GET() {
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
      source: "TripAdvisor"
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
      source: "TripAdvisor"
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
      source: "TripAdvisor"
    }
  ]

  return Response.json(reviews)
}