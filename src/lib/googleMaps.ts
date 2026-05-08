export const centroLimaSur = {
  lat: -12.19,
  lng: -76.88
};

export function googleMapsDisponible() {
  return Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
}
