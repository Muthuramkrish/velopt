/** Same coordinates as Google Maps place: VEL OPTICALS */
export const STORE_LAT = 8.4972235;
export const STORE_LNG = 78.118756;

/** Matches Google Maps business address */
export const STORE_ADDRESS =
  "Opp: Anand Medicals, 196 West, N Car St, near Govt Girls Higher Secondary School, Tiruchendur, Tamil Nadu 628215";

/** Iframe: same center & zoom (17) as the Maps place view */
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${STORE_LAT},${STORE_LNG}&z=17&hl=en&output=embed`;

/**
 * Opens the exact Google Maps listing (same as your shared place link).
 * Tracking query params removed.
 */
export const mapsOpenUrl =
  "https://www.google.com/maps/place/VEL+OPTICALS/@8.4972235,78.118756,17z/data=!3m1!4b1!4m6!3m5!1s0x3b039134d5da9cd9:0x6a7d4c1e19e11bdd!8m2!3d8.4972235!4d78.118756!16s%2Fg%2F11ybxyk8_b";
